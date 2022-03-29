import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { city } from 'src/Shared/Models/city';
import { Governorate } from 'src/Shared/Models/governorate';
import { GovernorateService } from 'src/Shared/Services/governorate.service';

@Component({
  selector: 'app-governorate',
  templateUrl: './governorate.component.html',
  styleUrls: ['./governorate.component.css']
})
export class GovernorateComponent implements OnInit {

  @ViewChild('ejDialog') ejDialog:GovernorateComponent;
  lstGovernorates: Governorate[]
  governorate: Governorate
  lstCity: city[]
  city: city
  displayMaximizable: boolean = false;

  constructor(
    public dialogService: DialogService,
    private governorateService:GovernorateService,private config: DynamicDialogConfig,
    public translate: TranslateService,private ref: DynamicDialogRef,
    ) { }

  ngOnInit(): void {
    this.lstGovernorates = []
    this.lstCity = []

    this.governorate = {
      id: 0,governorateName: ''  
    }
    if(this.config.data!==undefined)
    {
      var GovId=this.config.data.GovId;
      this.governorateService.GetGovernorateeById(GovId).subscribe(c=>{
        this.governorate=c;
      });
    } 
      this.city = {
        id: 0, cityName: '',governorateId:0,governorateName: ''
      }    
   
      
    this.governorateService.GetAllGovernorates().subscribe(e => {
      this.lstGovernorates = e
      this.city.governorateId = Number(this.city.governorateId)

    })
  }
 
  showMaximizableDialog() {
    this.displayMaximizable = true;
  }
  SaveCatToDB() {
  }
  onSubmit()
  {
    console.log(this.governorate)
    if(this.config.data!==undefined)
    {
      this.Update(this.config.data.GovId)
    }
    else
    {
      if(this.governorate.governorateName.length>=3)
      {       
        this.governorateService.insertGovernorate(this.governorate).subscribe(()=>{
          this.ref.close();
        });
      }
    }
  }
  Update(id)
  {
    if(this.governorate.governorateName.length>=3)
    {
      
      this.governorateService.updateGovernorate(id,this.governorate).subscribe(() => {
        console.log("inside update")
        this.ref.close();
      })
    
    }
  }
  reset()
  {
    this.governorate = {
      id: 0,  governorateName: ''  
    }
    this.ref.close();
  }


}
