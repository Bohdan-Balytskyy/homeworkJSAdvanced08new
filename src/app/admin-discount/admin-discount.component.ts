import { Component, OnInit } from '@angular/core';
import { DiscountService } from '../services/discount.service';
import { Idiscount } from '../shared/interfaces/discount';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss']
})
export class AdminDiscountComponent implements OnInit {

  isEdit: boolean = false;
  isAdd: boolean = false;
  editDiscount: Idiscount = {
    title: '',
    name: '',
    description: '',
    data: '',
    imagePath: ''
  };
  discounts: Idiscount[] = [];
  uploadPercent: number = 0;
  isUploaded: boolean = false;
  
  constructor(private discountService: DiscountService, private imageService: ImageService) {
    imageService.streamuploadPercent.subscribe(
      (data) => this.uploadPercent = data
    )
  }

  ngOnInit(): void {
    this.getAll();
  }
  isntEmptyField(): boolean{
    return this.editDiscount.title !== '' && this.editDiscount.name !== '' &&
      this.editDiscount.description !== '' && this.editDiscount.imagePath !=='' && this.editDiscount.data !== '';
  }
  closeWindow() {
    const url = this.editDiscount.imagePath;
    if (this.isAdd && url) this.deleteImage(url);
    this.resetFields();
  }
  resetFields(): void{
    this.editDiscount = {
    title: '',
    name: '',
    description: '',
    data: '',
    imagePath: ''
  };
    this.isEdit = false;
    this.isAdd = false;
    this.getAll();
    this.isUploaded = false;
    this.uploadPercent = 0;
  }
  getAll(): void {
    this.discountService.getAllDiscounts().subscribe(
      (data: Idiscount[]) => this.discounts = data,
      (err: Error)=>console.log(err)
    )
  }
  add():void {
    if (this.isntEmptyField()) {
      this.discountService.postDiscount(this.editDiscount).subscribe(
        () => this.resetFields(),
        (err: Error)=>console.log(err)
      )
    }
  }
  edit(discount: Idiscount): void {
    this.isEdit = true;
    this.editDiscount = { ...discount };
    this.isUploaded = true;
   }
  save():void {
    if (this.isntEmptyField()) {
      this.discountService.patchDiscount(this.editDiscount).subscribe(
        () => this.resetFields(),
        (err: Error) => console.log(err)
      )
    }
  }
  delete(i: number | undefined): void {
    const url = this.discounts.find(el => el.id === i).imagePath;
    this.deleteImage(url); 
    this.discountService.delDiscount(i).subscribe(
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
            this.editDiscount.imagePath = url;
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
        this.editDiscount.imagePath = '';
      },
      (err) => console.log(err)
    )
  }
}
