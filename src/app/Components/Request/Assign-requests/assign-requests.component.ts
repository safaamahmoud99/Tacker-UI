import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { assignedRequests } from 'src/Shared/Models/assignedRequest';
import { projectPosition } from 'src/Shared/Models/projectPosition';
import { projectTeam } from 'src/Shared/Models/projectTeam';
import { request } from 'src/Shared/Models/request';
import { requestDescription } from 'src/Shared/Models/requestDescription';
import { AssignedRequestsService } from 'src/Shared/Services/assigned-requests.service';
import { ProjectPositionService } from 'src/Shared/Services/project-position.service';
import { ProjectTeamService } from 'src/Shared/Services/project-team.service';
import { RequestService } from 'src/Shared/Services/request.service';
import { RequestDescriptionService } from "../../../../Shared/Services/request-description.service";

@Component({
  selector: 'app-assign-requests',
  templateUrl: './assign-requests.component.html',
  styleUrls: ['./assign-requests.component.css']
})
export class AssignRequestsComponent implements OnInit {

  assignedReqObj: assignedRequests
  lstProjectPosition: projectPosition[]
  lstProjectTeamAfterFilterBasedOnPosition: projectTeam[]
  lstProjectTeam: projectTeam[]
  lstProjectTeamAfterFiltration: projectTeam[]
  reqDescriptionObj: requestDescription
  projectTeamForEmployees: projectTeam[]
  projectTeamForEmployeesAfterFilteration: projectTeam[]
  reqId: number
  LoginedUserId: string;
  Id: any
  teamId: any;
  empId: any
  requestObj: request
  role: string;
  IsCompletedDate: boolean
  constructor(
    private activeRoute: ActivatedRoute, private route: Router,
    private assignedRequestsService: AssignedRequestsService,
    private projectPositionService: ProjectPositionService,
    private projectTeamService: ProjectTeamService,
    private requestDescriptionService: RequestDescriptionService,
    private router: Router,
    private requestservice: RequestService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    // this.projectTeamObj = {
    //   departmentId: 0, departmentName: '', employeeId: 0, id: 0, projectId: 0, projectName: '', projectPositionId: 0,
    //   TeamId: 0, teamName: '', employeeName: '', projectPositionName: ''
    // }
    this.IsCompletedDate = false
    this.role = localStorage.getItem("roles")
    console.log("role", this.role)
    this.reqId = Number(this.activeRoute.snapshot.params['reqId']);
    console.log("reqId", this.reqId)
    this.LoginedUserId = localStorage.getItem("loginedUserId")
    this.lstProjectPosition = []
    this.reqDescriptionObj = {
      descriptionDate: new Date(),
      description: '', id: 0, requestId: this.reqId, userId: this.LoginedUserId
    }
    this.assignedReqObj = {
      employeeId: 0,
      requestId: this.reqId, id: 0, projectPositionId: 0, teamId: 0
    }
    this.projectPositionService.GetAllProjectPosition().subscribe(e => {
      // this.lstProjectPosition = e
      e.forEach(element => {
        if (element.positionName != "Employee") {
          this.lstProjectPosition.push(element)
        }
      });
      if (this.role == "TL") {
        this.lstProjectPosition = e
      }
      if (this.role == "SuperAdmin") {
        this.lstProjectPosition = e
      }
    })

  }
  getTeamsByPositionId(event) {
    this.projectTeamService.GetProjectTeamsByProjectPositionId(this.assignedReqObj.projectPositionId).subscribe(e => {
      // this.lstProjectTeam = e

      this.lstProjectTeamAfterFilterBasedOnPosition = e
      console.log("lst of projteams", this.lstProjectTeamAfterFilterBasedOnPosition)
      this.lstProjectTeamAfterFilterBasedOnPosition = e.reduce((unique, o) => {
        if (!unique.some(obj => obj.teamId == o.teamId)) {
          unique.push(o);
        }
        return unique;
      }, []);
    })


  }
  saveAssignedRequest() {
    if (this.assignedReqObj.projectPositionId != 0 && this.assignedReqObj.teamId != 0 
      && this.assignedReqObj.employeeId != 0 && this.reqDescriptionObj.description !="") {
      this.assignedReqObj.employeeId = Number(this.empId)
      this.assignedReqObj.projectPositionId = Number(this.assignedReqObj.projectPositionId)
      this.assignedReqObj.teamId = Number(this.teamId)
      this.assignedReqObj.requestId = Number(this.assignedReqObj.requestId)
      this.assignedRequestsService.AssignedRequest(this.assignedReqObj).subscribe(e => {
        console.log("ass", this.assignedReqObj)
        this.requestDescriptionService.AddRequestDescription(this.reqDescriptionObj).subscribe(e => {
          console.log("desc")
          this.requestservice.GetRequestByRequestId(this.assignedReqObj.requestId).subscribe(e => {
            this.requestObj = e
            this.requestObj.IsAssigned = true;
            this.requestObj.requestStatusId = 3  //Inprogress
            this.requestservice.updateRequest(this.reqId, this.requestObj).subscribe(e => {
              this.router.navigate(['home/AllManagersReq']);

            })
          })
        })
      })
    }
    else {
      this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz Complete Data' });
    }
  }
  getEmp(event) {
    this.teamId = event;
    console.log(this.teamId)

    this.projectTeamService.GetEmployeessByTeamIdAndPositionId(this.teamId, this.assignedReqObj.projectPositionId).subscribe(e => {
      this.lstProjectTeamAfterFiltration = e.reduce((unique, o) => {
        if (!unique.some(obj => obj.employeeId == o.employeeId)) {
          unique.push(o);
        }
        return unique;
      }, []);
    })
  }
  getEmpId(event) {
    console.log(event)
    this.empId = event
  }
}
