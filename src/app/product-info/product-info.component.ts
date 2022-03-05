import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from '../services/order.service';
import { Iproduct } from '../shared/interfaces/product';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
})
export class ProductInfoComponent implements OnInit, OnDestroy {
  product: Iproduct;
  subscr: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) {
    this.subscr = this.activatedRoute.data.subscribe(
      (data) => (this.product = data['product'])
    );
  }
  ngOnInit(): void {
    console.log(this.product, this.product.count);
  }
  productCount(isIncrease: boolean): void {
    this.product.count += isIncrease ? 1 : -1;
    if (this.product.count < 1) this.product.count = 1;
  }
  addToBasket(): void {
    this.orderService.addToBasket(this.product);
    this.product.count = 1;
  }
  ngOnDestroy(): void {
    this.subscr.unsubscribe();
  }
}
