import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  streamuploadPercent = new Subject<number>();

  constructor(private storage: AngularFireStorage) { }

  async uploadFile(folder: string, name: string, file: File | null): Promise<Observable<string>>{
    const path = `${folder}/${name}`;
    let url: Observable<string>;
    if (file) {
      try {
        const storageRef = this.storage.ref(path);
        const task = storageRef.put(file);
        task.percentageChanges().subscribe(
          (data) => this.streamuploadPercent.next(data) 
        )
        await task;
        url = storageRef.getDownloadURL();
      } catch(err: any) {
        console.log(err);
      }
    } else {
      console.log('wrong format');
    }
    return Promise.resolve(url);
  }
  deleteImage(url:string): Observable<void>{
    const storageRef = this.storage.refFromURL(url);
    return storageRef.delete();
  }
}
