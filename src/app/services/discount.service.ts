import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Idiscount } from '../shared/interfaces/discount';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  url: string = 'http://localhost:3000/discounts';

  constructor(private http: HttpClient) { }

  getAllDiscounts(): Observable<Idiscount[]> {
    return this.http.get<Idiscount[]>(this.url)
  }
  getOneDiscount(i: number | undefined): Observable<Idiscount> {
    return this.http.get<Idiscount>(`${this.url}/${i}`)
  }
  postDiscount(body: Idiscount): Observable<Idiscount>{
    return this.http.post<Idiscount>(this.url, body)
  }
  delDiscount(i: number | undefined): Observable<void>{
    return this.http.delete<void>(`${this.url}/${i}`)
  }
  patchDiscount(body:Idiscount): Observable<Idiscount> {
    return this.http.patch<Idiscount>(`${this.url}/${body.id}`, body);
  }
  
}
