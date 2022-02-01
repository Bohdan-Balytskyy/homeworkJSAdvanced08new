import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { ImageService } from '../services/image.service';
import { ProductService } from '../services/product.service';
import { Icategory } from '../shared/interfaces/category';
import { Iproduct } from '../shared/interfaces/product';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {

  isEdit: boolean = false;
  isAdd: boolean = false;
  products: Iproduct[] = [];
  myForm: FormGroup;
  uploadPercent: number = 0;
  isUploaded: boolean = false;
  categorys: Icategory[];

  constructor(private productService: ProductService, private categoryService: CategoryService,
    private imageService: ImageService) { 
    this.myForm = new FormGroup({
      "name": new FormControl("", Validators.required),
      "path": new FormControl("", Validators.required),
      "composition": new FormControl(""),
      "volume": new FormControl(""),
      "price": new FormControl(null, Validators.required),
      "category": new FormControl(null, Validators.required),
      "imagePath": new FormControl("", Validators.required),
      "id": new FormControl(null),
      'count':new FormControl(1)
    });
    imageService.streamuploadPercent.subscribe(
      (data) => this.uploadPercent = data
    )
  }

  ngOnInit(): void {
    this.getAll();
    this.categoryService.getAllCategorys().subscribe(
      (data: Icategory[]) => {
        this.categorys = data;
        this.myForm.patchValue({
          category: this.categorys[0].id
        })
      },
      (err: Error)=>console.log(err)
    )
  }
  closeWindow(): void {
    const url = this.myForm.get('imagePath')?.value;
    if (this.isAdd && url) this.deleteImage(url);
    this.resetFields();
  }
  resetFields(): void{
    this.myForm.reset();
    this.isEdit = false;
    this.isAdd = false;
    this.getAll();
    this.isUploaded = false;
    this.uploadPercent = 0;
  }
  getAll(): void {
    this.productService.getAllProdycts().subscribe(
      (data: Iproduct[]) => this.products = data,
      (err: Error)=>console.log(err)
    )
  }
  add(): void {
      this.productService.postProdyct(this.myForm.value).subscribe(
        () => this.resetFields(),
        (err: Error)=>console.log(err)
      )
  }
  edit(product: Iproduct): void {
    this.isEdit = true;
    this.myForm.patchValue({ ...product });
    this.isUploaded = true;
  }
  save():void {
      this.productService.patchProdyct(this.myForm.value).subscribe(
        () => this.resetFields(),
        (err: Error) => console.log(err)
      )
  }
  delete(i: number | undefined): void {
    const url = this.products.find(el => el.id === i).imagePath;
    this.deleteImage(url); 
    this.productService.delProdyct(i).subscribe(
      () => this.getAll(),
      (err: Error) => console.log(err)
    )
  }
  upload(event:any):void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        data.subscribe(
          (url:string) => {
            this.myForm.patchValue({ imagePath: url });
            this.isUploaded = true;
          }
        )
      })
      .catch(err=>console.log(err));
  }
  
  deleteImage(url:string) {
    this.imageService.deleteImage(url).subscribe(
      () => {
        console.log('File deleted');
        this.isUploaded = false;
        this.uploadPercent = 0;
        this.myForm.patchValue({ imagePath: '' });
      },
      (err) => console.log(err)
    )
  }
}
