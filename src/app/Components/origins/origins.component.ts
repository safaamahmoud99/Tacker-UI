import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Origins } from 'src/Shared/Models/Origins';
import { OriginsService } from 'src/Shared/Services/origins.service';
@Component({
  selector: 'app-origins',
  templateUrl: './origins.component.html',
  styleUrls: ['./origins.component.css']
})
export class OriginsComponent implements OnInit {

  lstOrigins: Origins[];
  OriginsObj:Origins;
  Editboolean: boolean;
  displayBasic: boolean;
  NewDialogbool: boolean;
  isFound:boolean=false;
  constructor(private OriginsService:OriginsService, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.OriginsObj={id:0,originName:''}
    this.OriginsService.GetAllOrigins().subscribe(
      res=>{this.lstOrigins=res},
      err=>console.log(err)
    ) 
    this.checkName();
  }
  showBasicDialog(id) {
    this.displayBasic = true;
    this.OriginsService.GetOriginById(id).subscribe(
      data => { this.OriginsObj = data },
      error => { console.log(error) }
    );
  }
  NewDialog() {
    this.NewDialogbool = true;
    this.OriginsObj={id:0,originName:""}
  }
  // add() {
  //   this.OriginsService.inserOrigin(this.OriginsObj).subscribe(
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
    this.OriginsService.GetOriginById(id).subscribe(
      data => { this.OriginsObj = data},
      error => { console.log(error) }
    )
  }
  update(id) {
    console.log("id",id) 
    this.messageService.clear();
    if(this.OriginsObj.originName.trim()=="" || this.OriginsObj.originName.trim().length<3)
    {
     
      this.messageService.add({ severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz enter valid Origin Name' });
      
    }
    else if (this.checkName())
    {
    this.messageService.add({ severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Origin  Name aleardy exits' });
    this.isFound=false;
    }
  else {
    this.OriginsService.updateOrigin(id,this.OriginsObj).subscribe(
      data => { this.ngOnInit()
        this.messageService.add({ severity: 'info', summary: 'Record Updated!', detail: 'Record Updated!' });
      },
      error => { console.log(error) }
    );
    this.Editboolean = false;
  }
}

// this.SuppliersService.updateSupplier(id,this.SuppliersObj).subscribe(
//   data => { this.ngOnInit()
//     this.messageService.add({ severity: 'info', summary: 'Record Updated!', detail: 'Record Updated!' });
//   },
//   error => { console.log(error) }
// );
// this.Editboolean = false;  



  confirm(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.OriginsService.deleteOrigin(id).subscribe(
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
    if(this.OriginsObj.originName.trim()=="" || this.OriginsObj.originName.trim().length<3)
    {
      console.log("enter")
      this.messageService.add({ severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz enter valid Origin Name' });
      
    }
    else if (this.checkName())
    {
    this.messageService.add({ severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Origin Name aleardy exits' });
    this.isFound=false;
    }
    else{
     
        this.OriginsService.inserOrigin(this.OriginsObj).subscribe(
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

    LOadOrigins()
    {
      this.OriginsService.GetAllOrigins().subscribe(
        res => { this.lstOrigins=res},
        err => console.log(err)
      ) 
    } 
  
    checkName():boolean 
    {
      this.LOadOrigins()
      for (let index = 0; index < this.lstOrigins.length; index++)
      {
          if(this.lstOrigins[index].originName==this.OriginsObj.originName && this.lstOrigins[index].id!=this.OriginsObj.id)
          {
            console.log(this.lstOrigins[index].originName);
            
          // this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Supplier  Name aleardy exits' });
            this.isFound=true;
            break;
          }
      }
      console.log( "Origin is  "+ this.isFound);
      return this.isFound;
    
        
    }

}
