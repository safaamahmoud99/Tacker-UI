import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Brand } from 'src/Shared/Models/Brand';
import { BrandService } from 'src/Shared/Services/brand.service';
@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  lstBrand: Brand[];
  BrandObj:Brand;
  Editboolean: boolean;
  displayBasic: boolean;
  NewDialogbool: boolean;
  isFound:boolean=false;
  constructor(private BrandService:BrandService, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.BrandObj={id:0,brandName:''}
    this.BrandService.GetAllBrands().subscribe(
      res=>{this.lstBrand=res},
      err=>console.log(err)
    )
  }
  showBasicDialog(id) {
    this.displayBasic = true;
    this.BrandService.GetBrandById(id).subscribe(
      data => { this.BrandObj = data },
      error => { console.log(error) }
    );
  }
  NewDialog() {
    this.NewDialogbool = true;
    this.BrandObj={id:0,brandName:""}
  }
  // add() {
  //   this.BrandService.insertBrand(this.BrandObj).subscribe(
  //     res => {
  //       this.NewDialogbool = false;
  //       this.ngOnInit(),
  //       this.messageService.add({ severity: 'info', summary: 'Record Added!', detail: 'Record Added!' });
  //     },
  //     error => console.log(error),
  //   );
  // }
  EditDialog(id) {
    this.Editboolean = true;
    this.BrandService.GetBrandById(id).subscribe(
      data => { this.BrandObj = data},
      error => { console.log(error) }
    )
  }
  update(id) {
    this.messageService.clear();
    if(this.BrandObj.brandName.trim()=="" || this.BrandObj.brandName.trim().length<3)
    {
     
      this.messageService.add({ severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz enter valid Brand Name' });
      
    }
    else if (this.checkName())
    {
    this.messageService.add({ severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Brand  Name aleardy exits' });
    this.isFound=false;
    }
  else {
    this.BrandService.updateBrand(id,this.BrandObj).subscribe(
      data => { this.ngOnInit()
        this.messageService.add({ severity: 'info', summary: 'Record Updated!', detail: 'Record Updated!' });
      },
      error => { console.log(error) }
    );
    this.Editboolean = false;
  }
  }
  confirm(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.BrandService.deleteBrand(id).subscribe(
          data => {
            this.ngOnInit(),
              this.messageService.add({ severity: 'info', summary: 'Record Deleted!', detail: 'Record Deleted!' });
          }
        )
      }
    });
  }
   //Toast
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
  onsubmit()
  { 
    this.messageService.clear(); 
    //if (this.organizationObj.organizationName == "") {
   // this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz enter Organization Name' });
    if(this.BrandObj.brandName.trim()=="" || this. BrandObj.brandName.trim().length<3)
    {
      console.log("enter")
      this.messageService.add({ severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz enter valid Brand Name' });
      
    }
    else if (this.checkName())
    {
    this.messageService.add({ severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Brand Name aleardy exits' });
    this.isFound=false;
    }
    else{
     
        this.BrandService.insertBrand(this.BrandObj).subscribe(
          res => {
            this.NewDialogbool = false;
            this.ngOnInit(),
            this.messageService.add({ severity: 'info', summary: 'Record Added!', detail: 'Record Added!' });
          },
          error => console.log(error),
        );
       this.messageService.clear();
      }

    } 
    LOadBrands()
    {
      this.BrandService.GetAllBrands().subscribe(
        res => { this.lstBrand=res},
        err => console.log(err)
      ) 
    } 
    checkName():boolean 
    {
      this.LOadBrands()
      for (let index = 0; index < this.lstBrand.length; index++)
      {
          if(this.lstBrand[index].brandName==this. BrandObj.brandName)
          {
            console.log(this.lstBrand[index].brandName);
            
          // this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Supplier  Name aleardy exits' });
            this.isFound=true;
            break;
          }
      }
      console.log( "Brand is "+ this.isFound);
      return this.isFound;
    
        
    }
}

