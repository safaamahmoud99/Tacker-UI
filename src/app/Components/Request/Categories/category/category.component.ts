import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { requestCategory } from "../../../../../Shared/Models/requestCategory";
import { requestSubCategory } from "../../../../../Shared/Models/requestSubCategory";
import { RequestCategoryService } from "../../../../../Shared/Services/request-category.service";
import { RequestSubCategoryService } from "../../../../../Shared/Services/request-sub-category.service";
import { DepartmentService } from "../../../../../Shared/Services/department.service";
import { department } from "../../../../../Shared/Models/department";
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @ViewChild('ejDialog') ejDialog: CategoryComponent;
  lstCategories: requestCategory[]
  category: requestCategory
  lstSubCategories: requestSubCategory[]
  subCategory: requestSubCategory
  departments: department[]
  displayMaximizable: boolean = false;

  constructor(
    public dialogService: DialogService,
    private CategService: RequestCategoryService,private config: DynamicDialogConfig,
    public translate: TranslateService,private ref: DynamicDialogRef,
    private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.lstCategories = []
    this.lstSubCategories = []

    this.category = {
      categoryName: '', departmentId: 0, departmentName: '', id: 0
    }
    if(this.config.data!==undefined)
    {
      var catId=this.config.data.cateId;
      this.CategService.getCategory(catId).subscribe(c=>{
        this.category=c;
      });
    }
    this.subCategory = {
      requestCategoryId: 0, id: 0, requestCategoryName: '', subCategoryName: ''
    }
    this.departmentService.GetAllDepartmens().subscribe(e => {
      this.departments = e
      console.log("depats", this.departments)
    })
    this.CategService.GetAllCategory().subscribe(e => {
      this.lstCategories = e
      this.subCategory.requestCategoryId = Number(this.subCategory.requestCategoryId)

    })
  }
  SaveSubCatToDB() {
  //   if(this.subCategory.subCategoryName.trim().length>=3)
  //   {
  //   this.subCategory.requestCategoryId = Number(this.subCategory.requestCategoryId)
  //   console.log(this.subCategory)
  //   this.SubCategService.inserSubCategory(this.subCategory).subscribe(e => {
  //     this.router.navigate(['home/DisplayCategories']);
  //     console.log(e)
  //   })
  // }
  }
  showMaximizableDialog() {
    this.displayMaximizable = true;
  }
  SaveCatToDB() {
  }
  onSubmit()
  {
    console.log(this.category)
    if(this.config.data!==undefined)
    {
      this.Update(this.config.data.cateId)
    }
    else
    {
      if(this.category.categoryName.trim().length>=3)
      {
        this.category.departmentId = Number(this.category.departmentId)
        this.CategService.inserCategory(this.category).subscribe(()=>{
          this.ref.close();
        });
      }
    }
  }
  Update(id)
  {
    if(this.category.categoryName.trim().length>=3)
    {
      console.log("inside update")
      this.CategService.editCategory(id,this.category).subscribe(() => {
        this.ref.close();
      })
    }
  }
  reset()
  {
    this.category = {
      categoryName: '', departmentId: 0, departmentName: '', id: 0
    }
  }

}
