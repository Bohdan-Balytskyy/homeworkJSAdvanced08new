import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Iproduct } from '../shared/interfaces/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: Iproduct[] = [];
  typeROlls: { name: string, active: boolean }[] = [
    { name: 'Всі', active: true },
    {name:'Філадельфія', active: false},
    {name:'Каліфорнія', active: false},
    {name:'Запечені', active: false},
    {name:'Фірмові', active: false},
    {name:'Макі', active: false},
    {name:'Преміум', active: false},
  ]
  constructor(private productService: ProductService) { 
    this.productService.getAllProdycts().subscribe(
      (data: Iproduct[]) => this.products = data,
      (err: Error)=>console.log(err)
    )
  }

  ngOnInit(): void {

  }
  changeActive(type: { name: string, active: boolean }) {
    if (type.active) return;
    this.typeROlls.find(type => type.active === true).active = false;
    type.active = true;
  }

}
