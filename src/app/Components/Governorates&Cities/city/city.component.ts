import { Component, OnInit } from '@angular/core';
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
    private config: DynamicDialogConfig,private ref: DynamicDialogRef) { }

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
  }
  onSubmit()
  {
    if(this.config.data!==undefined)
    {
      this.Update(this.config.data.cityId);
    }
    else
    {
      if(this.city.cityName.trim().length>=3)
      {
        this.city.governorateId = Number(this.city.governorateId)
        this.cityService.insertcity(this.city).subscribe(() => {
          this.ref.close();
        })
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
}
