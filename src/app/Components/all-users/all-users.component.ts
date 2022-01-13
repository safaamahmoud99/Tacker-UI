import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from 'src/Shared/Models/User';
import { ClientService } from 'src/Shared/Services/client.service';
import { EmployeeService } from 'src/Shared/Services/employee.service';
import { UsersService } from 'src/Shared/Services/users.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  users:User[];
  GetUnregisteredUsers:any;
  GetUnregisteredClients:any;
  NewUser:User;
  AllEmployees: any;
  AllClients:any;
  clientId:any;
  NewLeaveDialogbool:boolean;
  NewclientDialogbool:boolean;
  displayBasic: boolean;
  clientrole: string;
  constructor(private clientService:ClientService,private userService:UsersService,private EmpService:EmployeeService,
    private confirmationService: ConfirmationService,private messageService: MessageService
    ) { 
    this.NewUser={id:0,email:'',roles:'',userName:'',password:'P@ssw0rd'};
  }

  ngOnInit(): void {
  this.clientId= localStorage.getItem('clientId');
    this.userService.getAllUsers().subscribe(
      data=>{
        this.users=data;
      },
      error=>console.log(error)
      );
      this.EmpService.GetAllEmployees().subscribe(
        data=>{
          this.AllEmployees=data;
        },
        error=>console.log(error)
        );
        this.clientService.GetAllClients().subscribe(
          data=>{
            this.AllClients=data;
          },
          error=>console.log(error)
          );

        this.userService.GetUnregisteredUsers().subscribe(
          data=>this.GetUnregisteredUsers=data,
          error=>console.log(error)
        )
        
        this.userService.GetUnregisteredUsersClient().subscribe(
          data=>this.GetUnregisteredClients=data,
          error=>console.log(error)
        )
  }

  addNewUser()
  {
    // if(this.NewUser.role!='Client')
    // {
    //    this.NewUser.role='Client';  
       
    // } 
    this.userService.addUser(this.NewUser).subscribe(
      data=>this.ngOnInit()
    )
    this.NewLeaveDialogbool=false;
    // this.NewclientDialogbool=false;
  }
  addNewClient()
  {   
    //  this.NewUser.role='Client';
     this.userService.addUser(this.NewUser).subscribe(
     data=>this.ngOnInit()
    )
    this.NewclientDialogbool=false;
  }
  NewUserDialog()
  {
    this.NewLeaveDialogbool=true;
  }
  NewClientDialog()
  {
    this.NewclientDialogbool=true;

  }
  onChange(event){
    this.AllEmployees.forEach(element => {
      if(element.id==event)
      {
        this.NewUser.email=element.email;
        this.NewUser.userName=element.employeeName;
      }
    });
  }

  onChangeclient(event){
    this.AllClients.forEach(element => {
      if(element.id==event)
      {
        this.NewUser.email=element.email;
        this.NewUser.userName=element.clientName;
      }
    });
  }

  confirm(id) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
            this.userService.delete(id).subscribe(
              data=>{
                this.ngOnInit(),
                this.messageService.add({severity:'info', summary:'Record Deleted!', detail:'Record Deleted!'});
              }
            )
        }
    });
  }
  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'});
}

showInfo() {
    this.messageService.add({severity:'info', summary: 'Info', detail: 'Message Content'});
}

showWarn() {
    this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Message Content'});
}

showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
}

showTopLeft() {
    this.messageService.add({key: 'tl', severity:'info', summary: 'Info', detail: 'Message Content'});
}

showTopCenter() {
    this.messageService.add({key: 'tc', severity:'info', summary: 'Info', detail: 'Message Content'});
}

showBottomCenter() {
    this.messageService.add({key: 'bc', severity:'info', summary: 'Info', detail: 'Message Content'});
}

showConfirm() {
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to proceed'});
}

showMultiple() {
    this.messageService.addAll([
        {severity:'info', summary:'Message 1', detail:'Message Content'},
        {severity:'info', summary:'Message 2', detail:'Message Content'},
        {severity:'info', summary:'Message 3', detail:'Message Content'}
    ]);
}

showSticky() {
    this.messageService.add({severity:'info', summary: 'Sticky', detail: 'Message Content', sticky: true});
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
