import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { client } from 'src/Shared/Models/client';
import { Problem } from 'src/Shared/Models/problem';
import { project } from 'src/Shared/Models/project';
import { projectsVM } from 'src/Shared/Models/projectsVM';
import { projectTeamVM } from 'src/Shared/Models/projectTeamVM';
import { request } from 'src/Shared/Models/request';
import { requestDescription } from 'src/Shared/Models/requestDescription';
import { RequestImage } from 'src/Shared/Models/RequestImages';
import { ClientService } from 'src/Shared/Services/client.service';
import { ProblemServiceService } from 'src/Shared/Services/problem-service.service';
import { ProjectTeamService } from 'src/Shared/Services/project-team.service';
import { ProjectService } from 'src/Shared/Services/project.service';
import { RequestDescriptionService } from 'src/Shared/Services/request-description.service';
import { RequestService } from 'src/Shared/Services/request.service';

@Component({
  selector: 'app-projectmanger-requests',
  templateUrl: './projectmanger-requests.component.html',
  styleUrls: ['./projectmanger-requests.component.scss']
})
export class ProjectmangerRequestsComponent implements OnInit {

  lstRequests: any[]
  projects: project[]
  lstRequestProblems: Problem[]
  lstRequestDesc: requestDescription[]
  NewdecDialogbool: boolean;
  NewdecDialogForCloseRequest: boolean
  RequestObj: request
  reqImages: RequestImage[]
  NewclientDialogbool: boolean = false
  role: string
  LoggedInUserId: number
  lstprojId: projectsVM
  lstProjectTeamIds: projectTeamVM
  reqDescriptionObj: requestDescription
  LoggedInUserString: string
  requestIDForCloseRequest: number
  isclosedreq:boolean
  displayBasic: boolean;
  clientObj:client

  constructor(private requestService: RequestService,
    private projectService: ProjectService,
    private projectTeamservice: ProjectTeamService,
    private requestProblemService: ProblemServiceService,
    private requestDescservive: RequestDescriptionService,
    private requestDescriptionService: RequestDescriptionService,
     private clientService:ClientService,
     private router: Router,
  ) { }

  ngOnInit(): void {
    this.lstRequestDesc = []
    this.lstRequestProblems = []
    this.lstprojId = { ProjectIds: '' }
    this.lstProjectTeamIds = { ProjectTeamIds: '' }
    this.role = localStorage.getItem('roles')
    this.LoggedInUserId = Number(localStorage.getItem('id'))
    this.LoggedInUserString = localStorage.getItem('loginedUserId')
    console.log("loggedin", localStorage.getItem('id'))
    this.projectService.GetAllProjectsByEmployeeId(this.LoggedInUserId).subscribe(projects => {
      projects.forEach(element => {
        this.lstprojId.ProjectIds += (element.id).toString() + ','
        console.log(this.lstprojId)
      });
      this.requestProblemService.GetAllProblems().subscribe(
        res => {
          this.lstRequestProblems = res,
            console.log("lstRequestProblems", res)
        }

      )
      this.lstprojId.ProjectIds = this.lstprojId.ProjectIds.substring(0, this.lstprojId.ProjectIds.length - 1)
      this.projectTeamservice.GetAllProjectTeamsByProjectIds(this.lstprojId).subscribe(e => {
        //  console.log('lstprojectteams',e)
        e.forEach(element => {
          this.lstProjectTeamIds.ProjectTeamIds += (element.id).toString() + ','
        });
        this.lstProjectTeamIds.ProjectTeamIds = this.lstProjectTeamIds.ProjectTeamIds.substring(0, this.lstProjectTeamIds.ProjectTeamIds.length - 1)
        console.log('lstprojectteams', this.lstProjectTeamIds)
        this.requestService.GetAllRequestByProjectTeamId(this.lstProjectTeamIds).subscribe(e => {
          console.log("requests", e)
          this.lstRequests = e
        })

      })
    })
    this.lstRequests = []
    this.reqImages = []

    // this.requestService.GetAllRequests().subscribe(e => {
    //   this.lstRequests = e
    //   //console.log(this.lstRequests)
    // })
    this.reqDescriptionObj = {descriptionDate:new Date(),
      description: '', id: 0, requestId: 0, userId: this.LoggedInUserString
    }
    this.clientObj = {
      address:'',id:0,clientCode:'',clientName:'',email:'',gender:'',organizationId:0,organizationName:'',phone:''
    }
  }
  getClientById(clientId)
  {
    this.displayBasic = true;
    this.clientService.GetclientByID(clientId).subscribe(result=>{
      this.clientObj = result
      console.log("clients",this.clientObj)
    })
  }
  assignRequests(reqId: number) {
    console.log(reqId)
    this.router.navigate(['home/assignReq', reqId]);
  }
  ViewImages(reqId: number) {
    console.log(reqId)
    this.requestService.GetRequestImageByRequestId(reqId).subscribe(e => {
      this.reqImages = e
      console.log(this.reqImages)
      this.NewclientDialogbool = true
    })
  }
  viewSingleDoc(imgObj) {
    console.log(imgObj)
    var filePath = `${environment.Domain}wwwroot/requestImage/${imgObj.imageName}`;
    window.open(filePath);
  }
  GetproblemId(problemId) {
    console.log("problemId", problemId)
    this.requestProblemService.GetAllRequestByRequestProblemId(problemId).subscribe(e => {
      this.lstRequests = e
      console.log(e)
    })
  }
  GetAllRequests() {
    this.ngOnInit()
  }
  ViewMoreDesc(requestID) {
    this.requestDescservive.GetAllDescByRequestID(requestID).subscribe(res => {
      console.log("desc", res)
      this.lstRequestDesc = res;
      this.NewdecDialogbool = true;
    })
  }
  Opendialog(requestID: number) {
    this.requestIDForCloseRequest = requestID
    console.log("requestIDForCloseRequest", requestID)
    this.NewdecDialogForCloseRequest = true
  }
  CloseRequest() {
    this.reqDescriptionObj.requestId=this.requestIDForCloseRequest;
    this.requestDescriptionService.AddRequestDescription(this.reqDescriptionObj).subscribe(e => {
      this.requestService.GetRequestByRequestId(this.requestIDForCloseRequest).subscribe(e => {
        this.RequestObj = e
        console.log("this.RequestObj",this.RequestObj)
        this.RequestObj.requestStatusId = 2  //Close
        if( this.RequestObj.requestStatusId = 2)
        {
          this.isclosedreq==true
          console.log("isclosed",this.isclosedreq)
        }
        else{
          this.isclosedreq==false
        }
        // this.RequestObj.requestStatus
        this.requestService.updateRequest(this.requestIDForCloseRequest, this.RequestObj).subscribe(e => {
          this.ngOnInit();

        })
      })
    })
    this.NewdecDialogForCloseRequest = false
  }
}

