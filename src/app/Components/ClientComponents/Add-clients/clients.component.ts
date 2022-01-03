import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { organization } from 'src/Shared/Models/organization';
import { client } from "../../../../Shared/Models/client";
import { ClientService } from "../../../../Shared/Services/client.service";
import { OrganizationService } from "../../../../Shared/Services/organization.service";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
clients:client[]
client:client
organizations:organization[]
organization:organization
  constructor(private router: Router,private clientService:ClientService,private organizationService:OrganizationService,
    public translate: TranslateService) {

  }

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
    this.clientService.inserClient(this.client).subscribe(e=>{
      this.router.navigate(['home/DisplayAllClients']);
    })
  }
}