import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { department } from 'src/Shared/Models/department';
import { requestCategory } from 'src/Shared/Models/requestCategory';
import { requestSubCategory } from 'src/Shared/Models/requestSubCategory';
import { DepartmentService } from 'src/Shared/Services/department.service';
import { RequestCategoryService } from 'src/Shared/Services/request-category.service';
import { RequestSubCategoryService } from 'src/Shared/Services/request-sub-category.service';
import { CreateSubCategoryComponent } from '../../SubCategory/create-sub-category/create-sub-category.component';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-display-categories',
  templateUrl: './display-categories.component.html',
  styleUrls: ['./display-categories.component.css']
})
export class DisplayCategoriesComponent implements OnInit {

  // lang = this.translate.currentLang;
  lang=sessionStorage.getItem("lang")
  dir: string = "ltr";
  selectedTypeId: number;
  lstCategories: requestCategory[]
  category: requestCategory
  lstSubCategories: requestSubCategory[]
  subCategory: requestSubCategory
  getsubCategory: requestSubCategory
  departments: department[];
  categories:requestCategory[];
  loading: boolean = true;
  displayBasic: boolean;
  displayEditSubCategoryDialog:boolean=false
  selectedcateId:number;
  constructor(
    private CategService: RequestCategoryService,
    private SubCategService: RequestSubCategoryService,
    private messageservice: MessageService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,public translate: TranslateService) { }

  ngOnInit(): void {
    if (this.lang == "English") {
      this.dir = "ltr";
    }
    else {
      this.dir = "rtl";
    }

    this.getAllCategories();
    this.lstCategories = []
    this.lstSubCategories = []

    this.category = {
      categoryName: '', departmentId: 0, departmentName: '', id: 0
    }
    this.subCategory = {
      requestCategoryId: 0, id: 0, requestCategoryName: '', subCategoryName: ''
    }
    this.getsubCategory = {
      requestCategoryId: 0, id: 0, requestCategoryName: '', subCategoryName: ''
    }
    this.CategService.GetAllCategory().subscribe(e => {
      this.lstCategories = e
      this.subCategory.requestCategoryId = Number(this.subCategory.requestCategoryId)

    })
    // this.SubCategService.GetAllSubCategorys().subscribe(e => {
    //   this.lstSubCategories = e
    //   console.log("lstSubCategories", this.lstSubCategories)
    //   this.loading = false
    // })
  }
  filterSubCategoriesByCategoryId(id)
  {
    this.SubCategService.filterSubCategoriesByCategoryId(id).subscribe(d=>{
      this.lstSubCategories=d;
    })
    this.selectedcateId = id;
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
  GetSubCategory(id)
  {
    this.SubCategService.getSubCategoryById(id).subscribe(subCategory=>{
      this.getsubCategory=subCategory,
      console.log("sub",this.getsubCategory)
    })

  }
  dislpayEditDialog(id)
  {
    this.displayEditSubCategoryDialog=true;
    this.SubCategService.getSubCategoryById(id).subscribe(subCategory=>{
      this.getsubCategory=subCategory,
      console.log("sub",this.getsubCategory)
    })
  }
  getAllCategories()
  {
    this.CategService.GetAllCategory().subscribe(e => {
      this.categories = e
    })
  }
  Update(id)
  {
    this.SubCategService.editSubCategory(id,this.getsubCategory).subscribe(e=>{
      this.displayEditSubCategoryDialog=false;
      this.ngOnInit();
    })
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
  addCategory(id)
  {
    this.lang=sessionStorage.getItem("lang");
    const ref = this.dialogService.open(CategoryComponent, {
      header:  this.lang == 'English' ? 'Add Category' : 'إضافة تصنيف',
      width: '50%',
      style: {
        'dir':  this.lang == "English" ? 'ltr' : "rtl",
        "text-align":  this.lang == "English" ? 'left' : "right",
        "direction":  this.lang == "English" ? 'ltr' : "rtl"
      }
    });
    // ref.result.subscribe((result) => {
    //   if (result instanceof DialogCloseResult) {
    //     console.log("close");
    //   } else {
    //     console.log("action", result);
    //   }
    // });
    ref.onClose.subscribe(() => {
      this.ngOnInit()
    });
  }
  addSubCategory()
  {
    this.lang=sessionStorage.getItem("lang");
    const ref = this.dialogService.open(CreateSubCategoryComponent, {
      header:  this.lang == 'English' ? 'Add Sub Category' : 'إضافة تصنيف فرعي',
      data: {
        categoryId: this.selectedcateId
      },
      width: '50%',
      style: {
        'dir':  this.lang == "English" ? 'ltr' : "rtl",
        "text-align":  this.lang == "English" ? 'left' : "right",
        "direction":  this.lang == "English" ? 'ltr' : "rtl"
      }
    });
    // ref.onClose.subscribe(() => {
      // this.ngOnInit()
      ref.onClose.subscribe(res => {
        this.filterSubCategoriesByCategoryId(this.selectedcateId);
      });
    // });
  }
  editCategory(Catid)
  {
    this.lang=sessionStorage.getItem("lang");
    const ref = this.dialogService.open(CategoryComponent, {
      header:  this.lang == 'English' ? 'Edit Category' : 'تعديل تصنيف',
      data: {
        cateId: Catid
      },
      width: '50%',
      style: {
        'dir':  this.lang == "English" ? 'ltr' : "rtl",
        "text-align":  this.lang == "English" ? 'left' : "right",
        "direction":  this.lang == "English" ? 'ltr' : "rtl"
      }
    });
    ref.onClose.subscribe(() => {
      this.ngOnInit()
    });
  }
  editSubCategory(subCatId)
  {
    console.log("subId",subCatId)
    this.lang=sessionStorage.getItem("lang");
    this.dialogService
    const ref = this.dialogService.open(CreateSubCategoryComponent, {
      header:  this.lang == 'English' ? 'Edit Sub Category' : 'تعديل التصنيف الفرعي',
      data: {
        SubcateId: subCatId
      },
      width: '50%',
      style: {
        'dir':  this.lang == "English" ? 'ltr' : "rtl",
        "text-align":  this.lang == "English" ? 'left' : "right",
        "direction":  this.lang == "English" ? 'ltr' : "rtl"
      }
    });
    ref.onClose.subscribe(() => {
      this.filterSubCategoriesByCategoryId(this.selectedcateId);
    });
  }
  Delete(id,label)
  {
    console.log("label",label)
    if(label==="cat")
    {
      this.CategService.DeleteCategory(id).subscribe(()=>{
        this.ngOnInit();
      });
    }
    else if(label==="sub")
    {
      this.SubCategService.DeleteSubCategory(id).subscribe(()=>{
        this.filterSubCategoriesByCategoryId(this.selectedcateId);
      })
    }
  }
  confirmDelete(id, name,label) {
    console.log("this.translate.currentLang",this.translate.currentLang)
    if (this.translate.currentLang == 'English') {
      this.confirmationService.confirm({
        message: 'Do you want to delete ' + name + ' Category?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.Delete(id,label)
          this.messageservice.add({ severity: 'info', detail: 'Record deleted' });
        },
        reject: () => {
          this.messageservice.add({ severity: 'info', detail: 'Delete rejected' });
        },
        acceptLabel: "yes",
        rejectLabel: "No"
      });
    }
    else if (this.translate.currentLang == 'العربية') {
      this.confirmationService.confirm({
        message: 'هل انت متأكد من مسح' + name + 'من القائمه ',
        header: 'تاكيد عملية المسح',
        icon: 'pi pi-info-circle',

        accept: () => {
          this.Delete(id,label)
          this.messageservice.add({ severity: 'info', detail: 'تم المسح' });
        },
        reject: () => {
          this.messageservice.add({ severity: 'info', detail: 'تم رفض عملية المسح' });
        },
        acceptLabel: "نعم",
        rejectLabel: "لا",
      });
    }
  }
}
