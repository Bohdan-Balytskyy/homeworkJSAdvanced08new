import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DiscountService } from '../services/discount.service';
import { Idiscount } from '../shared/interfaces/discount';

@Component({
  selector: 'app-discount-info',
  templateUrl: './discount-info.component.html',
  styleUrls: ['./discount-info.component.scss']
})
export class DiscountInfoComponent implements OnInit {
  
  id: number;
  discount: Idiscount;

  constructor(private discountService: DiscountService, activateRoute: ActivatedRoute) {
    activateRoute.params.subscribe((params: Params) => {
      this.id = +params['id']
    });
  };

  ngOnInit(): void {
    this.discountService.getOneDiscount(this.id).subscribe(
      (data: Idiscount) => this.discount = data,
      (err: Error)=>console.log(err)
    );
  }

}
