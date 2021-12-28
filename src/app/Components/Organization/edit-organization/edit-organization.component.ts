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
  OrgId: any
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
    private ngZone: NgZone) { }

  ngOnInit() {
    this.lstSelectedClients = []
    // id=this.activatedRoute.snapshot.params
    this.OrgId = this.activeRoute.snapshot.params['id'];
    console.log(this.OrgId)
    this.OrganizationClientsObj = {
      id: 0, clients: [], organizationId: 0, organizationName: ''
    }
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
    })
  }
}
