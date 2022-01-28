import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AdminComponent } from './admin/admin.component';
import { ProductComponent } from './product/product.component';
import { DiscountComponent } from './discount/discount.component';
import { AdminDiscountComponent } from './admin-discount/admin-discount.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { DiscountInfoComponent } from './discount-info/discount-info.component';

import {environment} from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DeliveryComponent,
    AboutUsComponent,
    AdminComponent,
    ProductComponent,
    DiscountComponent,
    AdminDiscountComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    AdminOrderComponent,
    DiscountInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
