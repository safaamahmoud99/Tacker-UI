import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { department } from 'src/Shared/Models/department';
import { requestCategory } from 'src/Shared/Models/requestCategory';
import { requestSubCategory } from 'src/Shared/Models/requestSubCategory';
import { DepartmentService } from 'src/Shared/Services/department.service';
import { RequestCategoryService } from 'src/Shared/Services/request-category.service';
import { RequestSubCategoryService } from 'src/Shared/Services/request-sub-category.service';

@Component({
  selector: 'app-display-categories',
  templateUrl: './display-categories.component.html',
  styleUrls: ['./display-categories.component.css']
})
export class DisplayCategoriesComponent implements OnInit {

  lstCategories: requestCategory[]
  category: requestCategory
  lstSubCategories: requestSubCategory[]
  subCategory: requestSubCategory
  departments: department[]
  loading: boolean = true;
  displayBasic: boolean;
  constructor(
    private httpClient: HttpClient,
    private CategService: RequestCategoryService,
    private SubCategService: RequestSubCategoryService,
    private departmentService: DepartmentService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.lstCategories = []
    this.lstSubCategories = []

    this.category = {
      categoryName: '', departmentId: 0, departmentName: '', id: 0
    }
    this.subCategory = {
      RequestCategoryId: 0, id: 0, requestCategoryName: '', subCategoryName: ''
    }
    this.CategService.GetAllCategory().subscribe(e => {
      this.lstCategories = e
      this.subCategory.RequestCategoryId = Number(this.subCategory.RequestCategoryId)

    })
    this.SubCategService.GetAllSubCategorys().subscribe(e => {
      this.lstSubCategories = e
      console.log("lstSubCategories", this.lstSubCategories)
      this.loading = false
    })
  }

  confirm(subcategoryId) {
   
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.SubCategService.DeleteSubCategory(subcategoryId).subscribe(
          data => {
            this.ngOnInit(),
              this.messageService.add({ severity: 'info', summary: 'Record Deleted!', detail: 'Record Deleted!' });
          }
        )
      }
    });
    console.log("subcategoryId", subcategoryId)
  }
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }

  showInfo() {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content' });
  }

  showWarn() {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Message Content' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
  }

  showTopLeft() {
    this.messageService.add({ key: 'tl', severity: 'info', summary: 'Info', detail: 'Message Content' });
  }

  showTopCenter() {
    this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Message Content' });
  }

  showBottomCenter() {
    this.messageService.add({ key: 'bc', severity: 'info', summary: 'Info', detail: 'Message Content' });
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed' });
  }

  showMultiple() {
    this.messageService.addAll([
      { severity: 'info', summary: 'Message 1', detail: 'Message Content' },
      { severity: 'info', summary: 'Message 2', detail: 'Message Content' },
      { severity: 'info', summary: 'Message 3', detail: 'Message Content' }
    ]);
  }

  showSticky() {
    this.messageService.add({ severity: 'info', summary: 'Sticky', detail: 'Message Content', sticky: true });
  }

  onConfirm() {
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }

  clear() {
    this.messageService.clear();
  }
}
