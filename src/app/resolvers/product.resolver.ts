import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Iproduct } from '../shared/interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductResolver implements Resolve<Iproduct> {
  constructor(private productService: ProductService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Iproduct> {
    return this.productService.getOneProdyct(+route.params['id']);
  }
}
