import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Suppliers } from 'src/Shared/Models/Suppliers';
import { SuppliersService } from 'src/Shared/Services/suppliers.service';
@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

  lstSuppliers: Suppliers[];
  SuppliersObj:Suppliers;
  supp:Suppliers;
  Editboolean: boolean;
  displayBasic: boolean;
  NewDialogbool: boolean;
 isFound:boolean=false;
  constructor(private SuppliersService:SuppliersService, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.SuppliersObj={id:0,supplierName:''}
    this.SuppliersService.GetAllSuppliers().subscribe(
      res=>{this.lstSuppliers=res},
      err=>console.log(err)
    )
    this.checkName();
  }
  showBasicDialog(id) {
    this.displayBasic = true;
    this.SuppliersService.GetSupplierById(id).subscribe(
      data => { this.SuppliersObj = data },
      error => { console.log(error) }
    );
  }
  NewDialog() {
    this.NewDialogbool = true;
    this.SuppliersObj={id:0,supplierName:""}
  }
 
  EditDialog(id) {
    this.Editboolean = true;
    this.SuppliersService.GetSupplierById(id).subscribe(
      data => { this.SuppliersObj = data},
      error => { console.log(error) }
    )
  } 
  update(id) { 
   // console.log("id",id) 
     supp:Suppliers;
   
   this.messageService.clear();
      if(this.SuppliersObj.supplierName.trim()=="" || this.SuppliersObj.supplierName.trim().length<3)
      {
       
        this.messageService.add({ severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz enter valid supplier Name' });
        
      }
      else if (this.checkName())
      {
      this.messageService.add({ severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Supplier  Name aleardy exits' });
      this.isFound=false;
      }
    else {
    this.SuppliersService.updateSupplier(id,this.SuppliersObj).subscribe(
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
        this.SuppliersService.deleteSupplier(id).subscribe(
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
      if(this.SuppliersObj.supplierName.trim()=="" || this.SuppliersObj.supplierName.trim().length<3)
      {
        console.log("enter")
        this.messageService.add({ severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz enter valid supplier Name' });
        
      }
      else if (this.checkName())
      {
      this.messageService.add({ severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Supplier  Name aleardy exits' });
      this.isFound=false;
      }
      else{
       
          this.SuppliersService.insertSupplier(this.SuppliersObj).subscribe(
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
      LOadSuppliers()
      {
        this.SuppliersService.GetAllSuppliers().subscribe(
          res => { this.lstSuppliers=res},
          err => console.log(err)
        ) 
      } 
      checkName():boolean 
      {
        this.LOadSuppliers()
        for (let index = 0; index < this.lstSuppliers.length; index++)
        {
            if(this.lstSuppliers[index].supplierName==this.SuppliersObj.supplierName && this.lstSuppliers[index].id!=this.SuppliersObj.id)
            {
              console.log(this.lstSuppliers[index].supplierName);
              
            // this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Supplier  Name aleardy exits' });
              this.isFound=true;
              break;
            }
        }
        console.log( "supplier is "+ this.isFound);
        return this.isFound;
      
          
      }
   
}
