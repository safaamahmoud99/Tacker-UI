import { Component, OnInit } from '@angular/core';
import { request } from "../../../../Shared/Models/request";
import { RequestService } from "../../../../Shared/Services/request.service";
import { RequestTypeService } from "../../../../Shared/Services/request-type.service";
import { RequestPeriorityService } from "../../../../Shared/Services/request-periority.service";
import { RequestStatusService } from "../../../../Shared/Services/request-status.service";
import { ProjectService } from "../../../../Shared/Services/project.service";
import { RequestSubCategoryService } from "../../../../Shared/Services/request-sub-category.service";
import { requestPeriority } from 'src/Shared/Models/requestPeriority';
import { requestSubCategory } from 'src/Shared/Models/requestSubCategory';
import { requestStatus } from 'src/Shared/Models/requestStatus';
import { requestType } from 'src/Shared/Models/requestType';
import { project } from 'src/Shared/Models/project';
import { asset } from 'src/Shared/Models/asset';
import { requestMode } from 'src/Shared/Models/requestMode';
import { AssetService } from 'src/Shared/Services/asset.service';
import { RequestModeService } from 'src/Shared/Services/request-mode.service';
import { client } from 'src/Shared/Models/client';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RequestImage } from 'src/Shared/Models/RequestImages';
import { logging } from 'protractor';
import { projectTeam } from 'src/Shared/Models/projectTeam';
import { ProjectTeamService } from 'src/Shared/Services/project-team.service';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { requestDescription } from 'src/Shared/Models/requestDescription';
import { RequestDescriptionService } from 'src/Shared/Services/request-description.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-create-request',
  templateUrl: './client-create-request.component.html',
  styleUrls: ['./client-create-request.component.css']
})
export class ClientCreateRequestComponent implements OnInit {
  lstReqests: request[]
  requestObj: request
  reqObj: any
  ClientId: number
  projectId: number
  lstReqAssets: asset[]
  reqAsset: asset



  requestMode: requestMode
  lstReqTypies: requestType[]
  lstReqPeriorities: requestPeriority[]
  lstReqStatus: requestStatus[]
  lstReqSubCategories: requestSubCategory[]
  lstProjects: project[]
  lstclients: client[]
  lstProjectTeams: projectTeam[]
  lstProjectTeamsAfterFiltration: projectTeam[]
  lstRequestImages: RequestImage[]
  reqImage: RequestImage
  ProjId: number
  TestValue:number=0
  displayBasic: boolean;
  disabledButton:boolean;
  LoggedInUserString: string;
  reqDescriptionObj: requestDescription
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isLinear = false;


  constructor(private reqService: RequestService,
    private httpClient: HttpClient,
    private projectTeamService: ProjectTeamService,
    private reqPeriorityService: RequestPeriorityService,
    private reqStatusService: RequestStatusService,
    private reqTypeService: RequestTypeService,
    private ReqAssetService: AssetService,
    private ReqModeService: RequestModeService,
    private projectService: ProjectService,
    private ReqSubCatService: RequestSubCategoryService,
    private confirmationService: ConfirmationService,
    private route:Router,private messageService: MessageService,private router:Router,
    private requestDescriptionService: RequestDescriptionService,
    private _formBuilder: FormBuilder,


     ) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.LoggedInUserString = localStorage.getItem('loginedUserId')
    this.reqDescriptionObj = {
      descriptionDate: new Date,
      description: '', id: 0, requestId: 0, userId: this.LoggedInUserString
    }
    this.disabledButton=false;
    this.ClientId = Number(localStorage.getItem('clientId'))
    this.lstReqests = []
    this.lstProjects = []
    this.lstReqPeriorities = []
    this.lstReqTypies = []
    this.lstProjectTeams = []
    this.lstProjectTeamsAfterFiltration = []
    this.lstReqStatus = []
    this.lstRequestImages = []
    this.lstReqSubCategories = []
    this.reqImage = {
      id: 0, imageName: '', requestId: 0
    }
    this.reqObj = {
      id: 0, projectId: 0, projectName: '', requestCode: '',
      requestName: '', requestPeriority: '', requestPeriorityId: 0,
      requestStatus: '', requestStatusId: 0, requestTime: new Date().getHours() + ':' + new Date().getMinutes(), requestDate: new Date(),
      requestSubCategoryId: 0, requestSubCategoryName: '', assetId: 0, clientId: this.ClientId,
      requestTypeId: 0, requestTypeName: '', description: '', requestModeId: 0
    }
    this.requestObj = {requestTypeId:0,serialNumber:'',sitename:'',createdBy:'',createdById:"",projectSiteAssetId:0,
      IsAssigned: false, IsSolved: false, RequestProblemObj: { requestId: 0, employeeId: 0, id: 0, problemId: 0, problemName: '', requestName: '' },
      id: 0, projectId: 0, projectName: '', requestCode: '', clientName: '',
      requestName: '', requestPeriority: '', requestPeriorityId: 0, teamName: '', projectTeamId: 0, requestTypeName: '', teamId: 0,
      requestStatus: '', requestStatusId: 0, requestTime: new Date().getHours() + ':' + new Date().getMinutes(), requestDate: new Date(),
      requestSubCategoryId: 0, requestSubCategoryName: '', assetId: 0, clientId: this.ClientId, description: '', requestModeId: 0
    }
    this.reqAsset = {
      assetCode: '', assetName: '', id: 0, assetModel: '', brandId: 0, brandName: '', originId: 0, originName: ''
    }
    this.requestMode = {
      mode: '', id: 0
    }
    this.projectService.GetAllProjects().subscribe(e => {
      this.lstProjects = e
    })
    this.reqTypeService.GetAllRequestsTypes().subscribe(e => {
      this.lstReqTypies = e
      console.log("lstRqType", this.lstReqTypies)
    })
    this.reqStatusService.GetAllRequestStatus().subscribe(e => {
      this.lstReqStatus = e
      console.log("lstStatus", this.lstReqStatus)
    })
    this.reqPeriorityService.GetAllRequestPeriorties().subscribe(e => {
      this.lstReqPeriorities = e
      console.log("lstPeriority", this.lstReqPeriorities)
    })
    this.ReqSubCatService.GetAllSubCategorys().subscribe(e => {
      this.lstReqSubCategories = e
    })
    this.ReqAssetService.GetAllAssets().subscribe(e => {
      this.lstReqAssets = e
      console.log(this.lstReqAssets)

    })
    // this.ReqModeService.GetAllRequetsMode().subscribe(e => {
    //   this.lstRequestMode = e
    //   console.log(this.lstRequestMode)
    // })

  }
  showBasicDialog() {
    this.displayBasic = true;
}
  GetProjectTeamId(TeamId) {
    this.projectTeamService.GetProjectTeamByProjectIdAndTeamIdAndProjectPositionId(this.projectId, TeamId.value)
      .subscribe(e => {
        this.ProjId = e.id
        console.log("projectTeamId", e.id)
        this.reqObj.projectTeamId = this.ProjId
        console.log("aftergetProjTeamid", this.reqObj)
      })
  }
  reqId: any
  redirect :string ="this.route.navigate(['/home/allClientReqts'])"
  AddRequest() {
      this.reqObj.requestStatusId = 1  //open
      this.reqObj.projectId =  this.projectId
      this.reqObj.clientId = Number(this.reqObj.clientId)
      this.reqObj.requestModeId = 5 //meaning it refer to 'By the Client Option'
      console.log("this.reqObj Before add",this.reqObj)
      if(this.reqObj.requestName != "" && this.reqObj.projectId !=0
      && this.reqObj.requestSubCategoryId != 0 && this.reqObj.requestPeriorityId!=0 && 
      this.reqObj.assetId !=0 && this.reqObj.teamId!=0)
      { 
        this.reqService.inserRequest(this.reqObj).subscribe(e => {
          console.log(e)
          this.reqId = e;
          this.reqDescriptionObj.requestId = this.reqId
          this.reqDescriptionObj.description=this.reqObj.description
          this.requestDescriptionService.AddRequestDescription(this.reqDescriptionObj).subscribe(e => {
            this.reqImage.requestId = this.reqId;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Request Added Successfully' });
          })
        })
        this.displayBasic = true;
        this.disabledButton=true
      }
      else {
        this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz Complete Data' });
      }
  }
  Redirect()
  {
    this.route.navigate(['/home/allClientReqts'])
  }
  onChange(event) {
    this.projectId = event.value
    console.log(" this.projectId", this.projectId)
    this.projectTeamService.GetProjectTeamsByProjectId(this.projectId).subscribe(e => {
      this.lstProjectTeams = e
      this.lstProjectTeams = e.reduce((unique, o) => {
        if (!unique.some(obj => obj.teamId == o.teamId)) {
          unique.push(o);
        }
        return unique;
      }, []);
      console.log("lstproTeams", this.lstProjectTeams)
    })
    this.projectService.GetClientByProjectId(this.projectId).subscribe(e => {
      this.lstclients = e
      console.log("lstclients",this.lstclients)
    })


  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.reqImage.imageName = fileToUpload.name;
    console.log(fileToUpload.name)

    this.httpClient.post(environment.uploadImage, formData)
      .subscribe(res => {
        console.log(res)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Uploaded Successfully' });
       // alert('Uploaded Successfully.');

      });
    this.lstRequestImages.push(this.reqImage);
    this.reqImage = {
      id: 0, imageName: '', requestId: this.reqId
    };
  }
  SaveimageToDB() {

    this.reqService.addListRequestImages(this.lstRequestImages).subscribe(e => {
      console.log(e)
      this.reqObj = {
        description: '', requestTypeName: '', requestSubCategoryName: '', requestSubCategoryId: 0, projectTeamId: 0, IsSolved: false, IsAssigned: false,
        id: 0, requestStatusId: 0, requestPeriorityId: 0, requestName: '', requestCode: '', projectName: '', projectId: 0, teamName: '', teamId: 0, clientName: '',
        requestPeriority: '', requestStatus: '', requestDate: new Date(), requestTime: '', requestModeId: 0, assetId: 0, clientId: 0, RequestProblemObj: { requestId: 0, employeeId: 0, id: 0, problemId: 0, problemName: '', requestName: '' }
      }
      this.router.navigate(['home/allClientReqts'])
    })

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
