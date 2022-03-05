import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Iproduct } from '../shared/interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  $changeBasket = new Subject<boolean>();
  constructor() {}

  get basket(): Iproduct[] {
    return localStorage.getItem('basket')
      ? JSON.parse(localStorage.getItem('basket'))
      : [];
  }
  set basket(basket: Iproduct[]) {
    localStorage.setItem('basket', JSON.stringify(basket));
    this.$changeBasket.next(true);
  }
  addToBasket(product: Iproduct): void {
    let basket: Iproduct[] = [];
    let elem: Iproduct;
    if (localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket'));
      elem = basket.find((prod) => prod.id === product.id);
    }
    elem ? (elem.count += product.count) : basket.push(product);
    this.basket = basket;
  }
  delFromBasket(i: number): void {
    let basket = this.basket;
    basket.splice(i, 1);
    this.basket = basket;
  }
  updateBasket(i: number, isIncrease: boolean): void {
    let basket = this.basket;
    basket[i].count += isIncrease ? 1 : -1;
    basket[i].count < 1 ? this.delFromBasket(i) : (this.basket = basket);
  }
  cleanBasket() {
    localStorage.clear();
    this.$changeBasket.next(true);
  }
}
