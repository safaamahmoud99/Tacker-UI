import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { requestCategory } from "../../../../../Shared/Models/requestCategory";
import { requestSubCategory } from "../../../../../Shared/Models/requestSubCategory";
import { RequestCategoryService } from "../../../../../Shared/Services/request-category.service";
import { RequestSubCategoryService } from "../../../../../Shared/Services/request-sub-category.service";
import { DepartmentService } from "../../../../../Shared/Services/department.service";
import { department } from "../../../../../Shared/Models/department";
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {


  lstCategories: requestCategory[]
  category: requestCategory
  lstSubCategories: requestSubCategory[]
  subCategory: requestSubCategory
  departments: department[]
  displayMaximizable: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private CategService: RequestCategoryService,
    private SubCategService: RequestSubCategoryService,
    private departmentService: DepartmentService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit(): void {
    this.lstCategories = []
    this.lstSubCategories = []

    this.category = {
      categoryName: '', departmentId: 0, departmentName: '', id: 0
    }
    this.subCategory = {
      RequestCategoryId: 0, id: 0, requestCategoryName: '', subCategoryName: ''
    }
    this.departmentService.GetAllDepartmens().subscribe(e => {
      this.departments = e
      console.log("depats", this.departments)
    })
    this.CategService.GetAllCategory().subscribe(e => {
      this.lstCategories = e
      this.subCategory.RequestCategoryId = Number(this.subCategory.RequestCategoryId)

    })
  }
  SaveSubCatToDB() {
    this.subCategory.RequestCategoryId = Number(this.subCategory.RequestCategoryId)
    console.log(this.subCategory)
    this.SubCategService.inserSubCategory(this.subCategory).subscribe(e => {
      this.router.navigate(['home/DisplayCategories']); 
      console.log(e)
    })
  }
  showMaximizableDialog() {
    this.displayMaximizable = true;
  }
  SaveCatToDB() {
    console.log(this.category)
    this.category.departmentId = Number(this.category.departmentId)

    this.CategService.inserCategory(this.category).subscribe(e=>{
      console.log(e)
    })
    this.displayMaximizable = false
  }
}
