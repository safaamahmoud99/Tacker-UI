import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { requestCategory } from 'src/Shared/Models/requestCategory';
import { requestSubCategory } from 'src/Shared/Models/requestSubCategory';
import { RequestCategoryService } from 'src/Shared/Services/request-category.service';
import { RequestSubCategoryService } from 'src/Shared/Services/request-sub-category.service';

@Component({
  selector: 'app-create-sub-category',
  templateUrl: './create-sub-category.component.html',
  styleUrls: ['./create-sub-category.component.css']
})
export class CreateSubCategoryComponent implements OnInit {
  subCategory: requestSubCategory
  lstCategories: requestCategory[]=[]
  SubcatId:number;
  constructor(private CategService: RequestCategoryService,private SubCategService: RequestSubCategoryService,
    private config: DynamicDialogConfig,private ref: DynamicDialogRef, private messageService: MessageService) { }

  ngOnInit(): void {
    this.subCategory = {
      requestCategoryId: 0, id: 0, requestCategoryName: '', subCategoryName: ''
    }
    if(this.config.data!==undefined)
    {
      this.SubcatId=this.config.data.SubcateId;
      this.SubCategService.getSubCategoryById(this.SubcatId).subscribe(c=>{
        this.subCategory=c;
      });
    }
    
    this.CategService.GetAllCategory().subscribe(e => {
      this.lstCategories = e
    //  this.subCategory.requestCategoryId = Number(this.subCategory.requestCategoryId)
    })
  }
  onCategoryChange($event) {
    this.subCategory.requestCategoryId = $event.target.value;
  }

  reset()
  {
    this.subCategory = {
      requestCategoryId: 0, id: 0, requestCategoryName: '', subCategoryName: ''
    }
    this.ref.close();
  }
  onSubmit()
  {
    this.messageService.clear()
    if(this.config.data!==undefined)
    {
      this.Update(this.config.data.SubcateId);
    }
    else
    {
      if(this.subCategory.subCategoryName.trim().length>=3 &&this.subCategory.requestCategoryId!=0)
      {
        this.subCategory.requestCategoryId = Number(this.subCategory.requestCategoryId)
        this.SubCategService.inserSubCategory(this.subCategory).subscribe(() => {
          this.ref.close();
        })
      }
      else
      {
        this.messageService.add({key:'tr', severity: 'error', summary: 'Error', detail: 'please complete data' });
      }
    }
  }
  Update(id)
  {
    if(this.subCategory.subCategoryName.trim().length>=3)
    {
      this.subCategory.requestCategoryId = Number(this.subCategory.requestCategoryId)
      this.SubCategService.editSubCategory(id,this.subCategory).subscribe(() => {
        this.ref.close();
      })
    }
  }
}
