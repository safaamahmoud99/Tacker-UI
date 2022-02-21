import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
 
import { city } from 'src/Shared/Models/city';
import { Governorate } from 'src/Shared/Models/governorate';
import { GovernorateService } from 'src/Shared/Services/governorate.service';
import { CityService } from 'src/Shared/Services/city.service';
import { GovernorateComponent } from '../governorate/governorate.component';
import { CityComponent } from '../city/city.component';

@Component({
  selector: 'app-governorates',
  templateUrl: './governorates.component.html',
  styleUrls: ['./governorates.component.css']
})
export class GovernoratesComponent implements OnInit {

  // lang = this.translate.currentLang;
  lang=sessionStorage.getItem("lang")
  dir: string = "ltr";
  selectedTypeId: number;
  lstGovernorates:Governorate[];
  governorate:Governorate;
  lstCity:city[]
  city:city;
  getCity:city;
  goves:Governorate[];
  loading: boolean = true;
  displayBasic: boolean;
  displayEditCityDialog:boolean=false
  selectedgovId:number;
  constructor(
    private governorateService:GovernorateService,
    private cityService:CityService,
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

   this.getAllGovernorates();
    this.lstGovernorates = []
    this.lstCity = []

    this.governorate = {
      id: 0,  governorateName: '' 
    }
    this.city = {
      id: 0, cityName: '',governorateId:0,governorateName: ''
    }
    this.getCity = {
      governorateId: 0, id: 0, governorateName: '', cityName: ''
    }
    this.governorateService.GetAllGovernorates().subscribe(e => {
      this.lstGovernorates = e
      this.city.governorateId = Number(this.city.governorateId);

    })
    // this.SubCategService.GetAllSubCategorys().subscribe(e => {
    //   this.lstSubCategories = e
    //   console.log("lstSubCategories", this.lstSubCategories)
    //   this.loading = false
    // })
  }
  filterCitybyGovernorateID(id)
  {
    this.cityService.filterCitiesbyGovbyid(id).subscribe(d=>{
      this.lstCity=d;
    })
    this.selectedgovId = id;
  }
  
  confirm(cityId) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.cityService.deletecity(cityId).subscribe(
          data => {
            this.ngOnInit(),
              this.messageService.add({ severity: 'info', summary: 'Record Deleted!', detail: 'Record Deleted!' });
          }
        )
      }
    });
    console.log("City",cityId)
  }
  Getcity(id)
  {
    this.cityService.GetcityById(id).subscribe(e=>{
      this.getCity=e,
      console.log("sub",this.getCity)
    })

  }
  dislpayEditDialog(id)
  {
    this.displayEditCityDialog=true;
    this.cityService.GetcityById(id).subscribe(e=>{
      this.getCity=e,
      console.log("sub",this.getCity)
    })
  }
  getAllGovernorates()
  {
    this.governorateService.GetAllGovernorates().subscribe(e => {
      this.goves = e
    })
  }
  // Update(id)
  // {
  //   this.cityService.updatecity(id, this.getCity).subscribe(e=>{
  //     this.displayEditCityDialog=false;
  //     this.ngOnInit();
  //   })
  // }
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
  addGov(id)
  {
    this.lang=sessionStorage.getItem("lang");
    const ref = this.dialogService.open(GovernorateComponent, {
      header:  this.lang == 'English' ? 'Add Governorate' : 'اضافة محافظة',
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
  addCity()
  {
    this.lang=sessionStorage.getItem("lang");
    const ref = this.dialogService.open(CityComponent, {
      header:  this.lang == 'English' ? 'Add City' : 'اضافة مدينة',
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
  editGov(gavid)
  {
    this.lang=sessionStorage.getItem("lang");
    const ref = this.dialogService.open(GovernorateComponent, {
      header:  this.lang == 'English' ? 'Edit Governorate' : 'تعديل المحافظة',
      data: {
        GovId:gavid
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
  editCity(citid)
  {
    console.log("city",citid)
    this.lang=sessionStorage.getItem("lang");
    this.dialogService
    const ref = this.dialogService.open(CityComponent, {
      header:  this.lang == 'English' ? 'Edit City' : ' تعديل المدينة ',
      data: {
        cityId:citid
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
  Delete(id,label)
  {
    console.log("label",label)
    if(label==="Gov")
    {
      this.governorateService.deleteGovernorate(id).subscribe(()=>{
        this.ngOnInit();
      });
    }
    else if(label==="City")
    {
      this.cityService.deletecity(id).subscribe(()=>{
        this.ngOnInit();
      })
    }
  }
  confirmDelete(id, name,label) {
    console.log("this.translate.currentLang",this.translate.currentLang)
    if (this.translate.currentLang == 'English') {
      this.confirmationService.confirm({
        message: 'Do you want to delete ' + name ,
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
