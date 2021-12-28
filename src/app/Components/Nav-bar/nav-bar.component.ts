import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
// import {PharmacyService} from '../../services/pharmacy.service'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
siteLanguage: string = 'English';
siteLocale: string;
pharmacyName:string
pharmacyID:Number
role:string
languageList = [
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'arabic' },
];
  items: MenuItem[];
  lang;

  constructor(public translate: TranslateService,private routee: Router) { 
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('ar');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ar/) ? browserLang : 'ar');
  }
  ngOnInit() {
    this.role = localStorage.getItem("roles")
    console.log(this.role)
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ['/home/showdrug'],
      },
      {
        label: 'Drug Mangement',
        icon: "pi pi-filter",
        items: [
          {

            label: 'Drug',
            icon: 'pi pi-fw pi-align-left',
            routerLink: ['/home/showdrug'],


          },
          {

            label: 'Category',
            icon: 'pi pi-fw pi-align-left',
            routerLink: ['/home/showCategories'],
            visible:this.role =='SuperAdmin'|| this.role=='Admin',

          },
          {
            label: 'SubCategory',
            icon: 'pi pi-fw pi-align-right',
            routerLink: ['/home/ADDSUBCATEGORY'],
            visible:this.role =='SuperAdmin'|| this.role=='Admin'
          },
          // {
          //   label: 'Form',
          //   routerLink: ['/home/form'],
          //   icon: 'pi pi-fw pi-align-center',
          //   visible: this.role =='SuperAdmin'|| this.role=='Admin'
          // },
          {
            label: 'Firm',
            icon: 'pi pi-fw pi-align-justify',
            routerLink: ['/home/firm'],
            visible:this.role =='SuperAdmin'|| this.role=='Admin',

          },
          {
            label: 'Supplier',
            icon: 'pi pi-fw pi-align-justify',
            routerLink: ['/home/supplier'],
            visible:this.role =='SuperAdmin'|| this.role=='Admin',

          }

        ]
      },
      {
        label: 'Orders',
        icon: 'pi pi-chart-bar',
        routerLink: ['addorder'],
        visible:this.role =='SuperAdmin'|| this.role=='Admin' || this.role=='Clerk',
        
      },

      {
        label: 'Employees',
        icon: 'pi pi-fw pi-power-off',
        routerLink: ['employee'],
        visible: this.role =='Admin'
      },
      {
        label: 'All Users',
        icon: 'pi pi-fw pi-power-off',
        routerLink: ['allusers'],
        visible: this.role =='Admin'

      }
      ,
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-power-off',
        routerLink: ['dashboard'],
        visible: this.role =='SuperAdmin'

      }
    ];

  }

  public logout() {
    console.log(localStorage.getItem("token"))
    localStorage.removeItem("token");
    this.routee.navigate(['/login'])
    localStorage.clear();
  }
}
