import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { client } from 'src/Shared/Models/client';
import { request } from 'src/Shared/Models/request';
import { requestDescription } from 'src/Shared/Models/requestDescription';
import { RequestImage } from 'src/Shared/Models/RequestImages';
import { RequestProblems } from 'src/Shared/Models/requestProblems';
import { ClientService } from 'src/Shared/Services/client.service';
import { EmployeeService } from 'src/Shared/Services/employee.service';
import { ProblemServiceService } from 'src/Shared/Services/problem-service.service';
import { RequestDescriptionService } from 'src/Shared/Services/request-description.service';
import { RequestService } from 'src/Shared/Services/request.service';


@Component({
  selector: 'app-employee-assigned-requests',
  templateUrl: './employee-assigned-requests.component.html',
  styleUrls: ['./employee-assigned-requests.component.css']
})
export class EmployeeAssignedRequestsComponent implements OnInit {

  lstAssignedReq: request[]
  EmpId: number
  loading: boolean = true;
  reqImages: RequestImage[]
  NewclientDialogbool: boolean = false
  reqId: number;
  problemId: number;
  RequestProblemObj: RequestProblems
  displayBasic: boolean;
  clientObj: client
  MoreDescription: boolean;
  reqDescriptionObj: requestDescription
  LoggedInUserString: string;
  RequestId: number
  lstRequestDesc: requestDescription[]
  NewdecDialogbool: boolean;

  constructor(
    private empService: EmployeeService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private requestService: RequestService,
    private messageService: MessageService,
    private ProblemServiceService: ProblemServiceService,
    private clientService: ClientService,
    private requestDescriptionService: RequestDescriptionService
  ) { }

  ngOnInit(): void {
    this.lstAssignedReq = []
    this.lstRequestDesc=[]
    // this.reqId = this.activeRoute.snapshot.params['reqId'];
    // this.problemId = this.activeRoute.snapshot.params['problemId'];
    // console.log(this.reqId, this.problemId)
    // this.requestService.GetProblemByEmployeeIdAndRequestId(this.reqId,this.problemId).subscribe(e=>{
    //   console.log("e",e)
    // })
    this.EmpId = Number(localStorage.getItem('id'))
    this.LoggedInUserString = localStorage.getItem('loginedUserId')
    this.requestService.GetAllRequestByEmployeeId(this.EmpId).subscribe(e => {
      this.lstAssignedReq = e
      console.log(this.lstAssignedReq)
      this.lstAssignedReq.forEach(element => {
        this.requestService.GetProblemByEmployeeIdAndRequestId(this.EmpId, element.id).subscribe(e => {
          element.RequestProblemObj = e;
        })
      });
      console.log("lstAss", this.lstAssignedReq)
    })
    this.reqDescriptionObj = {
      descriptionDate: new Date,
      description: '', id: 0, requestId: 0, userId: this.LoggedInUserString
    }
    this.clientObj = {
      address: '', id: 0, clientCode: '', clientName: '', email: '', gender: '', organizationId: 0, organizationName: '', phone: ''
    }
  }
  getClientById(clientId) {
    this.displayBasic = true;
    this.clientService.GetclientByID(clientId).subscribe(result => {
      this.clientObj = result
      console.log("clients", this.clientObj)
    })
  }
  OpendialogMoreDescription(requestId) {
    this.RequestId=requestId
    console.log("requestId", requestId)
    this.MoreDescription = true;
    this.reqDescriptionObj.requestId = requestId
  }
  addMoreDescription() {
    this.reqDescriptionObj.requestId = this.RequestId
    this.requestDescriptionService.AddRequestDescription(this.reqDescriptionObj).subscribe(e => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update Added Successfully' });
    this.MoreDescription = false;
    })
  }

  onReject() {
    this.messageService.clear('c');
  }
  viewAllImages(reqId: number) {
    this.NewclientDialogbool = true
    this.requestService.GetRequestImageByRequestId(reqId).subscribe(e => {
      this.reqImages = e
    })
  }
  viewSingleDoc(imgObj) {
    var filePath = `${environment.Domain}wwwroot/requestImage/${imgObj.imageName}`;
    window.open(filePath);
  }
  assignRequests(id: number) {
    console.log(id)
    this.router.navigate(['home/assignemployeerequest', id]);
  }
  ViewMoreDesc(requestID) {
    this.requestDescriptionService.GetAllDescByRequestID(requestID).subscribe(res => {
      console.log("desc", res)
      this.lstRequestDesc = res;
      this.NewdecDialogbool = true;
    })
  }
}
