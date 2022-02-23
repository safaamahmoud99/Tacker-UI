import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { city } from 'src/Shared/Models/city';
import { Governorate } from 'src/Shared/Models/governorate';
import { Sites } from 'src/Shared/Models/Sites';
import { CityService } from 'src/Shared/Services/city.service';
import { GovernorateService } from 'src/Shared/Services/governorate.service';
import { SitesService } from 'src/Shared/Services/sites.service';
@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {
  lstSites: Sites[]=[];
  citiesFiter:city[]=[];
  SitesObj:Sites;
  GovList:Governorate[]=[];
  CityList:city[]=[];
  Editboolean: boolean;
  displayBasic: boolean;
  NewDialogbool: boolean;
  isFound:boolean=false;
  constructor(private SitesService:SitesService, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService,
  private governorateService:GovernorateService, private cityService:CityService ) { }

  ngOnInit(): void {
    this.SitesObj={id:0,sitename:'',address:"",phone:"",governorateId:0,governorateName:"",cityId:0,cityName:""}
    this.SitesService.GetAllSites().subscribe(
      res=>{this.lstSites=res},
      err=>console.log(err)
    )
   this.governorateService.GetAllGovernorates().subscribe(
    res=>{this.GovList=res},
    err=>console.log(err)
   )
   console.log("governorate",this.GovList);
  this.cityService.GetAllcities().subscribe(
    res=>{this.CityList=res,
      console.log("cityuuuuu",this.citiesFiter)},  
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
    console.log("this.SitesObj",this.SitesObj)
    this.NewDialogbool = true;
  //  this.SitesObj={id:0,sitename:"",address:"",phone:"",governorateId:0,governorateName:"",cityId:0,cityName:""}
   this.citiesFiter=[];
  this.ngOnInit();

  }
  EditDialog(id) {
    this.Editboolean = true;
    console.log("beforeedit",this.SitesObj)
    this.SitesService.GetSiteById(id).subscribe(
      data => { this.SitesObj = data,
        this.citiesFiter=this.CityList.filter(item=>item.governorateId===data.governorateId);
           this.SitesObj.cityId=data.cityId
        console.log("aftereedit",this.SitesObj)
     ,
      error => { console.log(error) }
       
       
    }
    )   
  }
  update(id) {
    this.messageService.clear();
    if(this.SitesObj.governorateId==0 || this.SitesObj.cityId==0 || this.SitesObj.cityName=="")
    {
     
      this.messageService.add({ key:"as", severity: 'error', summary: 'Attention !!!', sticky:false, detail: 'Plz Comlete data' });
      return;
      
    }
  if (this.checkName())
    {
    this.messageService.add({ key:"as", severity: 'error', summary: 'Attention !!!', sticky:false, detail: 'Hospital Name aleardy exits' });
    this.isFound=false;
    return;
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
       
      if(this.SitesObj.governorateId==0 || this.SitesObj.cityId==0  )
      {
         
        this.messageService.add({ key:"as", severity: 'error', summary: 'Attention !!!', sticky:false, detail: 'Plz complete data' });
        return;
        
      }
     if (this.checkName())
      {
      this.messageService.add({ key:"as", severity: 'error', summary: 'Attention !!!', sticky:false, detail: 'Hospital Name aleardy exits' });
      this.isFound=false;
      return;
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
        for (let index = 0; index < this.lstSites.length; index++ )
        {
            if(this.lstSites[index].sitename==this.SitesObj.sitename && this.lstSites[index].id!=this.SitesObj.id)
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
   OnchangeGovId(i)
   { 
    this.citiesFiter=[];

   //  this.CityList.length=0;
      this.SitesObj.cityId=0;
     console.log("I",i);
     this.cityService.filterCitiesbyGovbyid(this.SitesObj.governorateId).subscribe(
       res=>{this.citiesFiter=res}    
     )    
     console.log("this.citiesFiter",this.citiesFiter);
   }
  //  OnchangeGovIdU(i)
  //  {
  // //  this.citiesFiter=[];

  //  //  this.CityList.length=0;
  //  //  this.SitesObj.cityId=0;
  //    console.log("I",i);
  //    this.cityService.filterCitiesbyGovbyid(this.SitesObj.governorateId).subscribe(
  //      res=>{this.citiesFiter=res}    
  //    )    
  //    console.log("this.citiesFiter",this.citiesFiter);
  //  }
}
