import { Component, OnInit, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { organization } from 'src/Shared/Models/organization';
import { OrganizationService } from 'src/Shared/Services/organization.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MouseEvent } from '@agm/core'; 
import { client } from 'src/Shared/Models/client';
import { OrganizationClientsService } from 'src/Shared/Services/organization-clients.service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { OrganizationClients } from 'src/Shared/Models/OrganizationClients';

@Component({
  selector: 'app-edit-organization',
  templateUrl: './edit-organization.component.html',
  styleUrls: ['./edit-organization.component.css']
})
export class EditOrganizationComponent implements OnInit {
  public sub: Observable<string>;
  public a: string;
  OrgId: any;
  Orgs:organization[];
  ISfound:boolean=false;
  organizationObj: organization
  lat: number = 30.0634890000;
  lng: number = 31.2524870000;
  public curicon = "http://www.google.com/intl/en_us/mapfiles/ms/micons/red-dot.png";
  zoom: number;
  address: string;
  lstSelectedClients: client[]
  lstClients: client[]
  OrganizationClientsObj: OrganizationClients
  constructor(private route: Router,
    private activeRoute: ActivatedRoute,
    private organizationService: OrganizationService, private organizationClientsService: OrganizationClientsService,
    private ngZone: NgZone,private messageService: MessageService) { }

  ngOnInit() {
    this.lstSelectedClients = []
    // id=this.activatedRoute.snapshot.params
    this.OrgId = this.activeRoute.snapshot.params['id'];
    console.log(this.OrgId)
    this.OrganizationClientsObj = {
      id: 0, clients: [], organizationId: 0, organizationName: ''
    }
    this.LOadOrs();
    // this.organizationObj = {lat:'',lng:'',address:'',id:0,
    // organizationName:'',
    // phone:'',location:'',mobile:'',organizationCode:'',responsiblePerson:''};

    this.organizationObj = { isDeleted: false, address: '', clients: [], id: 0, lat: 30.0634890000, lng: 31.2524870000, location: '', organizationCode: '', organizationName: '' }

    // this.OrgId = this.activatedRoute.snapshot.params['id'];
    this.organizationService.GetOrganizationByID(this.OrgId).subscribe(e => {
      this.organizationObj = e
      console.log(this.organizationObj)

    })
    this.organizationClientsService.GetAllAssignedClientsByOrganizationId(this.OrgId).subscribe(
      res => {
        this.lstSelectedClients = res
        console.log("lstSelectedClients", this.lstSelectedClients)
      }
    )
    this.organizationClientsService.GetAllUnassignedClientsforAnotherOrganizationAndAssignedByThisOrganizationId(this.OrgId).subscribe(
      // this.clientService.GetAllClients().subscribe(
      res => {
        this.lstClients = res
        console.log("lstClients", this.lstClients)

      },
      err => console.log(err)
    )
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
  onSubmit() {
    console.log("this.Orgs|",this.Orgs);
 
    this.messageService.clear();
    this.OrganizationClientsObj.clients=this.lstSelectedClients
    // if (this.organizationObj.organizationName == "") {
    //   this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz enter Organization Name' });
    // }   
    if(this.organizationObj.organizationName.trim()=="" ||this.organizationObj.organizationName.trim().length<3)
      {
        console.log("enter");
        this.messageService.add({  key :'tr',severity: 'error', summary: 'Attention !!!', sticky:true, detail: 'Plz enter valid Organization Name' });        
      }
      
      // if (this.checkName())
      // {
      //   console.log('asd');
      //   this.messageService.add({ key:'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Organization Name aleardy exits' });
      //   this.ISfound=false;
      // }
    if  (this.organizationObj.organizationCode.trim() == "" ||this.organizationObj.organizationCode.trim().length<2 ) {
      this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz enter Valid Organization Code' });
    }
    if (this.OrganizationClientsObj.clients.length == 0) {
      this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz select client' });
    }

    if (this.organizationObj.address == "" ) {
      this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz enter Address' });
     }
    if (this.organizationObj.organizationName != ""&& this.organizationObj.organizationName.trim().length>=3 && this.organizationObj.organizationCode != "" 
    && this.OrganizationClientsObj.clients.length!=0 &&this.organizationObj.address.trim().length>=3&& this.organizationObj.organizationCode.trim().length>=2) 
    {

    this.organizationObj.lat = Number(this.organizationObj.lat);
    this.organizationObj.lng = Number(this.organizationObj.lng);
    this.organizationService.UpdateOrganization(this.OrgId, this.organizationObj).subscribe(e => {
      this.OrganizationClientsObj.organizationId = this.OrgId
      this.OrganizationClientsObj.clients = this.lstSelectedClients
      console.log("OrganizationClientsObj",this.OrganizationClientsObj)
      console.log("lstSelectedClients",this.lstSelectedClients)
      this.organizationClientsService.UpdateByOrganizationId(this.OrganizationClientsObj.organizationId, this.OrganizationClientsObj.clients).subscribe(
        res => {
          this.route.navigate(['home/organizations']);

        }
      )
    });
  }
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
        if(this.Orgs[index].organizationName==this.organizationObj.organizationName)
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
