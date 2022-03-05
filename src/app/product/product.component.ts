import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';
import { Iproduct } from '../shared/interfaces/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  products: Iproduct[] = [];
  typeROlls: { name: string; active: boolean }[] = [
    { name: 'Всі', active: true },
    { name: 'Філадельфія', active: false },
    { name: 'Каліфорнія', active: false },
    { name: 'Запечені', active: false },
    { name: 'Фірмові', active: false },
    { name: 'Макі', active: false },
    { name: 'Преміум', active: false },
  ];
  subscriptions: Subscription[] = [];
  category: string;
  categoryName: string;
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) {
    const subscr1 = this.activatedRoute.params.subscribe((params: Params) => {
      this.category = params['category'] ? params['category'] : 'rolls';
      const subscr2 = this.productService
        .getAllByCategory(this.category)
        .subscribe(
          (data: Iproduct[]) => {
            this.products = data;
            this.categoryName = data[0].category.name;
          },
          (err: Error) => console.log(err)
        );
      this.subscriptions.push(subscr2);
    });
    this.subscriptions.push(subscr1);
  }

  ngOnInit(): void {}
  changeActive(type: { name: string; active: boolean }) {
    if (type.active) return;
    this.typeROlls.find((type) => type.active === true).active = false;
    type.active = true;
  }
  productCount(product: Iproduct, isIncrease: boolean): void {
    product.count += isIncrease ? 1 : -1;
    if (product.count < 1) product.count = 1;
  }
  addToBasket(product: Iproduct): void {
    this.orderService.addToBasket(product);
    product.count = 1;
  }
  ngOnDestroy(): void {
    for (const item of this.subscriptions) {
      item.unsubscribe();
    }
  }
}
