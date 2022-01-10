import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormGroup, PatternValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { organization } from 'src/Shared/Models/organization';
import { client } from "../../../../Shared/Models/client";
import { ClientService } from "../../../../Shared/Services/client.service";
import { OrganizationService } from "../../../../Shared/Services/organization.service";
import { FormBuilder } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
clients:client[]
client:client 
clientFormData:FormGroup
organizations:organization[]
organization:organization
  constructor(private router: Router,private clientService:ClientService,private organizationService:OrganizationService,
    public translate: TranslateService ,private _formBuilder: FormBuilder,private messageService: MessageService) {

  }
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 
  ngOnInit(): void {
    this.clients = []
    this.organizations = []
    this.client = {
      address:'',id:0,clientCode:'',clientName:'',email:'',gender:'',organizationId:0,organizationName:'',phone:''
    }
    this.clientService.GetAllClients().subscribe(e=>{
      this.clients = e
    })
    this.organizationService.GetAllOrganizations().subscribe(e=>{
      this.organizations = e
      
    })
  }
  saveClientToDB(){
    this.messageService.clear();
    if(this.client.clientName!="" && this.client.clientCode.trim().length>=2 && this.client.address.trim().length>=3 && this.client.phone.length>=3 &&this.isEmail()&&this.isPhone())
    {
      this.clientService.inserClient(this.client).subscribe(e=>{
        this.router.navigate(['home/DisplayAllClients']);
      },
      error=>{
        this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: error.error.message });

      }
      )
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record Added' });
    }
    else
    {
      this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz Complete Data' });
    }
   
  } 
  isEmail():boolean
  {
     
      var serchfind:boolean;
      var regexp;
      regexp =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      serchfind = regexp.test(this.client.email);

      console.log(serchfind)
      return serchfind
  }
  isPhone():boolean
  {
    var serchfind:boolean;
    var regexp;
    regexp =/^01[0-2,5]{1}[0-9]{8}$/;
    serchfind = regexp.test(this.client.phone);

    console.log(serchfind)
    return serchfind
  }
}