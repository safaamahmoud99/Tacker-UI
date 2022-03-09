import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { element } from 'protractor';
import { environment } from 'src/environments/environment';
import { asset } from 'src/Shared/Models/asset';
import { client } from 'src/Shared/Models/client';
import { ListProjectSiteAssetClients } from 'src/Shared/Models/ListProjectSiteAssetClients';
import { project } from 'src/Shared/Models/project';
import { ProjectSiteAsset } from 'src/Shared/Models/ProjectSiteAsset';
import { projectTeam } from 'src/Shared/Models/projectTeam';
import { request } from 'src/Shared/Models/request';
import { requestDescription } from 'src/Shared/Models/requestDescription';
import { RequestImage } from 'src/Shared/Models/RequestImages';
import { requestMode } from 'src/Shared/Models/requestMode';
import { requestPeriority } from 'src/Shared/Models/requestPeriority';
import { RequestProblems } from 'src/Shared/Models/requestProblems';
import { requestStatus } from 'src/Shared/Models/requestStatus';
import { requestSubCategory } from 'src/Shared/Models/requestSubCategory';
import { requestType } from 'src/Shared/Models/requestType';
import { Sites } from 'src/Shared/Models/Sites';
import { AssetService } from 'src/Shared/Services/asset.service';
import { OrganizationClientsService } from 'src/Shared/Services/organization-clients.service';
import { ProjectSiteAssetService } from 'src/Shared/Services/project-site-asset.service';
import { ProjectSitesService } from 'src/Shared/Services/project-sites.service';
import { ProjectTeamService } from 'src/Shared/Services/project-team.service';
import { ProjectService } from 'src/Shared/Services/project.service';
import { RequestDescriptionService } from 'src/Shared/Services/request-description.service';
import { RequestPeriorityService } from 'src/Shared/Services/request-periority.service';
import { RequestStatusService } from 'src/Shared/Services/request-status.service';
import { RequestSubCategoryService } from 'src/Shared/Services/request-sub-category.service';
import { RequestTypeService } from 'src/Shared/Services/request-type.service';
import { RequestService } from 'src/Shared/Services/request.service';
import { SiteClientsService } from 'src/Shared/Services/site-clients.service';
@Component({
  selector: 'app-client-manager-requests',
  templateUrl: './client-manager-requests.component.html',
  styleUrls: ['./client-manager-requests.component.css']
})
export class ClientManagerRequestsComponent implements OnInit {
  lstRequestDesc: requestDescription[]
  lstRequests: request[]
  clientID: number
  clientName: string
  role: string;
  canreq:boolean;
  NewdecDialogbool: boolean;
  reqImages: RequestImage[]
  NewclientDialogbool: boolean;
  projectId: number;
  dialogAddRequest: boolean
  lstReqAssets: asset[]
  lstAssetsByProject: ListProjectSiteAssetClients[]
  reqAsset: asset
  requestMode: requestMode
  lstReqTypies: requestType[]
  lstReqPeriorities: requestPeriority[]
  lstReqStatus: requestStatus[]
  lstReqSubCategories: requestSubCategory[]
  lstProjectTeams: projectTeam[]
  lstRequestImages: RequestImage[]
  lstProjects: project[]
  lstclients: client[]
  reqDescriptionObj: requestDescription
  reqImage: RequestImage
  siteID:any

  modetarnsalte = this.translate.get('Select Mode');
  lstRequestMode: Array<{ id: number, mode: string }> = [
    { id: 0, mode: 'Mode' },
    { id: 1, mode: 'Phone' },
    { id: 2, mode: 'Chat' },
    { id: 3, mode: 'Mail' },
    { id: 4, mode: 'SMS' },
  ];
  disabledButton: boolean;
  reqObj: request
  ProjId: number;
  reqId: any;
  sites:Sites[]
  LoggedInUserString: string;
  lstAssetsSerialsByAsset: ProjectSiteAsset[];
  assetId: number;
  projectSiteAssetId: number;
  projectName: string;
  lstClientsByProjectId: client[]
  IsSaveProject: boolean;
  isLinear = false;
  stepDisabled: boolean = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  createdById: string;
  constructor(private requestService: RequestService, private requestDescriptionService: RequestDescriptionService,
    private activeRoute: ActivatedRoute, private translate: TranslateService, private reqPeriorityService: RequestPeriorityService,
    private reqStatusService: RequestStatusService, private reqTypeService: RequestTypeService, private ReqAssetService: AssetService,
    private ReqSubCatService: RequestSubCategoryService, private organizationClientsService: OrganizationClientsService,
    private httpClient: HttpClient, private projectService: ProjectService,
    private projectTeamService: ProjectTeamService, private messageService: MessageService,
    private projectSiteAssetService: ProjectSiteAssetService, private siteClientsService: SiteClientsService,
    private _formBuilder: FormBuilder,private route: ActivatedRoute,private projectSiteservice:ProjectSitesService
  ) { }
  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.lstRequestDesc = []
    this.reqImages = []
   
    this.lstReqPeriorities = []
    this.lstReqTypies = []
    this.lstReqStatus = []
    this.lstReqSubCategories = []
    this.lstProjects = []
    this.lstclients = []
    this.lstRequestImages = []
    this.lstAssetsByProject = []
    this.lstAssetsSerialsByAsset = []
    this.lstClientsByProjectId = []
     this.sites=[]
    this.disabledButton = false
    console.log("clientID", localStorage.getItem("clientId"))
    this.projectId = this.activeRoute.snapshot.params['projectId'];
    this.LoggedInUserString = localStorage.getItem('loginedUserId')
    this.role = localStorage.getItem("roles")
    this.clientID = Number(localStorage.getItem("clientId"))
    this.createdById= localStorage.getItem('loginedUserId')
    this.reqObj = {
      createdById: "", createdBy: '', projectSiteAssetId: 0,
      requestTypeId: 0, serialNumber: '', sitename: '',
      id: 0, projectId: 0, projectName: '', requestCode: '',
      requestName: '', requestPeriority: '', requestPeriorityId: 0,
      requestStatus: '', requestStatusId: 0, requestTime: new Date().getHours() + ':' + new Date().getMinutes(), requestDate: new Date(),
      requestSubCategoryId: 0, requestSubCategoryName: '', assetId: 0, clientId: 0,
      requestTypeName: '', description: '', requestModeId: 0, IsAssigned: false,
      IsSolved: false, RequestProblemObj: new RequestProblems, clientName: '', projectTeamId: 0, teamId: 0, teamName: ''
    }
    this.reqDescriptionObj = {
      descriptionDate: new Date,
      description: '', id: 0, requestId: 0, userId: this.LoggedInUserString
    }
    this.reqImage = {
      id: 0, imageName: '', requestId: 0
    }
    // this.siteClientsService.GetAllAssignedClientsByProjectId(this.projectId).subscribe(
    //   res => {
    //     this.lstClientsByProjectId = res
    //   }
    // )
    this.projectSiteservice.GetAllProjectSitesByProjectId(this.projectId).subscribe(
      res=>{
        this.sites=res,
        console.log("this.sites",this.sites)
      }
    )
    this.requestService.GetAllRequestByProjectId(this.projectId).subscribe(e => {
      this.lstRequests = e
    })

    this.reqTypeService.GetAllRequestsTypes().subscribe(e => {
      this.lstReqTypies = e
    })
    this.reqStatusService.GetAllRequestStatus().subscribe(e => {
      this.lstReqStatus = e
    })
    this.reqPeriorityService.GetAllRequestPeriorties().subscribe(e => {
      this.lstReqPeriorities = e,
      this.reqObj.requestPeriorityId=4;
    })
    this.ReqSubCatService.GetAllSubCategorys().subscribe(e => {
      this.lstReqSubCategories = e
    })
    // this.projectSiteAssetService.GetAllProjectSiteAssetByProjectId(this.projectId).subscribe(
    //   res => {
    //     this.lstAssetsByProject = res
    //   }
    // )
    this.projectTeamService.GetProjectTeamsByProjectId(this.projectId).subscribe(e => {
      this.lstProjectTeams = e
      this.lstProjectTeams = e.reduce((unique, o) => {
        if (!unique.some(obj => obj.teamId == o.teamId)) {
          unique.push(o);
        }
        return unique;
      }, []);
    })
    this.projectService.GetClientByProjectId(this.projectId).subscribe(e => {
      this.lstclients = e
    })

    this.ReqAssetService.GetAllAssets().subscribe(e => {
      this.lstReqAssets = e
      // GetAllProjectSiteAssetByProjectId
    })
    this.organizationClientsService.GetOrganizationProjectsByClientId(this.clientID).subscribe(
      res => {
        this.lstProjects = res
        this.lstProjects.forEach(element => {
          if (element.id == this.projectId) {
            this.projectName = element.projectName
          }
        })
      }
    )
    //project.id
    
   let proid =+this.route.snapshot.paramMap.get('projectId');
    this.projectService.canreqbyproid(proid).subscribe(
    e=>{
         this.canreq=e;
         console.log("canreqqqqqqqqqqqqqqqqq",this.canreq);
         if(!this.canreq)
         {
          this.messageService.add({ key: 'tt', severity: 'error', summary: 'Attention !!!', sticky: true, detail:`sorry ,you can't request until project completed`});
         }

      }
    )
    
     
  

  }
  onchangeSite(event)
  {
    this.lstAssetsSerialsByAsset=[];
    this.lstClientsByProjectId=[];
    this.lstAssetsSerialsByAsset=[];
    this.lstAssetsByProject=[];
    this.reqObj.clientId=0;
    this.reqObj.assetId=0;
    this.siteID=event.value
    this.siteClientsService.GetAllAssignedClients(event.value,this.projectId).subscribe(    
      res => {
        this.lstClientsByProjectId = res,
        console.log("this.lstClientsByProjectIdandSite",this.lstClientsByProjectId)
      },
      err => console.log(err)
    )
    this.projectSiteAssetService.GetAllProjectSiteAssetBySiteId(event.value,this.projectId).subscribe(
      res => {
        this.lstAssetsByProject = res;
         for(let index=0;index<this.lstAssetsByProject.length;index++)
         {
           if(this.lstAssetsByProject[index].assetId===this.lstAssetsByProject[index+1].assetId)
           {
            this.lstAssetsByProject.splice(index,1)
           }
  
         }    
        console.log("assetsbyprojectandsite",this.lstAssetsByProject);
          }
    )
   
    
  }
  onChange(event) {
    this.projectId = event.value

  }

  CloseStipper() {
    this.dialogAddRequest = false
  }
  AddRequest() {
    this.messageService.clear();
    this.reqObj.requestStatusId = 1  //open
    this.reqObj.projectTeamId = this.ProjId
    this.reqObj.projectId = Number(this.reqObj.projectId)
    this.reqObj.clientId = Number(this.reqObj.clientId)
    this.reqObj.createdById = this.createdById
    this.reqObj.projectSiteAssetId = this.projectSiteAssetId
    console.log("reqObj", this.reqObj)
    if (this.reqObj.requestName != "" && this.reqObj.clientId != 0 && this.reqObj.description != null
      && this.reqObj.assetId != 0 && this.reqObj.projectSiteAssetId != 0
      && this.reqObj.requestSubCategoryId != 0 && this.reqObj.requestPeriorityId != 0 &&
      this.reqObj.requestModeId != 0 && this.reqObj.teamId != 0) {
      this.requestService.inserRequest(this.reqObj).subscribe(e => {
        this.reqId = e;
        this.reqDescriptionObj.requestId = Number(this.reqId)
        this.reqDescriptionObj.description = this.reqObj.description
        this.requestDescriptionService.AddRequestDescription(this.reqDescriptionObj).subscribe(e => {
          this.reqImage.requestId = Number(this.reqId);
          this.IsSaveProject = true
          this.requestService.GetAllRequestByProjectId(this.projectId).subscribe(e => {
            this.lstRequests = e
          })
          this.messageService.add({ key: 'tr', severity: 'success', summary: 'Success', detail: 'Request Added Successfully' });
        })
      })
      this.disabledButton = true
    }
    else {
      this.disabledButton = false
      this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz Complete Data' });
    }

  }
  onChangeAsset(event) {
    this.assetId = event.value
    // this.projectSiteAssetService.GetAllAssetsSerialsByAssetId(this.assetId).subscribe(
    //   res => {
    //     this.lstAssetsSerialsByAsset = res
    //   }
    // )
    this.projectSiteAssetService.GetAllAssetsSerialsByProjectId(this.projectId,this.siteID,this.assetId).subscribe(
      res=>{
       this.lstAssetsSerialsByAsset = res,
       console.log("this.lstAssetsSerialsByAsset",this.lstAssetsSerialsByAsset)
      }
    )
    console.log("this.reqObj.projectSiteAssetIdiassettttttttt",this.projectSiteAssetId );
  }
  onChangeSerial(event) {
    this.projectSiteAssetId = event.value
  }
  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.reqImage.imageName = fileToUpload.name;

    this.httpClient.post(environment.uploadImage, formData)
      .subscribe(res => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Uploaded Successfully' });

        // alert('Uploaded Successfully.');

      });
    this.lstRequestImages.push(this.reqImage);
    this.reqImage = {
      id: 0, imageName: '', requestId: this.reqId
    };
  }
  SaveimageToDB() {

    this.requestService.addListRequestImages(this.lstRequestImages).subscribe(e => {
      this.messageService.add({ key: 'tr',severity: 'success', summary: 'Success', detail: 'Image added successfully' });
    })

  }
  GetProjectTeamId(TeamId) {
    this.projectTeamService.GetProjectTeamByProjectIdAndTeamIdAndProjectPositionId(this.projectId, TeamId.value)
      .subscribe(e => {
        this.ProjId = e.id
        this.reqObj.projectTeamId = this.ProjId
      })
  }
  ViewMoreDesc(requestID) {
    this.requestDescriptionService.GetAllDescByRequestID(requestID).subscribe(res => {
      this.lstRequestDesc = res;
      this.NewdecDialogbool = true;
    })
  }
  ViewImages(reqId: number) {
    this.requestService.GetRequestImageByRequestId(reqId).subscribe(e => {
      this.reqImages = e
      this.NewclientDialogbool = true
    })
  }
  viewSingleDoc(imgObj) {
    var filePath = `${environment.Domain}wwwroot/requestImage/${imgObj.imageName}`;
    window.open(filePath);
  }
  OpendialogAddRequest() {
    this.reqObj = {
      createdBy: '', createdById: "", projectSiteAssetId: 0,
      requestTypeId: 0, serialNumber: '', sitename: '',
      id: 0, projectId: 0, projectName: '', requestCode: '',
      requestName: '', requestPeriority: '', requestPeriorityId: 4,
      requestStatus: '', requestStatusId: 0, requestTime: new Date().getHours() + ':' + new Date().getMinutes(), requestDate: new Date(),
      requestSubCategoryId: 0, requestSubCategoryName: '', assetId: 0, clientId: 0,
      requestTypeName: '', description: '', requestModeId: 0, IsAssigned: false,
      IsSolved: false, RequestProblemObj: new RequestProblems, clientName: '', projectTeamId: 0, teamId: 0, teamName: ''
    }

    this.dialogAddRequest = true
  }
}
