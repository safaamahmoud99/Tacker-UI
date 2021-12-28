import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { from } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import {OrganizationService } from 'src/Shared/Services/organization.service'
import { AuthService } from 'src/Shared/Services/auth.service';
import { client } from 'src/Shared/Models/client';
import { organization } from 'src/Shared/Models/organization';
import { ClientService } from 'src/Shared/Services/client.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-display-all-clients',
  templateUrl: './display-all-clients.component.html',
  styleUrls: ['./display-all-clients.component.css']
})
export class DisplayAllClientsComponent implements OnInit {
  lstclients:client[]
  clientObj:client
  organizations:organization[]
  organization:organization
  displayBasic: boolean;
  loading: boolean = true;
  constructor(private clientService:ClientService,public translate: TranslateService,private OrganizationService: OrganizationService, private router: Router,private authservice:AuthService,
    private confirmationService: ConfirmationService, private messageService: MessageService) {
     }
    ngOnInit(): void {
      this.lstclients = []
      this.organizations = []
      this.clientObj = {
        address:'',id:0,clientCode:'',clientName:'',email:'',gender:'',organizationId:0,organizationName:'',phone:''
      }
      this.clientService.GetAllClients().subscribe(e=>{
        this.lstclients = e,
        this.loading = false;
      })
      this.OrganizationService.GetAllOrganizations().subscribe(e=>{
        this.organizations = e
        
      })
    }

    showBasicDialog(id) {
      this.displayBasic = true;
      this.clientService.GetclientByID(id).subscribe(
          data => { this.clientObj = data },
          error => { console.log(error) }
      )
  }

  confirm(id) {
      this.confirmationService.confirm({
          message: 'Are you sure that you want to perform this action?',
          accept: () => {
              this.clientService.Deleteclient(id).subscribe(
                  data => {
                      this.ngOnInit(),
                          this.messageService.add({ severity: 'info', summary: 'Record Deleted!', detail: 'Record Deleted!' });
                  }
              )
          }
      });
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
