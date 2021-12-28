import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { employee } from 'src/Shared/Models/employee';
import { ClientService } from 'src/Shared/Services/client.service';
import { EmployeeService } from 'src/Shared/Services/employee.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  empId: number
  imgName: string
  employee: any
  client: any
  role: string;
  clientId: number;
  clientImage: any;
  getimage: string;
  constructor(
    private empService: EmployeeService, private router: Router, private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.role = localStorage.getItem("roles")
    this.getimage = environment.Domain

    if (this.role == "Client") {
      this.clientId = Number(localStorage.getItem("clientId"))
      console.log("this.clientId", this.clientId)
      this.clientService.GetclientByID(this.clientId).subscribe(w => {
        this.client = w
        console.log(w["photo"])
        this.clientImage = w["photo"]
      })
    }
    if(this.role != "Client")
    {
      this.empId = Number(localStorage.getItem('id'))
      this.empService.getEmpByID(this.empId).subscribe(w => {
        this.employee = w
        this.imgName = w.photo
      })
    }
    this.employee = {
      address: '', departmentId: 0, departmentName: '', employeeName: '', id: 0, dateOfBirth: new Date
    }
    this.client = { id: 0, clientName: "", clientCode: "", organizationId: 0, organizationName: "", gender: "", address: "", phone: "", email: "" }



  }
  navigateToChangePassword(employee) {
    console.log(employee)
    this.router.navigate(['home/changePassword']);

  }
  navigateToChangePasswordClient(client) {
    console.log("client", client)
    this.router.navigate(['home/changePassword']);
  }
}
