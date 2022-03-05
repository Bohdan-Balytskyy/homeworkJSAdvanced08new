import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { Icategory } from './shared/interfaces/category';
import { Iproduct } from './shared/interfaces/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  isShowSecondNav: boolean = false;
  title = 'sushi';
  categorys: Icategory[] = [];
  basket: Iproduct[] = [];
  total: number = 0;
  count: number = 0;
  isCart: boolean = false;
  subscr1: Subscription;
  subscr2: Subscription;

  constructor(
    private categoryService: CategoryService,
    private orderService: OrderService
  ) {
    this.subscr1 = this.categoryService.getAllCategorys().subscribe(
      (data: Icategory[]) => (this.categorys = data),
      (err: Error) => console.log(err)
    );
    this.loadBasket();
    this.subscr2 = this.orderService.$changeBasket.subscribe(() =>
      this.loadBasket()
    );
  }

  showSecondNav(): void {
    this.isShowSecondNav = document.activeElement.classList.contains('burger');
  }
  loadBasket(): void {
    this.total = 0;
    this.count = 0;
    this.basket = this.orderService.basket;
    for (const it of this.basket) {
      this.total += it.price * it.count;
      this.count += it.count;
    }
  }
  delFromBasket(i: number): void {
    this.orderService.delFromBasket(i);
  }
  productCount(i: number, isIncrease: boolean): void {
    this.orderService.updateBasket(i, isIncrease);
  }
  completeOrder(): void {
    this.orderService.cleanBasket();
  }
  ngOnDestroy(): void {
    this.subscr1.unsubscribe();
    this.subscr2.unsubscribe();
  }
}
