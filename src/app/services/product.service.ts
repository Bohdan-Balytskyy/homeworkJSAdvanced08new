import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iproduct } from '../shared/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url: string = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  getAllProdycts(): Observable<Iproduct[]> {
    return this.http.get<Iproduct[]>(this.url)
  }
  getOneProdyct(i: number | undefined): Observable<Iproduct> {
    return this.http.get<Iproduct>(`${this.url}/${i}`)
  }
  getAllByCategory(category:string): Observable<Iproduct[]> {
    return this.http.get<Iproduct[]>(`${this.url}?categorys.path=${category}`)
  }
  postProdyct(body: Iproduct): Observable<Iproduct>{
    return this.http.post<Iproduct>(this.url, body)
  }
  delProdyct(i: number | undefined): Observable<void>{
    return this.http.delete<void>(`${this.url}/${i}`)
  }
  patchProdyct(body:Iproduct): Observable<Iproduct> {
    return this.http.patch<Iproduct>(`${this.url}/${body.id}`, body);
  }
}
