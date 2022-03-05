import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DiscountService } from '../services/discount.service';
import { Idiscount } from '../shared/interfaces/discount';

@Injectable({
  providedIn: 'root',
})
export class DiscountResolver implements Resolve<Idiscount> {
  constructor(private discountService: DiscountService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Idiscount> {
    return this.discountService.getOneDiscount(+route.params['id']);
  }
}
