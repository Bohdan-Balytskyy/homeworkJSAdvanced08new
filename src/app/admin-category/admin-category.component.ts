import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { ImageService } from '../services/image.service';
import { Icategory } from '../shared/interfaces/category';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  
  isEdit: boolean = false;
  isAdd: boolean = false;
  categorys: Icategory[] = [];
  myForm: FormGroup;
  uploadPercent: number = 0;
  isUploaded: boolean = false;

  constructor(private categoryService: CategoryService, private imageService: ImageService ) { 
    this.myForm = new FormGroup({
      "name": new FormControl("", Validators.required),
      "path": new FormControl("", Validators.required),
      "imagePath": new FormControl("", Validators.required),
      "id": new FormControl(null)
    });
    imageService.streamuploadPercent.subscribe(
      (data) => this.uploadPercent = data
    )
  }

  ngOnInit(): void {
    this.getAll();
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
    this.categoryService.getAllCategorys().subscribe(
      (data: Icategory[]) => this.categorys = data,
      (err: Error)=>console.log(err)
    )
  }
  add():void {
      this.categoryService.postCategory(this.myForm.value).subscribe(
        () => this.resetFields(),
        (err: Error)=>console.log(err)
      )
  }
  edit(category: Icategory): void {
    this.isEdit = true;
    this.myForm.patchValue({ ...category });
    this.isUploaded = true;
  }
  save():void {
      this.categoryService.patchCategory(this.myForm.value).subscribe(
        () => this.resetFields(),
        (err: Error) => console.log(err)
      )
  }
  delete(i: number | undefined): void {
    const url = this.categorys.find(el => el.id === i).imagePath;
    this.deleteImage(url); 
    this.categoryService.delCategory(i).subscribe(
      () => this.getAll(),
      (err: Error) => console.log(err)
    )
  }
  upload(event:any):void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        data.subscribe(
          (url) => {
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
