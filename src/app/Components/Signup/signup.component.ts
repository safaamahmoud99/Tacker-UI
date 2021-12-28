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

    this.loginSer.login(this.email, this.password)
      .subscribe(
        res => {
          localStorage.setItem("clientId", res["clientId"])
          this.clientId=res["clientId"]
          console.log("res is ", res)
          console.log("clientId", res["clientId"])
          localStorage.setItem("token", res["token"])
          localStorage.setItem("email", res["email"])
          localStorage.setItem("roles", res["roles"])
          localStorage.setItem("userName", res['userName']);
          localStorage.setItem("id", res['id']);
          localStorage.setItem("loginedUserId", res['loginedUserId']);
          this.role= localStorage.getItem("roles")
          // console.log(localStorage.getItem("email"))
          if (this.role == 'SuperAdmin'||this.role == 'PMO') {
            this.routee.navigate(['/home/piechart'])
            console.log(this.role)
          }
          if(this.role =='PM'){
            this.routee.navigate(['/home/projectManagerDashboard'])
            console.log(this.role)
          }
           if (this.role == 'Client') {
            this.routee.navigate(['/home/allClientReqts'])
            console.log(this.role)
          }
          if (this.role == 'TL') {
            this.routee.navigate(['/home/allTeamLeaderReqts'])
            console.log(this.role)
          }
          if (this.role == 'Employee') {
            this.routee.navigate(['/home/allEmpAssignedRequests'])
            console.log(this.role)
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
          //   console.log(this.role)
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
    this.messageService.add({ key: 'tc', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'User Name or password is incorrect' });
  }
  changePassword(){
    console.log(this.email)
    // routerLink="/changePassword"
  }

  // showSticky() {
  //   this.messageService.add({severity:'info', summary: 'Sticky', detail: 'Message Content', sticky: true});
  // }




}
