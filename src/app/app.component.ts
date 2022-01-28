import { Component, ViewChild } from '@angular/core';
import { CategoryService } from './services/category.service';
import { Icategory } from './shared/interfaces/category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isShowSecondNav: boolean = false;
  title = 'sushi';
  categorys: Icategory[]=[];


  constructor(private categoryService: CategoryService) {
    this.categoryService.getAllCategorys().subscribe(
      (data: Icategory[]) => this.categorys = data,
      (err: Error)=>console.log(err)
    )
  }

  showSecondNav() {
    this.isShowSecondNav = document.activeElement.classList.contains('burger');
  }
}
