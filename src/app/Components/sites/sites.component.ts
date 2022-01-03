import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Sites } from 'src/Shared/Models/Sites';
import { SitesService } from 'src/Shared/Services/sites.service';
@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {
  lstSites: Sites[];
  SitesObj:Sites;
  Editboolean: boolean;
  displayBasic: boolean;
  NewDialogbool: boolean;
  isFound:boolean=false;
  constructor(private SitesService:SitesService, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.SitesObj={id:0,sitename:''}
    this.SitesService.GetAllSites().subscribe(
      res=>{this.lstSites=res},
      err=>console.log(err)
    )
  }
  showBasicDialog(id) {
    this.displayBasic = true;
    this.SitesService.GetSiteById(id).subscribe(
      data => { this.SitesObj = data },
      error => { console.log(error) }
    );
  }
  NewDialog() {
    this.NewDialogbool = true;
    this.SitesObj={id:0,sitename:""}
  }
  // add() {
  //   this.SitesService.insertSite(this.SitesObj).subscribe(
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
    this.SitesService.GetSiteById(id).subscribe(
      data => { this.SitesObj = data},
      error => { console.log(error) }
    )
  }
  update(id) {
    this.messageService.clear();
    if(this.SitesObj.sitename.trim()=="" || this.SitesObj.sitename.trim().length<3)
    {
     
      this.messageService.add({ severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz enter valid Site Name' });
      
    }
    else if (this.checkName())
    {
    this.messageService.add({ severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Site Name aleardy exits' });
    this.isFound=false;
    }
  else {
    console.log("id",id)
    this.SitesService.updateSite(id,this.SitesObj).subscribe(
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
        this.SitesService.deleteSite(id).subscribe(
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
      if(this.SitesObj.sitename.trim()=="" || this.SitesObj.sitename.trim().length<3)
      {
        console.log("enter")
        this.messageService.add({ severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz enter valid Site Name' });
        
      }
      else if (this.checkName())
      {
      this.messageService.add({ severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Site Name aleardy exits' });
      this.isFound=false;
      }
      else{
       
          this.SitesService.insertSite(this.SitesObj).subscribe(
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
      LOadSits()
      {
        this.SitesService.GetAllSites().subscribe(
          res => { this.lstSites=res},
          err => console.log(err)
        ) 
      } 
      checkName():boolean 
      {
        this.LOadSits()
        for (let index = 0; index < this.lstSites.length; index++)
        {
            if(this.lstSites[index].sitename==this.SitesObj.sitename)
            {
              console.log(this.lstSites[index].sitename);
              
            // this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Supplier  Name aleardy exits' });
              this.isFound=true;
              break;
            }
        }
        console.log( "Site is "+ this.isFound);
        return this.isFound;          
      }
   
}
