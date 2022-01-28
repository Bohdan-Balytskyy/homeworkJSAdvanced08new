import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icategory } from '../shared/interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url: string = 'http://localhost:3000/categorys';

  constructor(private http: HttpClient) { }
  
  getAllCategorys(): Observable<Icategory[]> {
    return this.http.get<Icategory[]>(this.url)
  }
  getOneCategory(i: number | undefined): Observable<Icategory> {
    return this.http.get<Icategory>(`${this.url}/${i}`)
  }
  postCategory(body: Icategory): Observable<Icategory>{
    return this.http.post<Icategory>(this.url, body)
  }
  delCategory(i: number | undefined): Observable<void>{
    return this.http.delete<void>(`${this.url}/${i}`)
  }
  patchCategory(body:Icategory): Observable<Icategory> {
    return this.http.patch<Icategory>(`${this.url}/${body.id}`, body);
  }
}
