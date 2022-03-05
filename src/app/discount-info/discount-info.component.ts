import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Idiscount } from '../shared/interfaces/discount';

@Component({
  selector: 'app-discount-info',
  templateUrl: './discount-info.component.html',
  styleUrls: ['./discount-info.component.scss'],
})
export class DiscountInfoComponent implements OnInit, OnDestroy {
  discount: Idiscount;
  subscr: Subscription;
  constructor(private activatedRoute: ActivatedRoute) {
    this.subscr = this.activatedRoute.data.subscribe(
      (data) => (this.discount = data['discount'])
    );
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.subscr.unsubscribe();
  }
}
