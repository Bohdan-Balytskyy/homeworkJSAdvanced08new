import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { Icategory } from '../shared/interfaces/category';
import { AngularFireStorage  } from '@angular/fire/storage';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  
  isEdit: boolean = false;
  isAdd: boolean = false;
  categorys: Icategory[] = [];
  myForm: FormGroup;
  uploadPercent: number = 0;
  isUploaded: boolean = false;

  constructor(private categoryService: CategoryService, private storage:AngularFireStorage ) { 
    this.myForm = new FormGroup({
      "name": new FormControl("", Validators.required),
      "path": new FormControl("", Validators.required),
      "imagePath": new FormControl("", Validators.required),
      "id": new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.getAll();
  }
  closeWindow(): void {
    const url = this.myForm.get('imagePath')?.value;
    if (this.isAdd && url) this.deleteImage(url);
    this.resetFields();
  }
  resetFields(): void{
    this.myForm.reset();
    this.isEdit = false;
    this.isAdd = false;
    this.getAll();
    this.isUploaded = false;
    this.uploadPercent = 0;
  }
  getAll(): void {
    this.categoryService.getAllCategorys().subscribe(
      (data: Icategory[]) => this.categorys = data,
      (err: Error)=>console.log(err)
    )
  }
  add():void {
      this.categoryService.postCategory(this.myForm.value).subscribe(
        () => this.resetFields(),
        (err: Error)=>console.log(err)
      )
  }
  edit(category: Icategory): void {
    this.isEdit = true;
    this.myForm.patchValue({ ...category });
    this.isUploaded = true;
  }
  save():void {
      this.categoryService.patchCategory(this.myForm.value).subscribe(
        () => this.resetFields(),
        (err: Error) => console.log(err)
      )
  }
  delete(i: number | undefined): void {
    const url = this.categorys.find(el => el.id === i).imagePath;
    this.deleteImage(url); 
    this.categoryService.delCategory(i).subscribe(
      () => this.getAll(),
      (err: Error) => console.log(err)
    )
  }
  upload(event:any):void {
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
      .then(data => {
        data.subscribe(
          (url) => {
            this.myForm.patchValue({ imagePath: url });
            this.isUploaded = true;
          }
        )
      })
      .catch(err=>console.log(err));
  }
  async uploadFile(folder: string, name: string, file: File | null): Promise<Observable<string>>{
    const path = `${folder}/${name}`;
    let url: Observable<string>;
    if (file) {
      try {
        const storageRef = this.storage.ref(path);
        const task = storageRef.put(file);
        task.percentageChanges().subscribe(
          (data) => this.uploadPercent = data
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
  deleteImage(url:string): void{
    const storageRef = this.storage.refFromURL(url);
    storageRef.delete().subscribe(
      () => {
        console.log('File deleted');
        this.isUploaded = false;
        this.uploadPercent = 0;
        this.myForm.patchValue({ imagePath: '' });
      },
      (err)=> console.log(err)
    );
  }
}
