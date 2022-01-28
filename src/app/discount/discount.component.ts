import { Component, OnInit } from '@angular/core';
import { DiscountService } from '../services/discount.service';
import { Idiscount } from '../shared/interfaces/discount';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {

  discounts: Idiscount[] = [];
  constructor(private discountService: DiscountService) { }

  ngOnInit(): void {
    this.discountService.getAllDiscounts().subscribe(
      (data: Idiscount[]) => this.discounts = data,
      (err: Error)=>console.log(err)
    )
  }

}
