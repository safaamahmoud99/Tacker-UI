import { Component, NgZone, OnInit } from '@angular/core';
import { organization } from 'src/Shared/Models/organization';
import { OrganizationService } from '../../../../Shared/Services/organization.service';
import { MouseEvent } from '@agm/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { OrganizationClients } from 'src/Shared/Models/OrganizationClients';
import { OrganizationClientsService } from 'src/Shared/Services/organization-clients.service';
import { client } from 'src/Shared/Models/client';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.css']
})
export class AddOrganizationComponent implements OnInit {

  lat: number = 30.0634890000;
  lng: number = 31.2524870000;
  public curicon = "http://www.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png";
  public organizationObj: organization;
  zoom: number;
  address: string;
  lstSelectedOrganizationClients: OrganizationClients[]
  lstSelectedClients: client[]
  Orgs:organization[]
  OrganizationClientsObj: OrganizationClients
  OrganizationId: number;
  lstClients: client[];
  ISfound:boolean=false;
   

  constructor(private router: Router, private organizationService: OrganizationService,
    private ngZone: NgZone, private messageService: MessageService
    , private organizationClientsService: OrganizationClientsService,) { }

  ngOnInit(): void {
  
    this.lstClients = []
    this.lstSelectedClients = []
    this.lstSelectedOrganizationClients = []
    this.OrganizationClientsObj = {
      id: 0, clients: [], organizationId: 0, organizationName: ''   
    
    }
    this.organizationObj = {
      lat: 30.0634890000, lng: 31.2524870000, address: '', id: 0, isDeleted: false,
      organizationName: '',clients:[],
      location: '', organizationCode: ''
    };
    this.organizationClientsService.GetAllUnassignedClients().subscribe(
      //this.clientService.GetAllClients().subscribe(
      res => { this.lstClients = res },
      err => console.log(err)
    )
    this.LOadOrs();
  }

  // this.organizationService.GetAllOrganizations().subscribe(result => {
  //   this.lstOrganizationMarkers = result;
  // } 
  onSubmit() {
      console.log("this.Orgs|",this.Orgs);
    this.messageService.clear();
    this.OrganizationClientsObj.clients=this.lstSelectedClients
    // if (this.organizationObj.organizationName == "") {
    //   this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz enter Organization Name' });
    // }   
    if(this.organizationObj.organizationName.trim()=="" ||this.organizationObj.organizationName.trim().length<3)
      {
        console.log("enter")
        this.messageService.add({  key :'tr',severity: 'error', summary: 'Attention !!!', sticky:true, detail: 'Plz enter valid Organization Name' });
        return false;
        
      }
      if (this.checkName())
      {
        this.messageService.add({ key:'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Organization Name aleardy exits' });
        this.ISfound=false;
        return false;
      }
    if  (this.organizationObj.organizationCode.trim() == "" ||this.organizationObj.organizationCode.trim().length<2 ) {
      this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz enter Valid Organization Code' });
      return false;
    }
    if (this.OrganizationClientsObj.clients.length == 0) {
      this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz select client' });
      return false;
    }

    if (this.organizationObj.address == "" ) {
      this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz enter Address' });
         return false; 
     }
    if (this.organizationObj.organizationName != ""&& this.organizationObj.organizationName.trim().length>=3 && this.checkName()!=true&&this.organizationObj.organizationCode != "" 
    && this.OrganizationClientsObj.clients.length!=0 &&this.organizationObj.address.trim().length>=3&& this.organizationObj.organizationCode.trim().length>=2)
     {
      console.log(this.organizationObj);
      this.organizationObj.lat = Number(this.organizationObj.lat);
      this.organizationObj.lng = Number(this.organizationObj.lng);
      this.organizationService.AddOrganization(this.organizationObj).subscribe((item) => {
      
        this.OrganizationId = Number(item)
        this.OrganizationClientsObj.organizationId=  this.OrganizationId
        this.organizationClientsService.insertOrganizationClient(this.OrganizationClientsObj).subscribe(
          res => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Organization Added' });
            this.router.navigate(['home/organizations']);
          }
        )
      });

    }
    // else
    // {
    //   this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz complete data' });
    // }
  }

  mapClicked($event: MouseEvent) {
    let lat: number = $event.coords.lat;
    let lng: number = $event.coords.lng;
    console.log('lat: ', lat);
    console.log('lng: ', lng);
    this.organizationObj.lat = lat;
    this.organizationObj.lng = lng;
    this.getAddress(lat, lng);
    this.organizationObj.address = this.address;
    console.log(this.address)
  }

  getAddress(lat, lng) {
    const geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(lat, lng);
    const request: google.maps.GeocoderRequest = {
      location: latlng
    };
    geocoder.geocode(request, (results, status) => {
      this.ngZone.run(() => {
        this.address = results[0].formatted_address;
        return this.address
      });
    });
  }
 
  LOadOrs()
  {
    this.organizationService.GetAllOrganizations().subscribe(
      //this.clientService.GetAllClients().subscribe(
      res => { this.Orgs = res },
      err => console.log(err)
    ) 
  }   

  checkName():boolean 
  {
    this.LOadOrs();
    for (let index = 0; index < this.Orgs.length; index++)
    {
        if(this.Orgs[index].organizationName==this.organizationObj.organizationName && this.Orgs[index].id!=this.organizationObj.id)
        {
          console.log(this.Orgs[index].organizationName);
          
        // this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Supplier  Name aleardy exits' });
          this.ISfound=true;
          break;
        }
    }
   
    return this.ISfound;    
  }
    

  }


 
