import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { city } from 'src/Shared/Models/city';
import { Governorate } from 'src/Shared/Models/governorate';
import { CityService } from 'src/Shared/Services/city.service';
import { GovernorateService } from 'src/Shared/Services/governorate.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  city: city
  lstGovernorates:Governorate[]=[]
  cityId:number;
  constructor(private governorateService:GovernorateService,private cityService:CityService,
    private config:DynamicDialogConfig,private ref: DynamicDialogRef, private messageService: MessageService) { }

  ngOnInit(): void {
    this.city = {
      id: 0, cityName: '',governorateId:0,governorateName: ''
    }
    if(this.config.data!==undefined)
    {
      this.cityId=this.config.data.cityId;
      this.cityService.GetcityById(this.cityId).subscribe(c=>{
        this.city=c;
      });
    }
    
    this.governorateService.GetAllGovernorates().subscribe(e => {
      this.lstGovernorates = e
    //  this.subCategory.requestCategoryId = Number(this.subCategory.requestCategoryId)
    })
  }
  ongovChange($event) {
    this.city.governorateId= $event.target.value;
  }

  reset()
  {
    this.city = {
      id: 0, cityName: '',governorateId:0,governorateName: ''
    }
    this.ref.close();
  }
  onSubmit()
  {
    this.messageService.clear();
    if(this.config.data!==undefined)
    {
      this.Update(this.config.data.cityId);
    }
    else
    {
      if(this.city.cityName.trim().length>=3 &&this.city.governorateId!=0)
      {
        this.city.governorateId = Number(this.city.governorateId)
        this.cityService.insertcity(this.city).subscribe(() => {
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
    if(this.city.cityName.trim().length>=3)
    {
      this.city.governorateId = Number(this.city.governorateId)
      this.cityService.updatecity(id,this.city).subscribe(() => {
        this.ref.close();
      })
    }
  }
  // showTopLeft() {
  //   this.messageService.add({ key: 'tl', severity: 'info', summary: 'Info', detail: 'Message Content' });
  // }
}
