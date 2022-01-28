import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminDiscountComponent } from './admin-discount/admin-discount.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminComponent } from './admin/admin.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { DiscountInfoComponent } from './discount-info/discount-info.component';
import { DiscountComponent } from './discount/discount.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { 'path': 'dostavka-ta-oplata', component: DeliveryComponent },
  { 'path': 'about-us', component: AboutUsComponent },
  {
    'path': 'admin', component: AdminComponent, children: [
      {'path': 'category', component: AdminCategoryComponent},
      { 'path': 'action', component: AdminDiscountComponent },
      { 'path': 'product', component: AdminProductComponent },
      { 'path': 'order', component: AdminOrderComponent },
      {'path': '', pathMatch: 'full', redirectTo:'category'}
      
  ] },
  { 'path': 'product-category/:category', component: ProductComponent },
  { 'path': 'actions', component: DiscountComponent },
  { 'path': 'actions/:id',component: DiscountInfoComponent},
  { 'path': '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
