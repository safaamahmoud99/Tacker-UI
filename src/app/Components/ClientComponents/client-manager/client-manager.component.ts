import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { project } from '../../../../Shared/Models/project'
import { ProjectService } from '../../../../Shared/Services/project.service'
import { StackholdersService } from '../../../../Shared/Services/stackholders.service'
import { MilestoneService } from '../../../../Shared/Services/milestone.service'
import { ProjectTeamService } from '../../../../Shared/Services/project-team.service'
import { ProjectDocumentService } from '../../../../Shared/Services/project-document.service'
import { stackholder } from '../../../../Shared/Models/stackeholder'
import { mileStone } from '../../../../Shared/Models/mileStone'
import { projectTeam } from '../../../../Shared/Models/projectTeam'
import { ProjectDocuments } from '../../../../Shared/Models/ProjectDocuments'
import { Router, RouterLink } from '@angular/router';
import { SiteClientsService } from 'src/Shared/Services/site-clients.service';
import { ProjectSiteAssetService } from 'src/Shared/Services/project-site-asset.service';
import { client } from 'src/Shared/Models/client';
import { ListProjectSiteAssetClients } from 'src/Shared/Models/ListProjectSiteAssetClients';
import { OrganizationClientsService } from 'src/Shared/Services/organization-clients.service';
import { RequestService } from 'src/Shared/Services/request.service';
import { request } from 'src/Shared/Models/request';
import { RequestProblems } from 'src/Shared/Models/requestProblems';
import { requestMode } from 'src/Shared/Models/requestMode';
import { requestType } from 'src/Shared/Models/requestType';
import { requestPeriority } from 'src/Shared/Models/requestPeriority';
import { requestStatus } from 'src/Shared/Models/requestStatus';
import { requestSubCategory } from 'src/Shared/Models/requestSubCategory';
import { RequestImage } from 'src/Shared/Models/RequestImages';
import { TranslateService } from '@ngx-translate/core';
import { requestDescription } from 'src/Shared/Models/requestDescription';
import { RequestDescriptionService } from 'src/Shared/Services/request-description.service';
import { ProjectSiteAsset } from 'src/Shared/Models/ProjectSiteAsset';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RequestSubCategoryService } from 'src/Shared/Services/request-sub-category.service';
import { RequestPeriorityService } from 'src/Shared/Services/request-periority.service';
import { ProjectSitesService } from 'src/Shared/Services/project-sites.service';
import { Sites } from 'src/Shared/Models/Sites';

@Component({
  selector: 'app-client-manager',
  templateUrl: './client-manager.component.html',
  styleUrls: ['./client-manager.component.scss']
})
export class ClientManagerComponent implements OnInit {
  projects: project[]
  project1: project = new project()
  project2: project
  stackholders: stackholder[]
  mileStones: mileStone[]
  teams: projectTeam[]
  documents: ProjectDocuments[]
  displayModal: boolean;
  displayModal2: boolean;
  displayMaximizable: boolean;
  displayEdit: boolean;
  id: any;
  role: string
  LoggedInUserId: number
  lstClientsByProjectId: client[]
  listProjectSiteAssetClients: ListProjectSiteAssetClients[]
  clientId: number;
  IsClientManager: boolean;
  clientManager: string;
  lstRequests: request[]
  reqObj: request
  dialogAddRequest: boolean;
  projectName: string;
  projectId: any;
  requestMode: requestMode
  lstReqTypies: requestType[]
  lstReqPeriorities: requestPeriority[]
  lstReqStatus: requestStatus[]
  lstReqSubCategories: requestSubCategory[]
  lstProjectTeams: projectTeam[]
  lstRequestImages: RequestImage[]
  reqDescriptionObj: requestDescription
  reqImage: RequestImage
  lstAssetsSerialsByAsset: ProjectSiteAsset[];
  lstAssetsByProject: ListProjectSiteAssetClients[]
  lstRequestDesc: requestDescription[]
  reqImages: RequestImage[]
  reqcodee:string;
  
  modetarnsalte = this.translate.get('Select Mode');
  lstRequestMode: Array<{ id: number, mode: string }> = [
    { id: 0, mode: 'Mode' },
    { id: 1, mode: 'Phone' },
    { id: 2, mode: 'Chat' },
    { id: 3, mode: 'Mail' },
    { id: 4, mode: 'SMS' },
  ];
  ProjId: number;
  sites:Sites[]
  disabledButton: boolean;
  reqId: request;
  LoggedInUserString: string;
  assetId: any;
  projectSiteAssetId: any;
  items: MenuItem[];
  activeIndex: number = 0;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  IsSaveProject: boolean;
  NewdecDialogbool: boolean;
  NewclientDialogbool: boolean;
  createdById: string;
  siteID:any;
  ProIdd:any;
  constructor(private route: Router, private projectteamservice: ProjectTeamService,
    private projectdocumentsservice: ProjectDocumentService, private requestService: RequestService,
    private messageService: MessageService, private confirmationService: ConfirmationService,private httpClient: HttpClient,
    private milestoneservice: MilestoneService, private projectService: ProjectService,private translate: TranslateService,
    private stackholderService: StackholdersService, private siteClientsService: SiteClientsService,private requestDescriptionService: RequestDescriptionService,
    private projectSiteAssetService: ProjectSiteAssetService, private organizationClientsService: OrganizationClientsService,
    private router: Router,private _formBuilder: FormBuilder,private ReqSubCatService:RequestSubCategoryService,
    private reqPeriorityService:RequestPeriorityService,private projectSiteservice:ProjectSitesService ) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  
    this.items = [{
      label: 'Request',
      command: (event: any) => {
        this.activeIndex = 0;
      }
    },
    {
      label: 'Documents',
      command: (event: any) => {
        this.activeIndex = 1;
      }
    }
    ];
    this.lstRequestDesc = [] 
    this.sites=[]
    this.reqImages = []
    this.lstRequests = []
    this.lstClientsByProjectId = []
    this.listProjectSiteAssetClients = []
    this.lstRequestImages = []
    this.lstReqPeriorities = []
    this.lstReqTypies = []
    this.lstReqStatus = []
    this.lstReqSubCategories = []
    this.lstAssetsSerialsByAsset=[]
    this.lstAssetsByProject = []
    this.role = localStorage.getItem('roles')
    this.LoggedInUserId = Number(localStorage.getItem('id'))
    this.clientId = Number(localStorage.getItem("clientId"))
    this.clientManager = localStorage.getItem("clientManager")
    this.LoggedInUserString = localStorage.getItem('loginedUserId')
    this.createdById= localStorage.getItem('loginedUserId')
    console.log("loggedin", localStorage.getItem('id'))
    console.log("clientManager", this.clientManager)
    this.disabledButton = false
    this.IsSaveProject= false
    this.organizationClientsService.GetOrganizationProjectsByClientId(this.clientId).subscribe(
      res => {
        this.projects = res,
        console.log("this.projectssssss",this.projects);
        console.log("projects",this.projects)
        this.projects.forEach(element => {
          if (element.id == this.projectId) {
            this.projectName = element.projectName
          }
        })
      }
    )
    this.reqImage = {
      id: 0, imageName: '', requestId: 0
    }
    this.reqDescriptionObj = {
      descriptionDate: new Date,
      description: '', id: 0, requestId: 0, userId: this.LoggedInUserString
    }
    this.reqObj = {
      requestTypeId: 0, serialNumber: '',createdById:"",createdBy:"",sitename: '',projectSiteAssetId:0,
      id: 0, projectId: 0, projectName: '', requestCode: '',
      requestName: '', requestPeriority: '', requestPeriorityId: 0,
      requestStatus: '', requestStatusId: 0, requestTime: new Date().getHours() + ':' + new Date().getMinutes(), requestDate: new Date(),
      requestSubCategoryId: 0, requestSubCategoryName: '', assetId: 0, clientId: 0,
      requestTypeName: '', description: '', requestModeId: 0, IsAssigned: false,
      IsSolved: false, RequestProblemObj: new RequestProblems, clientName: '', projectTeamId: 0, teamId: 0, teamName: ''
    }
    this.project1 = {
      IsDeleted: false, RequestOpenedLength: 0, RequestInProgressLength: 0, RequestClosedLength: 0,
      endtDate: new Date, startDate: new Date,
      actualEndDate: "", listOfdocuments: [], listofprojectteam: [], id: 0, organizationId: 0, projectPeriod: 0, clientMobile: '', clientName: '', organizationName: '', projectTypeName: '',
      planndedEndDate: "", planndedStartDate: "", projectCode: '', listOfStackholders: [], listOfmilestones: [], projectTypeId: 0,
      projectName: '', actualStartDate: "", clientId: 0, cost: 0, description: '', employeeId: 0
    }
    this.projectObj = {
      IsDeleted: false,
      actualEndDate: new Date(), listOfdocuments: [], listofprojectteam: [], id: 0, organizationId: 0, projectPeriod: 0, clientMobile: '', clientName: '', organizationName: '', projectTypeName: '',
      planndedEndDate: new Date
        (), planndedStartDate: new Date(), projectCode: '', listOfStackholders: [], listOfmilestones: [], projectTypeId: 0,
      projectName: '', actualStartDate: new Date(), clientId: 0, cost: 0, description: '', employeeId: 0
    }
  }
  NextStep() {
    this.activeIndex = this.activeIndex + 1
  }
  PreviousStep() {
    this.activeIndex = this.activeIndex - 1
  }
 
  ShowRequets(projectId) {

    this.projectId=projectId
   this.ProIdd=projectId
    console.log("projectId", projectId)
    this.requestService.GetAllRequestByProjectId(projectId).subscribe(e => {
      this.lstRequests = e
      console.log("lstRequests", this.lstRequests)

      // this.lstRequests.forEach(element => {
      //   this.clientName = element.clientName
      // });
    })
  } 

  showAllProjectDetails(projectID: number) {
    console.log(projectID)
  }
  showModalDialog() {
    this.displayModal = true;
    //this.displayMaximizable = true;

  }
  showMaximizableDialog(Projectid) {
    console.log("Projectid",Projectid)
    this.projects.forEach(element => {
      if (element.id == Projectid) {
        this.project1 = element
        console.log(this.project1)
      }
    });
   
    this.projectSiteAssetService.GetAllProjectSiteAssetByProjectId(Projectid).subscribe(
      res => {
        this.listProjectSiteAssetClients = res
        console.log("res", res)
      }
    )




    this.siteClientsService.GetAllAssignedClientsByProjectId(Projectid).subscribe(
      res => {
        this.lstClientsByProjectId = res
      }
    )
    this.stackholderService.GetAllStackholdersByProjectID(Projectid).subscribe(e => {
      this.stackholders = e
      // console.log("e",e)

      this.project1.listOfStackholders = this.stackholders
      // console.log("stackholders",this.stackholders)
    })

    //milestone
    this.milestoneservice.GetAllMileStonesByProjectID(Projectid).subscribe(m => {
      this.mileStones = m;
      this.project1.listOfmilestones = this.mileStones;
      //console.log("milestones",this.mileStones)
    }), err => console.log(err)

    this.projectteamservice.GetAllTeamsByProjectID(Projectid).subscribe(t => {
      this.teams = t;
      this.project1.listofprojectteam = this.teams;
    }), err => console.log(err)

    this.projectdocumentsservice.GetAllDocumentsByProjectID(Projectid).subscribe(d => {
      this.documents = d;
      this.project1.listOfdocuments = this.documents;
    }), err => console.log(err)

   console.log("project1IIII456",Projectid);
    this.displayMaximizable = true;
  }
  GetProjectTeamId(TeamId) {
    this.projectteamservice.GetProjectTeamByProjectIdAndTeamIdAndProjectPositionId(this.projectId, TeamId.value)
      .subscribe(e => {
        this.ProjId = e.id
        this.ProIdd=this.projectId
        this.reqObj.projectTeamId = this.ProjId
      })
  }

  AddRequest() {
    this.reqObj.requestStatusId = 1  //open
    this.reqObj.projectTeamId = this.ProjId
    this.reqObj.projectId = Number(this.reqObj.projectId)
    this.reqObj.clientId = Number(this.reqObj.clientId)
    this.reqObj.createdById=this.createdById
    this.reqObj.projectSiteAssetId=this.projectSiteAssetId 
    console.log("reqObj",this.reqObj)
    if (this.reqObj.requestName != "" && this.reqObj.clientId != 0 && this.reqObj.description!=null
    && this.reqObj.assetId!=0 && this.reqObj.projectSiteAssetId!=0
      && this.reqObj.requestSubCategoryId != 0 && this.reqObj.requestPeriorityId != 0 &&
      this.reqObj.requestModeId != 0 && this.reqObj.teamId != 0) {
      this.requestService.inserRequest(this.reqObj).subscribe(e => {
        this.reqId = e;
        this.reqDescriptionObj.requestId =Number(this.reqId) 
        this.reqDescriptionObj.description = this.reqObj.description
        this.requestDescriptionService.AddRequestDescription(this.reqDescriptionObj).subscribe(e => {
          this.reqImage.requestId = Number(this.reqId) ;
          this.IsSaveProject = true;
          console.log("projectIdINtEQUEST",this.reqObj.projectId)
        //  this.ShowRequets(this.ProIdd);
          this.messageService.add({ key: 'tr',severity: 'success', summary: 'Success', detail: 'Request Added Successfully' });
          console.log("this.ProId=",this.ProIdd);
        })
      })
      this.disabledButton = true
    }
    else {
      this.disabledButton = false
      this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz Complete Data' });
    }

  }

  getreq()
  {
      this.requestService.GetRequestByRequestId(Number(this.reqId)).subscribe( 
        re=>{
        this.reqcodee=re.requestCode,
        console.log("e.requestCode",re);
        }
      )
  }
  CloseStipper()
  {
    
      this.dialogAddRequest=false
      console.log("this.reqObj.projectId)",this.reqObj.projectId);
      this.requestService.GetAllRequestByProjectId(this.ProIdd).subscribe(e => {
      this.lstRequests = e,
      this.IsSaveProject=false;
      this.disabledButton=false;
      console.log("lstRequests", this.lstRequests)

      // this.lstRequests.forEach(element => {
      //   this.clientName = element.clientName
      // });
    })
  }


  // getprojId(id:number){
  //   RouterLink
  //   this.router.navigate(['updateproject']);
  // }
  DisplayToEditProject(Projectid: number) {
    this.ngOnInit()
    this.route.navigate(['./tabs/updateproject']);
    console.log(Projectid)
    this.projects.forEach(element => {
      if (element.id == Projectid) {
        this.project1 = element
        console.log("project11111111111111111111111",this.project1)
      }
      this.projectService.getProjectById(this.project1.id).subscribe(res => {
        this.projectObj = res;
      })

      this.stackholderService.GetAllStackholdersByProjectID(Projectid).subscribe(e => {
        this.stackholders = e
        this.projectObj.listOfStackholders = e


        this.project1.listOfStackholders = this.stackholders
        // console.log("stackholders",this.stackholders)
      })
      //milestone
      this.milestoneservice.GetAllMileStonesByProjectID(Projectid).subscribe(m => {
        this.mileStones = m;
        this.project1.listOfmilestones = this.mileStones;
        this.projectObj.listOfmilestones = m

        //console.log("milestones",this.mileStones)
      }), err => console.log(err)

      this.projectteamservice.GetAllTeamsByProjectID(Projectid).subscribe(t => {
        this.teams = t;
        this.project1.listofprojectteam = this.teams;
        this.projectObj.listofprojectteam = t
        console.log(this.projectObj.listofprojectteam)
      }), err => console.log(err)

      this.projectdocumentsservice.GetAllDocumentsByProjectID(Projectid).subscribe(d => {
        this.documents = d;
        this.project1.listOfdocuments = this.documents;
        this.projectObj.listOfdocuments = d;
      }), err => console.log(err)

    });
    this.displayEdit = true;
  }

  projectObj: any;

  OpendialogAddRequest() {
    // this.siteClientsService.GetAllAssignedClientsByProjectId(this.projectId).subscribe(
    //   res => {
    //     this.lstClientsByProjectId = res
    //   }
    // )
    this.lstRequestImages=[];
    this.lstAssetsSerialsByAsset=[];
    this.lstAssetsByProject =[];
    this.projectSiteAssetService.GetAllProjectSiteAssetByProjectId(this.projectId).subscribe(
      res => {
        this.listProjectSiteAssetClients = res
      }
    )
    this.ReqSubCatService.GetAllSubCategorys().subscribe(e => {
      this.lstReqSubCategories = e
    })
    this.reqPeriorityService.GetAllRequestPeriorties().subscribe(e => {
      this.lstReqPeriorities = e,
      this.reqObj.requestPeriorityId=4;
      console.log("lstPeriority", this.lstReqPeriorities)
    })
    this.projectteamservice.GetAllTeamsByProjectID(this.projectId).subscribe(e => {
      this.lstProjectTeams = e
      this.lstProjectTeams = e.reduce((unique, o) => {
        if (!unique.some(obj => obj.teamId == o.teamId)) {
          unique.push(o);
        }
        return unique;
      }, []);
      console.log("lstproTeams", this.lstProjectTeams)
    })
    this.projectSiteservice.GetAllProjectSitesByProjectId(this.projectId).subscribe(
      res=>{
        this.sites=res,
        console.log("this.sites",this.sites)
      }
    )
    this.projects.forEach(element => {
      if (element.id == this.projectId) {
        this.projectName = element.projectName
      }
    })
    this.reqObj = {createdById:"",createdBy:"",projectSiteAssetId:0,
      requestTypeId: 0, serialNumber: '', sitename: '',
      id: 0, projectId: 0, projectName: '', requestCode: '',
      requestName: '', requestPeriority: '', requestPeriorityId: 0,
      requestStatus: '', requestStatusId: 0, requestTime: new Date().getHours() + ':' + new Date().getMinutes(), requestDate: new Date(),
      requestSubCategoryId: 0, requestSubCategoryName: '', assetId: 0, clientId: 0,
      requestTypeName: '', description: '', requestModeId: 0, IsAssigned: false,
      IsSolved: false, RequestProblemObj: new RequestProblems, clientName: '', projectTeamId: 0, teamId: 0, teamName: ''
    }
    this.dialogAddRequest = true
    // this.projectSiteAssetService.GetAllProjectSiteAssetByProjectId(this.projectId).subscribe(
    //   res => {
    //     this.lstAssetsByProject = res
    //   }
    // )
   
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
    console.log("serialNumber",event.value)
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
      id: 0, imageName: '', requestId:Number(this.reqId) 
    };
  }
  SaveimageToDB() {

    this.requestService.addListRequestImages(this.lstRequestImages).subscribe(e => {
      this.messageService.add({ key: 'tr',severity: 'success', summary: 'Success', detail: 'Image added successfully' });
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
  confirm(id) {
    console.log(id)

    this.projectService.getProjectById(id).subscribe(res => {
      this.projectObj = res;
      console.log(this.projectObj)
      this.projectService.DeleteProject(id, this.projectObj).subscribe(
        data => {
          console.log(id, data)
          this.ngOnInit()

        }
      )
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
  hello(e) {
    console.log(e)
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