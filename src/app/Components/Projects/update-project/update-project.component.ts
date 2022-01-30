import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { project } from '../../../../Shared/Models/project'
import { ProjectService } from '../../../../Shared/Services/project.service'
import { CreateTeamVM, Team } from "../../../../Shared/Models/team";

import { StackholdersService } from '../../../../Shared/Services/stackholders.service'
import { MilestoneService } from '../../../../Shared/Services/milestone.service'
import { ProjectTeamService } from '../../../../Shared/Services/project-team.service'
import { ProjectDocumentService } from '../../../../Shared/Services/project-document.service'
import { stackholder } from '../../../../Shared/Models/stackeholder'
import { mileStone } from '../../../../Shared/Models/mileStone'
import { projectTeam } from '../../../../Shared/Models/projectTeam'
import { ProjectDocuments } from '../../../../Shared/Models/ProjectDocuments'
import { ActivatedRoute, Router } from '@angular/router';
import { projectPosition } from 'src/Shared/Models/projectPosition';
import { ProjectPositionService } from 'src/Shared/Services/project-position.service';
import { department } from "../../../../Shared/Models/department";
import { DepartmentService } from "../../../../Shared/Services/department.service";
import { EmployeeService } from 'src/Shared/Services/employee.service';
import { employee } from 'src/Shared/Models/employee';
import { environment } from 'src/environments/environment';
import { projectType } from 'src/Shared/Models/projectType';
import { ProjectTypeService } from 'src/Shared/Services/project-type.service';
import { organization } from 'src/Shared/Models/organization';
import { OrganizationService } from 'src/Shared/Services/organization.service';
import { pipe } from 'rxjs';
import { client } from 'src/Shared/Models/client';
import { ClientService } from 'src/Shared/Services/client.service';
import { Sites } from 'src/Shared/Models/Sites';
import { SitesService } from 'src/Shared/Services/sites.service';
import { ProjectSites } from 'src/Shared/Models/ProjectSites';
import { ProjectSitesService } from 'src/Shared/Services/project-sites.service';
import { SiteClientsService } from 'src/Shared/Services/site-clients.service';
import { ProjectSiteAssetService } from 'src/Shared/Services/project-site-asset.service';
import { ListProjectSiteAssetClients } from 'src/Shared/Models/ListProjectSiteAssetClients';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { asset } from 'src/Shared/Models/asset';
import { AssetService } from 'src/Shared/Services/asset.service';
import { Suppliers } from 'src/Shared/Models/Suppliers';
import { SuppliersService } from 'src/Shared/Services/suppliers.service';
import { SiteClients } from 'src/Shared/Models/SiteClients';
import { ProjectSiteAsset } from 'src/Shared/Models/ProjectSiteAsset';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { RequestService } from 'src/Shared/Services/request.service';
import { request } from 'src/Shared/Models/request';
import { TranslateService } from '@ngx-translate/core';
import * as internal from 'events';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css'],

})
export class UpdateProjectComponent implements OnInit {
  departments: department[]
  department: department
  lstEmployees: employee[]
  projects: project[]
  project1: project = new project()
  project2: project
  stackholders: stackholder[]
  mileStones: mileStone[]
  teams: projectTeam[]
  stackholderInLst: stackholder
  lstOfStackholder: stackholder[]
  documents: ProjectDocuments[]
  displayModal: boolean;
  displayModal2: boolean;
  displayMaximizable: boolean;
  displayEdit: boolean;
  id: any;
  Id: number
  projectObj: project
  milestonInLst: mileStone
  lstOfMilestones: mileStone[]
  lstoddocproj: ProjectDocuments[]
  lstOfProjectTeams: projectTeam[]=[]
  ProjectTeam: projectTeam
  displayBasic: boolean;
  displayMile: boolean;
  displayteam: boolean;
  displaydoc: boolean
  lstOfprojectPosition: projectPosition[]
  docproject: ProjectDocuments
  teamname: any
  team: Team
  emploeeObj: employee
  lstProjectTypes: projectType[];
  lstOrganizations: organization[];
  lstClients: client[];
  projectid: number
  items: MenuItem[];
  activeIndex: number = 0;
  lstSelectedClients: client[]
  lstAllSites: Sites[]
  selectedSitesColumns: Sites[]
  OldselectedSitesColumns: Sites[]
  SelectedSites: Sites[]
  ProjectSitesObj: ProjectSites
  SiteId: number;
  projectSiteId: number;
  listProjectSiteAssetClients: ListProjectSiteAssetClients[]
  projectSiteClientObj: ListProjectSiteAssetClients
  plannedStartDate: string;
  ActualStartDate: string;
  planndedEndDate: string;
  ActualEndtDate: string;
  minDate: Date;
  minplannedStartDate: Date = new Date();
  minActualStartDate: Date = new Date();
  NewDialogbool: boolean;
  EditAssetDialogbool: boolean;
  lstassets: asset[]
  lstSuppliers: Suppliers[];
  missing: Sites[];
  selectedsite: Sites;
  CountTeamLeader:boolean=false;
  CountProjectManger:boolean=false;
  SiteClientsObj: SiteClients
  ProjectSiteAssetObj: ProjectSiteAsset
  ProjectSiteAssetObjInEdit: ProjectSiteAsset
  isshowBtn: boolean;
  ProjectdataFormGroup: FormGroup;
  AssetFormGroup: FormGroup;
  PartenerFormGroup: FormGroup;
  MileStoneFormGroup: FormGroup;
  TeamFormGroup: FormGroup;
  DocumentsFormGroup: FormGroup;
  isLinear = false;
  IsSaveProject: boolean;
  disabledButton: boolean;
  ProjectSiteAssetId: any;
  warantryStartDate: string;
  lstRequstsByProjectSiteAsset: request[]
  serialNumber: any;
  serialNumberInEdit: any;
  isFound:boolean=false;
  addTeamObj:CreateTeamVM;
  constructor(private positionService: ProjectPositionService, private employeeService: EmployeeService,
    private departmentService: DepartmentService, private route: ActivatedRoute,
    private milestoneservice: MilestoneService, private projectService: ProjectService,
    private stackholderService: StackholdersService, private httpClient: HttpClient,
    private projectteamservice: ProjectTeamService, private projectPositionService: ProjectPositionService,
    private projectdocumentsservice: ProjectDocumentService, private projectTypeService: ProjectTypeService,
    private activeRoute: ActivatedRoute, private organizationService: OrganizationService,
    private messageService: MessageService, private clientService: ClientService
    , private SiteService: SitesService, private ProjectSitesService: ProjectSitesService,
    private SiteClientsService: SiteClientsService, private ProjectSiteAssetService: ProjectSiteAssetService,
    private assetservice: AssetService, private SuppliersService: SuppliersService,
    public datepipe: DatePipe, private _formBuilder: FormBuilder, private confirmationService: ConfirmationService,
    private requestservice: RequestService, private translate: TranslateService
  ) { }

  ngOnInit(): void
   {
    this.ProjectdataFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.AssetFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.PartenerFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.MileStoneFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.TeamFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.DocumentsFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.IsSaveProject = false
    this.disabledButton = false
    this.minDate = new Date();
    this.lstOfprojectPosition = []
    this.lstOfStackholder = []
    this.lstOfMilestones = []
    this.lstoddocproj = []
    // this.lstOfProjectTeams = []
    this.lstSelectedClients = []
    this.lstAllSites = []
    this.selectedSitesColumns = []
    this.OldselectedSitesColumns = []
    this.listProjectSiteAssetClients = []
    this.lstRequstsByProjectSiteAsset = []
    this.lstassets = []
    this.lstSuppliers = []
    this.SelectedSites = []
    this.missing = []
    this.items = [{
      label: 'Project Data',
      command: (event: any) => {
        this.activeIndex = 0;
      }
    },
    {
      label: 'Assets',
      command: (event: any) => {
        this.activeIndex = 1;
      }
    },
    {
      label: 'Partners',
      command: (event: any) => {
        this.activeIndex = 2;
      }
    }
      ,
    {
      label: 'MileStones',
      command: (event: any) => {
        this.activeIndex = 3;
      }
    }
      ,
    {
      label: 'Teams',
      command: (event: any) => {
        this.activeIndex = 4;
      }
    },
    {
      label: 'Documents',
      command: (event: any) => {
        this.activeIndex = 5;
      }
    }
    ];
    this.projectid = this.activeRoute.snapshot.params['id'];
    this.SiteClientsObj = {
      id: 0, clients: [], projectSiteId: 0, siteId: 0, siteName: ''
    }
    this.ProjectSitesObj = {
      id: 0, projectId: 0, projectName: '', siteId: 0, siteName: '', lstSites: []
    }
    this.ProjectSiteAssetObj = {
      id: 0, days: 0, supplierName: '', ProjectSiteId: 0, assetId: 0, assetName: '',
      serialNumber: '', supplierId: 0, warrantyPeriod: 0, warrantyStartDate: ""
    }
    this.ProjectSiteAssetObjInEdit=
    {
      id: 0, days: 0, supplierName: '', ProjectSiteId: 0, assetId: 0, assetName: '',
      serialNumber: '', supplierId: 0, warrantyPeriod: 0, warrantyStartDate: ""
    }
    this.addTeamObj={
      name:'',projectTeams:[]
    }
    this.SiteService.GetAllSites().subscribe(
      res => {
        this.lstAllSites = res
      }
    )
    this.SuppliersService.GetAllSuppliers().subscribe(
      res => { this.lstSuppliers = res },
      err => console.log(err)
    )
    this.assetservice.GetAllAssets().subscribe(
      data => {
        this.lstassets = data
      },
      err => console.log(err)
    )
    //this.clientService.GetAllClients().subscribe(
    this.projectSiteClientObj = {
      id: 0,
      clients: [], ProjectId: 0,
      days: 0, siteId: 0, siteName: '', supplierName: '', ProjectName: '', ProjectSiteId: 0, assetId: 0, assetName: '',
      serialNumber: '', supplierId: 0, warrantyPeriod: 0, warrantyStartDate: ""
    }
    this.docproject = {
      Description: '', documentName: '', documentFile: '', id: 0, projectId: 0
    }
    this.emploeeObj = {
      address: '', dateOfBirth: new Date(), departmentId: 0, departmentName: '', email: '', employeeCode: ''
      , employeeName: '', gender: '', hiringDateHiringDate: new Date(), id: 0, maritalStatus: '', mobile: '', phone: '', photo: '', position: ''
    }
    this.team = {
      Id: 0, Name: ''
    }
    this.department = {
      id: 0, name: ''
    }
    this.stackholderInLst = {
      description: '', id: 0, mobile: '', projectId: 0, rank: '', stackeholderName: ''
    }
    this.milestonInLst = {
      description: '', id: 0, endDate: "", projectId: 0, startDate: "", title: ''
    }
    this.ProjectTeam = {
      teamId: 0, teamName: '',
      departmentId: 0, id: 0, projectName: '', departmentName: '',
      employeeId: 0, employeeName: '',
      projectId: this.id, projectPositionId: 0, projectPositionName: ''
    }
    this.docproject = {
      Description: '', documentName: '', documentFile: '', id: 0, projectId: 0
    }
    this.projectObj = {
      startDate: new Date, endtDate: new Date, RequestClosedLength: 0, RequestInProgressLength: 0, RequestOpenedLength: 0,
      IsDeleted: false,
      actualEndDate: "", listOfdocuments: [], listofprojectteam: [], id: 0, organizationId: 0, projectPeriod: 0, clientMobile: '', clientName: '', organizationName: '', projectTypeName: '',
      planndedEndDate: ""
      , planndedStartDate: "", projectCode: '', listOfStackholders: [], listOfmilestones: [], projectTypeId: 0,
      projectName: '', actualStartDate: "", clientId: 0, cost: 0, description: '', employeeId: 0
    }
    this.id = this.route.snapshot.params['id'];
    this.stackholderInLst.projectId = Number(this.id)
    this.milestonInLst.projectId = Number(this.id)
    this.ProjectTeam.projectId = Number(this.id)
    this.docproject.projectId = Number(this.id)
    this.ProjectSitesService.GetAllProjectSitesByProjectId(this.id).subscribe(
      res => {
        this.selectedSitesColumns = res
        this.OldselectedSitesColumns = res
      }
    )
    this.projectService.getProjectById(this.id).subscribe(res => {
      this.projectObj = res;

      // this.projectObj.planndedStartDate = res["PlanndedStartDate"];
      this.employeeService.getEmpByID(this.projectObj.employeeId).subscribe(res => {
        this.emploeeObj = res;
      })
    })
    this.projectTypeService.GetAllProjectTypes().subscribe(
      data => { this.lstProjectTypes = data },
      err => console.log(err)
    )
    this.employeeService.GetAllEmployees().subscribe(
      res => {
        this.lstEmployees = res
      },
      err => console.log(err))
    this.organizationService.GetAllOrganizations().subscribe(
      res => { this.lstOrganizations = res },
      err => console.log(err)
    )

    this.projectPositionService.GetAllProjectPosition().subscribe(e => {
      this.lstOfprojectPosition = e
    })

    this.employeeService.GetAllEmployees().subscribe(
      res => {
        this.lstEmployees = res
      },
      err => console.log(err)
    )

    this.stackholderService.GetAllStackholdersByProjectID(this.id).subscribe(e => {
      // this.stackholders = e
      this.projectObj.listOfStackholders = e
    })
    //milestone
    this.milestoneservice.GetAllMileStonesByProjectID(this.id).subscribe(m => {
      this.mileStones = m;
      this.projectObj.listOfmilestones = m
    }), err => console.log(err)

    this.projectteamservice.GetAllTeamsByProjectID(this.id).subscribe(t => {
      this.teams = t;
      this.project1.listofprojectteam = this.teams;
      this.projectObj.listofprojectteam = t
    }), err => console.log(err)

    this.projectdocumentsservice.GetAllDocumentsByProjectID(this.id).subscribe(d => {
      this.documents = d;
      this.project1.listOfdocuments = this.documents;
      this.projectObj.listOfdocuments = d;
    }), err => console.log(err)

  }
  addEventplanndedStart(event: MatDatepickerInputEvent<Date>) {
    this.minplannedStartDate = event.value
    this.plannedStartDate = this.datepipe.transform(event.value, 'yyyy-MM-dd');
    this.projectObj.planndedStartDate = this.plannedStartDate
    this.projectObj.planndedEndDate = this.projectObj.planndedStartDate
  }
  addEventActualStart(event: MatDatepickerInputEvent<Date>) {
    this.minActualStartDate = event.value
    this.ActualStartDate = this.datepipe.transform(event.value, 'yyyy-MM-dd');
    this.projectObj.actualStartDate = this.ActualStartDate
    this.projectObj.actualEndDate = this.projectObj.actualStartDate
  }
  addEventplanndedEnd(event: MatDatepickerInputEvent<Date>) {
    this.planndedEndDate = this.datepipe.transform(event.value, 'yyyy-MM-dd');
    this.projectObj.planndedEndDate = this.planndedEndDate
  }
  addEventActualEnd(event: MatDatepickerInputEvent<Date>) {
    this.ActualEndtDate = this.datepipe.transform(event.value, 'yyyy-MM-dd');
    this.projectObj.actualEndDate = this.ActualEndtDate
  }
  addEventwarantryStartDate(event: MatDatepickerInputEvent<Date>) {
    console.log("ggggg",this.ProjectSiteAssetObj)
    this.warantryStartDate = this.datepipe.transform(event.value, 'yyyy-MM-dd');
    this.ProjectSiteAssetObj.warrantyStartDate = this.warantryStartDate
  }

  cleartable(table: Table) {
    table.clear();
  }
  PreviousStep() {
    this.activeIndex = this.activeIndex - 1
  }

  NextStep() {
    if (this.activeIndex == 0) {
      if (this.projectObj.projectName == "" && this.projectObj.projectCode == "" &&
        this.projectObj.projectTypeId == 0 && this.projectObj.organizationId == 0 && this.projectObj.employeeId == 0) {
       // this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz Complete Data' });
       if(this.translate.currentLang=='English')
          {
            this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky:false, detail: 'Plz Complete Data' });
          }
          else
          {
            this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky:false, detail: 'من فضلك ادخل البيانات كامله ' });

          }
        this.activeIndex = 0
      }
      else {
        this.activeIndex = this.activeIndex + 1
      }
    }
    else {
      this.activeIndex = this.activeIndex + 1
    }
  }

  getProjectSiteIdEvent($event) {
    this.SiteId = $event.value
    //this.projectID
    this.SiteClientsService.GetAllUnassignedClientsforAnotherProjectAndAssignedByThisProjectId(this.SiteId, this.id).subscribe(
      res => {
        this.lstClients = res

      },
      err => console.log(err)
    )
    this.ProjectSitesService.GetProjectSiteByProjectIdAndSiteId(this.id, this.SiteId).subscribe(
      res => {
        this.projectSiteId = res.id
      }
    )
    this.ProjectSiteAssetService.GetAllProjectSiteAssetBySiteId(this.SiteId, this.id).subscribe(
      res => {
        this.listProjectSiteAssetClients = res
      }
    )
    this.SiteClientsService.GetAllAssignedClients(this.SiteId, this.id).subscribe(
      // this.clientService.GetAllClients().subscribe(
      res => {
        this.lstSelectedClients = res
      },
      err => console.log(err)
    )
  }
  AddAssets() {
    if (this.SiteId == undefined)
     {
     // this.messageService.add({ severity: 'warn', summary: 'Attention', detail: 'Plz select Site', sticky: true });
     if(this.translate.currentLang=='English')
     {
      this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: false, detail: 'Plz select Site' });
     }
     else
     {
      this.messageService.add({ key: 'tr', severity: 'error', summary: 'انتبه !!!', sticky: false, detail: 'من فضلك اختر موقع ' });
     }
    }
    else {
      this.NewDialogbool = true

    }
  }
  editAsset(ProjectSiteAssetId) {
    this.EditAssetDialogbool = true
    this.ProjectSiteAssetId = ProjectSiteAssetId
    this.ProjectSiteAssetService.GetProjectSiteAssetById(ProjectSiteAssetId).subscribe(
      res => {
        this.ProjectSiteAssetObj = res
      }
    )
  }

  UpdateProjectSiteAsset() {
    console.log("this.ProjectSiteAssetObj before update", this.ProjectSiteAssetObj)
    this.ProjectSiteAssetObj.assetId = Number(this.ProjectSiteAssetObj.assetId)
    this.ProjectSiteAssetService.updateProjectSiteAsset(this.ProjectSiteAssetId, this.ProjectSiteAssetObj).subscribe(
      res => {
        this.ProjectSiteAssetService.GetAllProjectSiteAssetBySiteId(this.SiteId, this.id).subscribe(
          res => {
            this.EditAssetDialogbool = false
           // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record Updated' });
           if(this.translate.currentLang=='English')
          {
         this.messageService.add({   severity:'success', summary:'Success', detail: 'Record Updated' });
          }
        else
        {
        this.messageService.add({ severity:'success', summary: 'نجاح', sticky: false, detail: 'تم التعديل ' });
        }
            this.listProjectSiteAssetClients = res
          }
        )
      }
    )
  }
  confirm(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',    
      accept: () => {
        this.requestservice.GetAllRequestByProjectSiteAssetId(id).subscribe(
          res => {
            this.lstRequstsByProjectSiteAsset = res
            if (this.lstRequstsByProjectSiteAsset.length == 0) {
              this.ProjectSiteAssetService.deleteProjectSiteAsset(id).subscribe(
                data => {
                  this.ProjectSiteAssetService.GetAllProjectSiteAssetBySiteId(this.SiteId, this.id).subscribe(
                    res => {
                      this.listProjectSiteAssetClients = res
                        if(this.translate.currentLang=='English')
                        {
                          this.messageService.add({ severity: 'info', summary: 'Record Deleted!', detail: 'Record Deleted!' });
                        }
                        else
                        {
                          this.messageService.add({ severity: 'info', summary: 'حذف', detail: ' تم الحذف بنجاح ' });
                        }
                      
                    }
                  )
                }
              )
            }
            else {
             // this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Sorry this asset have requsts cannot delete it!' });
             if(this.translate.currentLang=='English')
             {
              this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky:false, detail: 'Sorry this asset have requsts cannot delete it!' });
             }
             else
             {
              this.messageService.add({ key: 'tr', severity: 'error', summary: '!!!انتبه', sticky:false, detail: 'هذا المسلسل موجود علية تذاكر لا يمكنك حذفه ' });
             }
            }
          }
        )
      }
    });
  }
  onChangeSerial(event) {
    console.log("serialNumber",event.target.value)
    console.log("this.ProjectSiteAssetObj",this.ProjectSiteAssetObj)
    this.serialNumber = event.target.value
    this.ProjectSiteAssetService.GetProjectSiteAssetBySerialNumber(this.serialNumber).subscribe(
      res=>{
        this.ProjectSiteAssetObj=res
        console.log("this.ProjectSiteAssetObj",this.ProjectSiteAssetObj)
        if(this.ProjectSiteAssetObj!==null)
        {
         // this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'this serial already exist , plz write another' });
         if(this.translate.currentLang=='English')
         {
          this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky:false, detail: 'this serial already exist , plz write another' });
         }
         else
         {
          this.messageService.add({ key: 'tr', severity: 'error', summary: 'انتبه !!!', sticky:false, detail: 'هذا المسلسل بالفعل مستخدم من فضلك اكتب غيره ' });
         }
          this.projectSiteClientObj.serialNumber="";
        }
        else
        {
          this.ProjectSiteAssetObj = {
            id: 0, days: 0, supplierName: '', ProjectSiteId: 0, assetId: 0, assetName: '',
            serialNumber: '', supplierId: 0, warrantyPeriod: 0, warrantyStartDate: ""
          }
        }
      }
    )

  }
  onChangeSerialInEdit(event) {
    console.log("serialNumber",event.target.value)

    this.serialNumberInEdit = event.target.value
    console.log("serialNumber2",this.serialNumberInEdit)

    this.ProjectSiteAssetService.GetProjectSiteAssetBySerialNumber(this.serialNumberInEdit).subscribe(
      res=>{
        this.ProjectSiteAssetObjInEdit=res
      }
      )
    if(this.ProjectSiteAssetObjInEdit!=null && this.ProjectSiteAssetObjInEdit.serialNumber == this.serialNumberInEdit)
    {
      this.ProjectSiteAssetService.GetProjectSiteAssetById(this.ProjectSiteAssetId).subscribe(
        res => {
          this.ProjectSiteAssetObj = res
        }
      )
         // this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'this serial already exist , plz write another' });
         if(this.translate.currentLang=='English')
         {
          this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky:false, detail: 'this serial already exist , plz write another' });
         }
         else
         {
          this.messageService.add({ key: 'tr', severity: 'error', summary: 'انتبه !!!', sticky:false, detail: 'هذا المسلسل بالفعل مستخدم من فضلك اكتب غيره ' });
         }

    }
  }
  saveSiteAssettoList() {
    // this.projectSiteClientObj.clients=this.lstSelectedClients
    for (let index = 0; index < this.lstSelectedClients.length; index++) {
      const element = this.lstSelectedClients[index];
      console.log("element", element)
      this.clientService.GetclientByID(Number(element.id)).subscribe(
        res4 => {
          console.log("res4", res4)
          this.projectSiteClientObj.clients.push(res4)

        }
      )
    }
    console.log("projectSiteClientObj",this.projectSiteClientObj)
    if (this.projectSiteClientObj.assetId != 0 && this.projectSiteClientObj.supplierId != 0 && this.projectSiteClientObj.siteId != 0
      && this.projectSiteClientObj.serialNumber!="" && this.projectSiteClientObj.warrantyStartDate!="") {
      this.assetservice.GetAssetById(this.projectSiteClientObj.assetId).subscribe(
        res => {
          this.projectSiteClientObj.assetName = res.assetName
          this.SuppliersService.GetSupplierById(this.projectSiteClientObj.supplierId).subscribe(
            res2 => {
              this.projectSiteClientObj.supplierName = res2.supplierName
              this.SiteService.GetSiteById(this.SiteId).subscribe(
                res3 => {
                  this.projectSiteClientObj.siteName = res3.sitename
                  this.listProjectSiteAssetClients.push(this.projectSiteClientObj)
                  console.log("IN LIST OBJ",this.projectSiteClientObj)
                  this.projectSiteClientObj = {
                    id: 0,
                    clients: [], ProjectId: 0,
                    days: 0, siteId: this.projectSiteClientObj.siteId, siteName: '', supplierName: '', ProjectName: '', ProjectSiteId: 0, assetId: 0, assetName: '',
                    serialNumber: '', supplierId: 0, warrantyPeriod: 0, warrantyStartDate: ""
                  }
                }
              )
            }
          )
        }
      )
      this.saveSiteAssetToDB();
    }
    else
  {
     // this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz Complete Data' });
      if(this.translate.currentLang=='English')
          {
            this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky:false, detail: 'Plz Complete Data' });
          }
          else
          {
            this.messageService.add({ key: 'tr', severity: 'error', summary: 'انتبه ', sticky:false, detail: 'من فضلك ادخل البيانات كامله ' });

          }
    }

  }
  saveSiteAssetToDB() {
    console.log("obj in DB",this.projectSiteClientObj);
    console.log("obj in basic",this.ProjectSiteAssetObj);
    this.ProjectSiteAssetObj.assetId = this.projectSiteClientObj.assetId
    this.ProjectSiteAssetObj.days = this.projectSiteClientObj.days
    this.ProjectSiteAssetObj.serialNumber = this.projectSiteClientObj.serialNumber
    this.ProjectSiteAssetObj.supplierId = this.projectSiteClientObj.supplierId
    this.ProjectSiteAssetObj.warrantyPeriod = this.projectSiteClientObj.warrantyPeriod
    this.ProjectSiteAssetObj.warrantyStartDate = this.projectSiteClientObj.warrantyStartDate
    this.ProjectSiteAssetObj.ProjectSiteId = this.projectSiteId
    this.ProjectSiteAssetService.insertProjectSiteAsset(this.ProjectSiteAssetObj).subscribe(
      res => {
        //  this.SiteClientsService.insertSiteClient(this.SiteClientsObj).subscribe(
       // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record Added' });
       if(this.translate.currentLang=='English')
       {
      this.messageService.add({severity:'success', summary:'Success', detail:'Record Added'});
       }
     else
     {
     this.messageService.add({ severity:'success', summary: 'نجاح', sticky: false, detail: 'تمت الاضافة' });
     }
     this.NewDialogbool=false;
      }
    )
  }
  getNotificattionEditClient($event) {
    console.log("notify", $event.value.length)
    if ($event.value.length != 0) {
      this.isshowBtn = true
    }
  }
  UpdateClient() {
    this.SiteClientsObj.projectSiteId = this.projectSiteId
    this.SiteClientsObj.clients = this.lstSelectedClients
    console.log("this.SiteClientsObj", this.SiteClientsObj)
    this.SiteClientsService.UpdateByProjectId(this.SiteClientsObj.projectSiteId, this.SiteClientsObj.clients).subscribe(

      //  this.SiteClientsService.insertSiteClient(this.SiteClientsObj).subscribe(
      res1 => {
        // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record Added' });
        if(this.translate.currentLang=='English')
        {
       this.messageService.add({severity:'success', summary:'Success', detail:'Record Added'});
        }
       else
       {
      this.messageService.add({ severity:'success', summary: 'نجاح', sticky: false, detail: 'تمت الاضافة' });
       }
        this.isshowBtn = false
        this.ProjectSiteAssetService.GetAllProjectSiteAssetBySiteId(this.SiteId, this.id).subscribe(
          res => {
            this.listProjectSiteAssetClients = res
            console.log("listProjectSiteAssetClients", this.listProjectSiteAssetClients);
          }
        )
      }
    )
  }
  getSiteIdEvent($event) {
    console.log("$event", $event.itemValue)
    this.selectedsite = $event.itemValue
    this.ProjectSiteAssetService.GetAllProjectSiteAssetBySiteId(this.selectedsite.id, this.id).subscribe(
      res => {
        this.listProjectSiteAssetClients = res
        this.SiteClientsService.GetAllAssignedClients(this.selectedsite.id, this.id).subscribe(
          res2 => {
            this.lstSelectedClients = res2
            console.log("count", this.listProjectSiteAssetClients.length, "", this.lstSelectedClients.length)
            if (this.listProjectSiteAssetClients.length != 0 || this.lstSelectedClients.length != 0) {
               if(this.translate.currentLang=='English')
               { 
                this.messageService.add({ severity: 'warn', summary: 'Attention', detail: `This site ${this.selectedsite.sitename} has data Plz remove data first like assets or clients`, sticky: false });
               }
               else
               {
                this.messageService.add({ severity: 'warn', summary: 'انتبه', detail: `هذا الموقع عليه بيانات من فضلك امسح البيانات `, sticky: false });
               }
             
              this.selectedSitesColumns = this.OldselectedSitesColumns
            }
          },
          err => console.log(err)
        )
      }
    )
  }
  edit() {
    this.messageService.clear();

    if (this.projectObj.projectName != ""&& this.projectObj.projectName.length>=3&& this.projectObj.projectCode != "" &&this.projectObj.projectCode.length>=2&&
      this.projectObj.projectTypeId != 0 && this.projectObj.organizationId != 0
       && this.projectObj.employeeId != 0 && this.selectedSitesColumns.length!=0)
      {
    this.projectService.updateProject(this.projectid, this.projectObj).subscribe(res => {
      this.ProjectSitesObj.projectId = this.id
      this.ProjectSitesObj.lstSites = this.selectedSitesColumns
      this.ProjectSitesService.updateProjectSite(this.ProjectSitesObj.projectId, this.ProjectSitesObj.lstSites).subscribe(
        res => {
         // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Updated Successfully' });
         if(this.translate.currentLang=='English')
         {
        this.messageService.add({   severity:'success', summary:'Success', detail: 'Updated Successfully ' });
         }
       else
       {
       this.messageService.add({ severity:'success', summary: 'نجاح', sticky: false, detail: 'تم التعديل بنجاح ' });
       }
        }
      )
    }), err => console.log(err)
  }
  else 
  {
    this.IsSaveProject = false
    this.activeIndex = this.activeIndex
    //this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz Complete Data' });
    if(this.translate.currentLang=='English')
          {
            this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky:false, detail: 'Plz Complete Data' });
          }
          else
          {
            this.messageService.add({ key: 'tr', severity: 'error', summary: 'انتبه ', sticky:false, detail:'من فضلك ادخل البيانات كامله ' });

          }
  }
  }

  Savetolist_Stackholders() {
    this.messageService.clear();
    if (this.stackholderInLst.stackeholderName.trim().length>=3 && this.isPhone() && this.stackholderInLst.rank != "") {
      this.stackholderInLst.mobile = String(this.stackholderInLst.mobile);
      this.lstOfStackholder.push(this.stackholderInLst);
      this.stackholderInLst = {
        description: '', id: 0, mobile: '', projectId:this.id, rank: '', stackeholderName: ''
      }
    }
    else {
     // this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz Complete Data' });
     if(this.translate.currentLang=='English')
          {
            this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky:false, detail: 'Plz Complete Data' });
          }
          else
          {
            this.messageService.add({ key: 'tr', severity: 'error', summary: 'انتبه ', sticky:false, detail: 'من فضلك ادخل البيانات كامله ' });

          }

    }
  }
  /*
   this.messageService.clear();
    if (this.stackholderInLst.stackeholderName.trim().length>=3 && this.isPhone() && this.stackholderInLst.rank != "") {
      this.stackholderInLst.mobile = String(this.stackholderInLst.mobile);
      this.lstOfStackholder.push(this.stackholderInLst);
      this.stackholderInLst = {
        description: '', id: 0, mobile: '', projectId: this.projectID, rank: '', stackeholderName: ''
      }
    }
    else {
      this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz Complete Data' });

    }
  */
  SaveToDB_Stackholders() {
    this.stackholderService.insertListOfStackholders(this.lstOfStackholder).subscribe(e => {
      this.lstOfStackholder = []
      this.stackholderService.GetAllStackholdersByProjectID(this.id).subscribe(e => {
        this.stackholders = e
        this.projectObj.listOfStackholders = e
      })
    })
  }
  Savetolist_Milestones() {
    this.messageService.clear();
    if (this.milestonInLst.title.trim().length>=3 && this.milestonInLst.startDate != "" && this.milestonInLst.endDate != "") {
    this.milestonInLst.projectId = Number(this.stackholderInLst.projectId)
    this.lstOfMilestones.push(this.milestonInLst);
    this.milestonInLst = {
      description: '', id: 0, endDate: "", projectId: 0, startDate: "", title: ''
    }
  }
  else
  {
    //this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz Complete Data' });
    if(this.translate.currentLang=='English')
          {
            this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky:false, detail: 'Plz Complete Data' });
          }
          else
          {
            this.messageService.add({ key: 'tr', severity: 'error', summary: 'انتبه ', sticky:false, detail: 'من فضلك ادخل البيانات كامله ' });

          }
  }
  }
  SaveToDB_Milestones() {

    this.milestoneservice.insertListOfMilestoness(this.lstOfMilestones).subscribe(e => {
      this.lstOfMilestones = []
      this.milestoneservice.GetAllMileStonesByProjectID(this.id).subscribe(m => {
        this.projectObj.listOfmilestones = m
      }), err => console.log(err)
    })
  }

  delStakeHolders(id: number) {
    this.stackholderService.deletestakeholder(id).subscribe(res => {
      this.stackholderService.GetAllStackholdersByProjectID(this.id).subscribe(e => {
        this.stackholders = e
        this.projectObj.listOfStackholders = e
      })
    })
  }
  delMile(id: number) {
    this.milestoneservice.deletemilestone(id).subscribe(res => {
      // this.ngOnInit()
      this.milestoneservice.GetAllMileStonesByProjectID(this.id).subscribe(m => {
        this.projectObj.listOfmilestones = m
      }), err => console.log(err)
    })
  }

  delteam(id: number) {
    this.projectteamservice.deleteteam(id).subscribe(res => {
      this.projectteamservice.GetAllTeamsByProjectID(this.id).subscribe(t => {
        this.teams = t;
        this.project1.listofprojectteam = this.teams;
        this.projectObj.listofprojectteam = t
      }), err => console.log(err)

    })
  }
  delDocument(id: number) {
    this.projectdocumentsservice.deletedocument(id).subscribe(res => {
      this.ngOnInit()
    })
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;

  }
  showModalDialog() {
    this.displayModal = true;
  }

  showBasicDialog() {
    this.displayBasic = true;
  }
  showmileDialog() {
    this.displayMile = true;
  }
  showteamDialog() {
    this.displayteam = true
  }
  showdocDialog() {
    this.displaydoc = true
  }
  Savetolist_Teams() {
    
    this.messageService.clear();
    if (this.team.Name.trim().length>=1&& this.ProjectTeam.projectPositionId != 0 && this.ProjectTeam.employeeId != 0
      && this.ProjectTeam.departmentId != 0) {

    this.ProjectTeam.projectId = Number(this.id)
    this.ProjectTeam.departmentId = Number(this.ProjectTeam.departmentId)
    this.ProjectTeam.employeeId = Number(this.ProjectTeam.employeeId)
    this.ProjectTeam.projectPositionId = Number(this.ProjectTeam.projectPositionId)
    this.ProjectTeam.departmentName = this.department.name
    this.employeeService.getEmpByID(this.ProjectTeam.employeeId).subscribe(e => {
      this.ProjectTeam.employeeName = e.employeeName
      this.positionService.getPositionByID(this.ProjectTeam.projectPositionId).subscribe(e => {
        this.ProjectTeam.projectPositionName = e.positionName
        this.teamname = this.team.Name;
        // this.ProjectTeam.TeamId=Number(this.team.Id);
        this.ProjectTeam.teamId = 29;
        if(this.lstOfProjectTeams.length>0)
        {
          console.log("length",this.lstOfProjectTeams.length)
          this.isFound=false;
          this.lstOfProjectTeams.forEach(element => {
            console.log("element",element)
            if(element.employeeId===this.ProjectTeam.employeeId)
            {
              console.log("found",this.isFound)
              this.isFound=true;
              this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Employee is found' });
            }
          });
          if(!this.isFound)
          {
            console.log("not found",this.isFound)
            if(this.ProjectTeam.projectPositionName==='TL')
            {
              var posIndex=this.lstOfprojectPosition.findIndex(p=>this.ProjectTeam.projectPositionName==p.positionName)
              this.lstOfprojectPosition.splice(posIndex,1)
            }
            this.lstOfProjectTeams.push(this.ProjectTeam);
            this.isFound=false;
            this.ProjectTeam = {
              teamName: '',
              teamId: 0,
              departmentId: 0, id: 0, departmentName: '', employeeName: '', projectPositionId: 0, projectPositionName: '', employeeId: 0
              , projectId: this.id, projectName: ''
            }
          }
        }
        else
        {
          console.log("push")
          if(this.ProjectTeam.projectPositionName==='TL')
          {
            var posIndex=this.lstOfprojectPosition.findIndex(p=>this.ProjectTeam.projectPositionName==p.positionName)
            this.lstOfprojectPosition.splice(posIndex,1)
          }
          this.lstOfProjectTeams.push(this.ProjectTeam);
          this.ProjectTeam = {
            teamName: '',
            teamId: 0,
            departmentId: 0, id: 0, departmentName: '', employeeName: '', projectPositionId: 0, projectPositionName: '', employeeId: 0
            , projectId: this.id, projectName: ''
          }
      //   for(let i=0;i<this.lstOfProjectTeams.length;i++)
      //   {
      //     if(this.lstOfProjectTeams[i].projectPositionId==1)
      //     {
      //        this.CountTeamLeader=true;
      //     }
      //     if(this.lstOfProjectTeams[i].projectPositionId==3)
      //     {
      //       this.CountProjectManger=true;
      //     }
      //   }
      //   if(this.CountTeamLeader &&this.ProjectTeam.projectPositionId==1)
      //   {
      //     this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky:false, detail: 'team must have only one team leader' });
      //     return;       
      //   }
      //  if (this.CountProjectManger &&this.ProjectTeam.projectPositionId==3)
      //   {
      //     this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky:false, detail: 'team must have only one Project manager' });
      //     return;       
      //   }
      
      //   this.lstOfProjectTeams.push(this.ProjectTeam);
        
      //  // console.log("lstOfProjectTeams",this.lstOfProjectTeams.length);
      
      //   this.ProjectTeam = {
      //     teamName: '',
      //     teamId: 0,
      //     departmentId: 0, id: 0, departmentName: '', employeeName: '', projectPositionId: 0, projectPositionName: '', employeeId: 0
      //     , projectId: this.id, projectName: ''
      //   }
        }
      })
    })
  }
  else
  {
   // this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz Complete Data' });
   if(this.translate.currentLang=='English')
          {
            this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky:false, detail: 'Plz Complete Data' });
          }
          else
          {
            this.messageService.add({ key: 'tr', severity: 'error', summary: 'انتبه ', sticky:false, detail:'من فضلك ادخل البيانات كامله ' }  );

          }
  }
  }
  Idteam: any
   
   TeamLead:boolean=false;
  SaveToDB_ProjectTeams() {
    //var addTeamObj = new CreateTeamVM();
    this.addTeamObj.name = this.team.Name;
    console.log("addTeamObj.projectTeams",this.addTeamObj.projectTeams)
    this.addTeamObj.projectTeams = this.lstOfProjectTeams;
    // //this.lstOfProjectTeams=[];
    // this.projectService.addTeam(this.addTeamObj).subscribe(e => {
    //   this.Idteam = e;
      this.projectteamservice.GetAllTeamsByProjectID(this.id).subscribe(
        res => {
          this.projectObj.listofprojectteam = res
        }
      )
      this.projectPositionService.GetAllProjectPosition().subscribe(e => {
        this.lstOfprojectPosition = e
      })
    // })
   console.log("lstOfProjectTeams after save",this.lstOfProjectTeams)
    this.TeamLead=false;
    this.CountTeamLeader=false;
    this.CountProjectManger=false;
    this.messageService.clear();
    var addTeamObj = new CreateTeamVM();
    addTeamObj.name = this.team.Name;
    addTeamObj.projectTeams = this.lstOfProjectTeams;
    for(let index=0;index<this.lstOfProjectTeams.length;index++)
    {
      if(this.lstOfProjectTeams[index].projectPositionId==1)
      {
        this.TeamLead=true;
        break;

      }
    }

    if(this.TeamLead)
    {
     
     this.projectService.addTeam(addTeamObj).subscribe(e => {
        this.Idteam = e;
        this.projectteamservice.GetAllTeamsByProjectID(this.id).subscribe(
          res => {
            this.projectObj.listofprojectteam = res
          }
        )
      });
      this.displayteam =false
      this.lstOfProjectTeams.length=0;
  
      this.team.Name="";
      this.teamname="";

      if(this.translate.currentLang=='English')
      {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Team Added' });
      }
      else
      {
        this.messageService.add({ severity: 'success', summary: 'نجاح ', detail: 'تم اضافة الفريق بنجاح ' });
      }
    
    }
    else
    {
     this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky:false, detail: 'team must have team leader ' });
    }
   


  }
  OnChangeEmpID(i: any) {
    this.departmentService.getDepartmentByEmpID(this.ProjectTeam.employeeId).subscribe(e => {
      this.department = e
    }
      , error => {
        console.log(error);
      });
  }
  Savedoctolist() {
    // this.lstoddocproj.push(this.docproject);
    // this.docproject = {
    //   Description: '', documentName: '', id: 0, documentFile: '', projectId: this.id
    // };
       this.messageService.clear();
    if (this.docproject.documentName.trim().length>=1 && this.docproject.documentFile != "") {
      this.lstoddocproj.push(this.docproject);
      this.docproject = {
        Description: '', documentName: '', id: 0, documentFile: '', projectId: this.id
      };
      console.log(this.lstoddocproj);
    }
    else {
    //  this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz Complete Data' });
    if(this.translate.currentLang=='English')
          {
            this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky:false, detail: 'Plz Complete Data' });
          }
          else
          {
            this.messageService.add({ key: 'tr', severity: 'error', summary: 'انتبه ', sticky:false, detail:'من فضلك ادخل البيانات كامله ' }  );

          }

    }
  }
  public message: string;
  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.docproject.documentFile = fileToUpload.name;

    this.httpClient.post(environment.uploadFile, formData)
      .subscribe(res => {
       // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Uploaded Successfully' });
       if(this.translate.currentLang=='English')
         {
        this.messageService.add({   severity:'success', summary:'Success', detail: 'Uploaded Successfully' });
         }
       else
       {
       this.messageService.add({ severity:'success', summary: 'نجاح', sticky: false, detail: 'تم الرفع  بنجاح ' });
       }

        // alert('Uploaded Successfully.');



      });
  }
  SaveDocuentToDB() {

    this.projectdocumentsservice.postProjectDocumentByProjectID(this.lstoddocproj).subscribe(e => {
      this.projectdocumentsservice.GetAllDocumentsByProjectID(this.id).subscribe(d => {
        this.documents = d;
        this.project1.listOfdocuments = this.documents;
        this.projectObj.listOfdocuments = d;
      }), err => console.log(err)
    })
  }
  downloadFile(fileName) {
    var filePath = `${environment.Domain}wwwroot/documentFiles/${fileName}`;


    window.open(filePath);
    // this.projectdocumentsservice.downloadInFile(fileName).subscribe(file => {
    //   var dwnldFile = filePath  + fileName;
    //   if (fileName != "" || fileName != null)
    //     window.open(dwnldFile);
    // })
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
  isPhone():boolean
  {
    var serchfind:boolean;
    var regexp;
    regexp =/^01[0-2,5]{1}[0-9]{8}$/;
    serchfind =(regexp.test(this.stackholderInLst.mobile));

    console.log(serchfind)
    return serchfind
  }




}
