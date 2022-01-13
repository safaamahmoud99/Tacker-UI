import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../Shared/Services/login.service'
import { error } from '@angular/compiler/src/util';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { OrganizationClients } from 'src/Shared/Models/OrganizationClients';
import { OrganizationClientsService } from 'src/Shared/Services/organization-clients.service';
import { project } from 'src/Shared/Models/project';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [MessageService]
})
export class SignupComponent implements OnInit {
  email: any
  password: any
  role: string
  LoginedUserId: string;
  OrganizationClientsObj: OrganizationClients
  clientId: number;
  lstProjectsByOrganization: project[]
  constructor(private loginSer: LoginService,private organizationClientsService: OrganizationClientsService, private routee: Router, private messageService: MessageService) { }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  ngOnInit() {
    this.lstProjectsByOrganization=[]
    this.OrganizationClientsObj={id:0,organizationId:0,organizationName:'',clients:[]}
  }
  getData() {
    this.messageService.clear();

    this.loginSer.login(this.email, this.password)
      .subscribe(
        res => {
          localStorage.setItem("User",JSON.stringify(res))
          console.log("localStorage",localStorage.getItem("User"))
          localStorage.setItem("clientId", res["clientId"])
          this.clientId=res["clientId"]
          localStorage.setItem("token", res["token"])
          localStorage.setItem("email", res["email"])
          localStorage.setItem("roles", res["roles"])
          localStorage.setItem("userName", res['userName']);
          localStorage.setItem("id", res['id']);
          localStorage.setItem("loginedUserId", res['loginedUserId']);
          this.role= localStorage.getItem("roles")
          if (this.role == 'SuperAdmin'||this.role == 'PMO' || this.role=='Admin') {
            this.routee.navigate(['/home/piechart'])
          }
          if(this.role =='PM'){
            this.routee.navigate(['/home/projectManagerDashboard'])
          }
           if (this.role == 'Client') {
            this.routee.navigate(['/home/allClientReqts'])
          }
          if (this.role == 'TL') {
            this.routee.navigate(['/home/allTeamLeaderReqts'])
          }
          if (this.role == 'Employee') {
            this.routee.navigate(['/home/allEmpAssignedRequests'])
          }
          if(this.role == 'ClientManager')
          {
            this.routee.navigate(['/home/ClientManagerComponent'])
            // this.organizationClientsService.GetOrganizationByClientId(this.clientId).subscribe(
            //   res=>{
            //       this.lstProjectsByOrganization=res
            //       if(this.lstProjectsByOrganization==null)
            //       {
            //         this.routee.navigate(['/home/allClientReqts'])
            //       }
            //       else
            //       {
            //         this.routee.navigate(['/home/projectsForProjectManager'])
            //       }
            //   }
            // )
          }
          // else {
          //   this.routee.navigate(['/home/tabs'])
          // }
        },
          error => {console.log(error),
          this.messageService.add({severity:'error', summary:'Login Error',
          detail:'UserName or Password Not Correct!'});
         // this.showTopCenter()
        });
    // localStorage.clear();
  }
  onReject() {
    this.messageService.clear('c');
  }
  clear() {
    this.messageService.clear();
  }

  showTopCenter() {
    this.messageService.add({ key: 'tc', severity: 'error', summary: 'Attention !!!', sticky:true, detail: 'User Name or password is incorrect' });
  }
  changePassword(){
    // routerLink="/changePassword"
  }

  // showSticky() {
  //   this.messageService.add({severity:'info', summary: 'Sticky', detail: 'Message Content', sticky: true});
  // }




}
