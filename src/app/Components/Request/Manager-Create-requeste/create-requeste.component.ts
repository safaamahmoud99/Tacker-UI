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
import { ProjectTeamService } from 'src/Shared/Services/project-team.service';
import { projectTeam } from 'src/Shared/Models/projectTeam';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { RequestProblems } from 'src/Shared/Models/requestProblems';
import { RequestDescriptionService } from 'src/Shared/Services/request-description.service';
import { requestDescription } from 'src/Shared/Models/requestDescription';
import { OrganizationClientsService } from 'src/Shared/Services/organization-clients.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SiteClientsService } from 'src/Shared/Services/site-clients.service';
import { ListProjectSiteAssetClients } from 'src/Shared/Models/ListProjectSiteAssetClients';
import { ProjectSiteAssetService } from 'src/Shared/Services/project-site-asset.service';
import { ProjectSiteAsset } from 'src/Shared/Models/ProjectSiteAsset';
import { ProjectSites } from 'src/Shared/Models/ProjectSites';
import { ProjectSitesService } from 'src/Shared/Services/project-sites.service';
import { Sites } from 'src/Shared/Models/Sites';

@Component({
  selector: 'app-create-requeste',
  templateUrl: './create-requeste.component.html',
  styleUrls: ['./create-requeste.component.css']
})
export class CreateRequesteComponent implements OnInit {

  lstReqests: request[]
  requestObj: request
  reqObj: request
  sites:Sites[]
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
  lstRequestImages: RequestImage[]
  reqImage: RequestImage
  ProjId: number
  disabledButton: boolean
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  ThirdFormGroup: FormGroup;
  IsSaveProject: boolean;
  lstClientsByProjectId: client[]
  lstAssetsByProject: ListProjectSiteAssetClients[]
  listProjectSiteAssetClients: ListProjectSiteAssetClients[]
  lstAssetsSerialsByAsset: ProjectSiteAsset[];

  foo: any = this.translate.get('Tracker.Select Mode');

  modetarnsalte = this.translate.get('Select Mode');
  lstRequestMode: Array<{ id: number, mode: string }> = [
    { id: 0, mode: 'Mode' },
    { id: 1, mode: 'Phone' },
    { id: 2, mode: 'Chat' },
    { id: 3, mode: 'Mail' },
    { id: 4, mode: 'SMS' },
  ];
  LoggedInUserString: string;
  reqDescriptionObj: requestDescription
  role: string;
  clientId: number;
  assetId: any;
  projectSiteAssetId: any;
  dialogAddRequest: boolean;
  EmpId: number;
  createdById: string;
  IsDisabled: boolean;
  try:boolean;
  canreq:any;
 siteID:any;
 resArr :ListProjectSiteAssetClients[] ;

  constructor(private reqService: RequestService, private translate: TranslateService,
    private httpClient: HttpClient,
    private projectTeamService: ProjectTeamService,
    private reqPeriorityService: RequestPeriorityService,
    private reqStatusService: RequestStatusService,
    private reqTypeService: RequestTypeService,
    private ReqAssetService: AssetService,
    private ReqModeService: RequestModeService,
    private projectService: ProjectService,
    private ReqSubCatService: RequestSubCategoryService,
    private router: Router, private messageService: MessageService,
    private requestDescriptionService: RequestDescriptionService,
    private organizationClientsService: OrganizationClientsService,
    private _formBuilder: FormBuilder,
    private siteClientsService: SiteClientsService,
    private projectSiteAssetService: ProjectSiteAssetService,
    private projectSiteservice:ProjectSitesService 
 
  ) { }

  ngOnInit(): void { 
    
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.ThirdFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    }); 
    this.disabledButton = false
    this.IsSaveProject = false
    this.lstReqests = []

    this.lstProjects = []
    this.sites=[]
    this.lstReqPeriorities = []
    this.lstReqTypies = []
    this.lstProjectTeams = []
    this.lstReqStatus = []
    this.canreq = [];
    this.lstRequestImages = []
    this.lstReqSubCategories = []
    this.lstClientsByProjectId = []
    this.lstAssetsByProject = []
    this.lstAssetsSerialsByAsset = []
    this.resArr=[]
    this.LoggedInUserString = localStorage.getItem('loginedUserId')
    this.role = localStorage.getItem("roles")
    this.clientId = Number(localStorage.getItem("clientId"))
    this.EmpId = Number(localStorage.getItem("id"))
    this.createdById = localStorage.getItem("loginedUserId");
    console.log("this.LoggedInUserString", this.LoggedInUserString);

    this.reqDescriptionObj = {
      descriptionDate: new Date,
      description: '', id: 0, requestId: 0, userId:this.LoggedInUserString
    }
    console.log("this.reqDescriptionObjin ng on intit", this.reqDescriptionObj)
    this.reqImage = {
      id: 0, imageName: '', requestId: 0
    }
    this.reqObj = {
      createdById: "", createdBy: "",
      requestTypeId: 0, serialNumber: '', sitename: '', projectSiteAssetId: 0,
      id: 0, projectId: 0, projectName: '', requestCode: '',
      requestName: '', requestPeriority: '', requestPeriorityId: 0,
      requestStatus: '', requestStatusId: 0, requestTime: new Date().getHours() + ':' + new Date().getMinutes(), requestDate: new Date(),
      requestSubCategoryId: 0, requestSubCategoryName: '', assetId: 0, clientId: 0,
      requestTypeName: '', description: '', requestModeId: 0, IsAssigned: false,
      IsSolved: false, RequestProblemObj: new RequestProblems, clientName: '', projectTeamId: 0, teamId: 0, teamName: ''
    }
    this.requestObj = {
      serialNumber: '', sitename: '', createdById: "", createdBy: "", projectSiteAssetId: 0,
      requestTypeId: 0, IsAssigned: false, IsSolved: false, RequestProblemObj: { requestName: '', employeeId: 0, problemName: '', problemId: 0, id: 0, requestId: 0 },
      id: 0, projectId: 0, projectName: '', requestCode: '', clientName: '',
      requestName: '', requestPeriority: '', requestPeriorityId: 0, teamName: '', projectTeamId: 0, requestTypeName: '', teamId: 0,
      requestStatus: '', requestStatusId: 0, requestTime: new Date().getHours() + ':' + new Date().getMinutes(), requestDate: new Date(),
      requestSubCategoryId: 0, requestSubCategoryName: '', assetId: 0, clientId: 0, description: '', requestModeId: 0
    }
    this.reqAsset = {
      assetCode: '', assetName: '', id: 0, assetModel: '', brandId: 0, brandName: '', originId: 0, originName: ''
    }
    this.requestMode = {
      mode: '', id: 0
    }
    if (this.role == "PM") {
      this.projectService.GetAllProjectsByEmployeeId(this.EmpId).subscribe(e => {
        this.lstProjects = e
      })
    }
    else {
      this.projectService.GetAllProjects().subscribe(e => {
        this.lstProjects = e
        console.log(" this.lstProjects", this.lstProjects.length)     
      })
      
    }    
    // this.projectService.proCanrequest().subscribe(res=>{
    //   this.canreq=res
    //   console.log("requests projects",this.canreq)
    // })
  
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
  GetProjectTeamId(TeamId) {
    this.projectTeamService.GetProjectTeamByProjectIdAndTeamIdAndProjectPositionId(this.projectId, TeamId.value)
      .subscribe(e => {
        console.log("projteamid", e)
        this.ProjId = e.id
        console.log("projectTeamId", e.id)
        this.reqObj.projectTeamId = this.ProjId
        console.log("aftergetProjTeamid", this.reqObj)
      })
  }
 
  onChange(event) { 
    this.lstClientsByProjectId=[];
    this.sites=[];
    this.lstAssetsSerialsByAsset=[];
    this.lstAssetsByProject=[];
    this.reqObj.teamId=0;
    this.reqObj.sitename="";
    this.messageService.clear();
    this.projectId = event.value
    this.projectTeamService.GetProjectTeamsByProjectId(this.projectId).subscribe(e => {
      this.lstProjectTeams = e
      this.lstProjectTeams = e.reduce((unique, o) => {
        if (!unique.some(obj => obj.teamId == o.teamId)) {
          unique.push(o);
        }
        return unique;
      }, []);
      console.log("lstproTeams", this.lstProjectTeams.length)
    })
    this.projectService.GetClientByProjectId(this.projectId).subscribe(e => {
      this.lstclients = e
      console.log("lstclients", this.lstclients.length)
    })
    // {
    // // this.siteClientsService.GetAllAssignedClientsByProjectId(this.projectId).subscribe(
    // //   res => {
    // //     this.lstClientsByProjectId = res
    // //     console.log("lstClientsByProjectId",this.lstClientsByProjectId.length)
    // //   }
    // // )
 
    // // this.projectSiteAssetService.GetAllProjectSiteAssetByProjectId(this.projectId).subscribe(
    // //   res => {
    // //     this.lstAssetsByProject = res
    // //     console.log("lstAssetsByProject", res.length)
    // //    }
    // // )

    // // this.projectSiteAssetService.GetAllProjectSiteAssetByProjectId(this.projectId).subscribe(
    // //   res => {
    // //     this.listProjectSiteAssetClients = res
    // //     // this.listProjectSiteAssetClients.forEach(customer => customer.warrantyStartDate = new Date(customer.warrantyStartDate));
    // //     console.log("listProjectSiteAssetClients ", res.length)
    // //   }
    // // ) 
    // }
  this.projectSiteservice.GetAllProjectSitesByProjectId(this.projectId).subscribe(
    res=>{
      this.sites=res,
      console.log("this.sites",this.sites)
    }
  )
  }
 onChangeSite(event)
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
  onChangeAsset(event) {
    this.assetId = event.value
    this.projectSiteAssetId =0
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
    console.log("serialNumber", event.value)
    this.projectSiteAssetId = event.value
    console.log("this.reqObj.projectSiteAssetIdinevent",this.projectSiteAssetId);
  }
  reqId: any
  AddRequest() {
    this.messageService.clear();
    this.reqObj.requestStatusId = 1  //open
    this.reqObj.projectTeamId = this.ProjId
    this.reqObj.projectId = Number(this.reqObj.projectId)
    this.reqObj.clientId = Number(this.reqObj.clientId)
    this.reqObj.createdById = this.createdById
    console.log("this.projectSiteAssetId",this.projectSiteAssetId)
    this.reqObj.projectSiteAssetId = this.projectSiteAssetId
     console.log("this.reqObj.projectSiteAssetId",this.reqObj.projectSiteAssetId);
    console.log("reqObj", this.reqObj)
    if (this.reqObj.requestName != "" && this.reqObj.requestName.length>=3&& this.reqObj.clientId != 0 && this.reqObj.description != null
      && this.reqObj.assetId != 0 && this.reqObj.projectSiteAssetId != 0
      && this.reqObj.requestSubCategoryId != 0 && this.reqObj.requestPeriorityId != 0 &&
      this.reqObj.requestModeId != 0 && this.reqObj.teamId != 0 && this.reqObj.projectSiteAssetId != 0) {
      this.reqService.inserRequest(this.reqObj).subscribe(e => {
        this.reqId = e;
        this.reqDescriptionObj.requestId = Number(this.reqId)
        this.reqDescriptionObj.description = this.reqObj.description
        this.requestDescriptionService.AddRequestDescription(this.reqDescriptionObj).subscribe(e => {
          this.reqImage.requestId = Number(this.reqId);
          this.IsSaveProject = true
          this.IsDisabled = true
          this.disabledButton = true
          this.messageService.add({ key: 'tr', severity: 'success', summary: 'Success', detail: 'Request Added Successfully' });
        })
      })
    }
    else {
      this.disabledButton = false
      this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: false, detail: 'Plz Complete Data' });
    }

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
        createdById: "", createdBy: "", projectSiteAssetId: 0,
        requestTypeId: 0, serialNumber: '', sitename: '',
        id: 0, projectId: 0, projectName: '', requestCode: '',
        requestName: '', requestPeriority: '', requestPeriorityId: 0,
        requestStatus: '', requestStatusId: 0, requestTime: new Date().getHours() + ':' + new Date().getMinutes(), requestDate: new Date(),
        requestSubCategoryId: 0, requestSubCategoryName: '', assetId: 0, clientId: 0,
        requestTypeName: '', description: '', requestModeId: 0, IsAssigned: false,
        IsSolved: false, RequestProblemObj: new RequestProblems, clientName: '', projectTeamId: 0, teamId: 0, teamName: ''
      }
      this.messageService.add({ key: 'tr', severity: 'success', summary: 'Success', detail: 'Image added successfully' });
    })

  }
  CloseStipper() {
    this.dialogAddRequest = false;
    if (this.role=="PM")
            {
              
                this.router.navigate(['home/projectmanagerRequests']);
  
            }
    else    {
      this.router.navigate(['home/AllManagersReq'])
     }        
    

  }
 
 
}
