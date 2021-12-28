import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { organization } from 'src/Shared/Models/organization';
import { client } from "../../../../Shared/Models/client";
import { ClientService } from "../../../../Shared/Services/client.service";
import { OrganizationService } from "../../../../Shared/Services/organization.service";
@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  lstclients:client[]
  clientObj:client
  organizations:organization[]
  organization:organization
  clientId = this.activeRoute.snapshot.params['id'];
  constructor(private activeRoute: ActivatedRoute,private router: Router,private clientService:ClientService,
    private organizationService:OrganizationService,private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.lstclients = []
    this.organizations = []
    this.clientObj = {
      address:'',id:0,clientCode:'',clientName:'',email:'',gender:'',organizationId:0,organizationName:'',phone:''
    }
    this.clientService.GetclientByID(this.clientId).subscribe(e=>{
      this.clientObj = e
      console.log("clients",this.clientObj)
    })
    this.organizationService.GetAllOrganizations().subscribe(e=>{
      this.organizations = e
      
    })
  }
  update() {
    console.log(this.clientObj);
    this.clientObj.organizationId=Number(this.clientObj.organizationId);
    this.clientService.Updateclient(this.clientId, this.clientObj).subscribe(
      res => {
        this.messageService.add({ severity: 'info', summary: 'Record Updated!', detail: 'Record Updated!' });
        this.router.navigate(['home/DisplayAllClients']);
      },
      error => console.log(error),
    );
  }
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

}
