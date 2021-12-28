import { Component, OnInit } from '@angular/core';
import { observable } from 'rxjs';
import { HttpClient, HttpEventType } from '@angular/common/http';

import { employee } from 'src/Shared/Models/employee';
import { client } from 'src/Shared/Models/client';
import { organization } from 'src/Shared/Models/organization';
import { projectType } from 'src/Shared/Models/projectType';
import { OrganizationService } from 'src/Shared/Services/organization.service';
import { ClientService } from 'src/Shared/Services/client.service';
import { EmployeeService } from 'src/Shared/Services/employee.service';
import { MenuItem, MessageService } from 'primeng/api';
import { ProjectService } from 'src/Shared/Services/project.service';
import { Router } from '@angular/router';
import { ProjectTypeService } from 'src/Shared/Services/project-type.service';
import { StackholdersService } from 'src/Shared/Services/stackholders.service';
import { stackholder } from 'src/Shared/Models/stackeholder';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ProjectDocumentService } from 'src/Shared/Services/project-document.service';

import { mileStone } from 'src/Shared/Models/mileStone';
import { MilestoneService } from "../../../../Shared/Services/milestone.service";
import { projectPosition } from "../../../../Shared/Models/projectPosition";
import { ProjectPositionService } from "../../../../Shared/Services/project-position.service";
import { projectTeam } from "../../../../Shared/Models/projectTeam";
import { CreateTeamVM, Team } from "../../../../Shared/Models/team";
import { ProjectTeamService } from "../../../../Shared/Services/project-team.service";
import { DepartmentService } from "../../../../Shared/Services/department.service";
import { department } from "../../../../Shared/Models/department";
import { ProjectDocuments } from 'src/Shared/Models/ProjectDocuments';
import { environment } from 'src/environments/environment';
import { analyzeAndValidateNgModules, flatten } from '@angular/compiler';
import { project } from 'src/Shared/Models/project';
import { SitesService } from 'src/Shared/Services/sites.service';
import { Sites } from 'src/Shared/Models/Sites';
import { asset } from 'src/Shared/Models/asset';
import { AssetService } from 'src/Shared/Services/asset.service';
import { Suppliers } from 'src/Shared/Models/Suppliers';
import { SuppliersService } from 'src/Shared/Services/suppliers.service';
import { Brand } from 'src/Shared/Models/Brand';
import { BrandService } from 'src/Shared/Services/brand.service';
import { Origins } from 'src/Shared/Models/Origins';
import { OriginsService } from 'src/Shared/Services/origins.service';
import { DueDateCategory } from 'src/Shared/Models/DueDateCategory';
import { DueDateCategoryService } from 'src/Shared/Services/due-date-category.service';
import { ProjectSitesService } from 'src/Shared/Services/project-sites.service';
import { ProjectSites } from 'src/Shared/Models/ProjectSites';
import { SiteClients } from 'src/Shared/Models/SiteClients';
import { ListProjectSiteAssetClients } from 'src/Shared/Models/ListProjectSiteAssetClients';
import { ProjectSiteClient } from 'src/Shared/ProjectSiteClient';
import { number } from 'ngx-custom-validators/src/app/number/validator';
import { ProjectSiteAsset } from 'src/Shared/Models/ProjectSiteAsset';
import { ProjectSiteAssetService } from 'src/Shared/Services/project-site-asset.service';
import { element } from 'protractor';
import { SiteClientsService } from 'src/Shared/Services/site-clients.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  projectObj: project;
  lstClients: client[];
  lstOrganizations: organization[];
  OrganizationObj: organization;
  stackholderInLst: stackholder
  lstOfStackholder: stackholder[]
  lstOfProjectTeams: projectTeam[]

  ProjectTeam: projectTeam
  team: Team
  departments: department[]
  department: department
  lstOfprojectPosition: projectPosition[]
  projectPosition: projectPosition
  milestonInLst: mileStone
  lstOfMilestones: mileStone[]

  lstEmployees: employee[];
  employeeObj: employee;
  lstProjectTypes: projectType[];
  ProjectTypeObj: projectType;
  projectID: number
  docproject: ProjectDocuments
  lstoddocproj: ProjectDocuments[]
  diffDays: number;
  items: MenuItem[];
  activeIndex: number = 0;
  lstSites: Sites[]
  lstassets: asset[]
  lstSuppliers: Suppliers[];
  lstBrand: Brand[];
  lstOrigins: Origins[];
  lstDueDateCategory: DueDateCategory[];
  selectedSitesColumns: Sites[]
  ProjectSitesObj: ProjectSites
  lstAllSites: Sites[];
  IsSaveProject: boolean = false
  lstSelectedSiteClients: SiteClients[]
  SiteClientsObj: SiteClients
  listProjectSiteAssetClients: ListProjectSiteAssetClients[]
  projectSiteClientObj: ListProjectSiteAssetClients
  siteObj: Sites
  lstSelectedClients: client[]
  SiteId: number;
  ProjectSiteAssetObj: ProjectSiteAsset
  NewDialogbool: boolean;
  projectSiteId: number;
  IsDisabled: boolean = false
  minDate: Date;
  plannedStartdate: Date;
  ActualStartDate: Date;
  ProjectData: any;
  selectedlang: string = '';
  ProjectdataFormGroup: FormGroup;
  AssetFormGroup: FormGroup;
  PartenerFormGroup: FormGroup;
  MileStoneFormGroup: FormGroup;
  TeamFormGroup: FormGroup;
  DocumentsFormGroup: FormGroup;
  isLinear = false;
  disabledButton: boolean;
  serialNumber: any;
  milestonStartDate: Date;
  constructor(
    private httpClient: HttpClient,
    private projectdocumentService: ProjectDocumentService,
    private projectService: ProjectService, private organizationService: OrganizationService,
    private clientService: ClientService, private projectTeamService: ProjectTeamService,
    private departmentService: DepartmentService, private positionService: ProjectPositionService,
    private projectPositionService: ProjectPositionService, private milestoneService: MilestoneService,
    private stackholderService: StackholdersService, private employeeService: EmployeeService,
    private projectTypeService: ProjectTypeService, private messageService: MessageService,
    private SiteService: SitesService, private assetservice: AssetService, private SuppliersService: SuppliersService,
    private BrandService: BrandService, private OriginsService: OriginsService, private DueDateCategoryService: DueDateCategoryService,
    private ProjectSitesService: ProjectSitesService, private ProjectSiteAssetService: ProjectSiteAssetService,
    private SiteClientsService: SiteClientsService, private translate: TranslateService, private _formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.ProjectData = localStorage.getItem("ProjectData")
    console.log("ProjectData", this.ProjectData)
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
    this.minDate = new Date();
    this.disabledButton = false
    this.IsSaveProject = false
    this.lstSelectedClients = []
    this.listProjectSiteAssetClients = []
    this.lstDueDateCategory = []
    this.lstAllSites = []
    this.lstOrigins = []
    this.lstBrand = []
    this.lstSites = []
    this.selectedSitesColumns = []
    this.lstassets = []
    this.lstSuppliers = []
    this.lstOfStackholder = []
    this.lstOfMilestones = []
    this.lstoddocproj = []
    this.lstOfProjectTeams = []
    this.lstOfprojectPosition = []
    this.ProjectSitesObj = {
      id: 0, projectId: 0, projectName: '', siteId: 0, siteName: '', lstSites: []
    }
    this.SiteClientsObj = {
      id: 0, siteId: 0, siteName: '', clients: [], projectSiteId: 0
    }
    this.siteObj = {
      id: 0, sitename: ''
    }
    this.ProjectSiteAssetObj = {
      id: 0, days: 0, supplierName: '', ProjectSiteId: 0, assetId: 0, assetName: '',
      serialNumber: '', supplierId: 0, warrantyPeriod: 0, warrantyStartDate: ""
    }
    this.projectSiteClientObj = {id:0,
      clients: [], ProjectId: 0,
      days: 0, siteId: 0, siteName: '', supplierName: '', ProjectName: '', ProjectSiteId: 0, assetId: 0, assetName: '',
      serialNumber: '', supplierId: 0, warrantyPeriod: 0, warrantyStartDate: ""
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
    this.stackholderInLst = {
      description: '', id: 0, mobile: '', projectId: 0, rank: '', stackeholderName: ''
    }
    this.milestonInLst = {
      description: '', id: 0, endDate: "", projectId: 0, startDate: "", title: ''
    }
    this.projectPosition =
    {
      positionName: '', id: 0
    }
    this.department = {
      id: 0, name: ''
    }
    this.ProjectTeam = {
      teamName: '',
      teamId: 0,
      departmentId: 0, id: 0, projectName: '', departmentName: '',
      employeeId: 0, employeeName: '',
      projectId: this.projectID, projectPositionId: 0, projectPositionName: ''
    }
    this.team = {
      Id: 0, Name: ''
    }
    this.assetservice.GetAllAssets().subscribe(
      data => {
        this.lstassets = data
      },
      err => console.log(err)
    )
    this.SiteService.GetAllSites().subscribe(
      res => {
        this.lstAllSites = res
      }
    )
    this.organizationService.GetAllOrganizations().subscribe(
      res => { this.lstOrganizations = res },
      err => console.log(err)
    )
    this.employeeService.GetAllEmployees().subscribe(
      res => {
        this.lstEmployees = res
      },
      err => console.log(err)
    )
    this.projectTypeService.GetAllProjectTypes().subscribe(
      data => { this.lstProjectTypes = data },
      err => console.log(err)
    )
    this.projectTeamService.GetAllProjectTeams().subscribe(e => {
      // this.lstOfProjectTeams = e
      console.log("lstof teams", this.lstOfProjectTeams)
    })
    this.projectPositionService.GetAllProjectPosition().subscribe(e => {
      this.lstOfprojectPosition = e
      console.log("lstof position", this.lstOfprojectPosition)
    })
    this.SuppliersService.GetAllSuppliers().subscribe(
      res => { this.lstSuppliers = res },
      err => console.log(err)
    )
    this.BrandService.GetAllBrands().subscribe(
      res => { this.lstBrand = res },
      err => console.log(err)
    )
    this.OriginsService.GetAllOrigins().subscribe(
      res => { this.lstOrigins = res },
      err => console.log(err)
    )
    this.DueDateCategoryService.GetAllDueDateCategories().subscribe(
      res => { this.lstDueDateCategory = res },
      err => console.log(err)
    )
  }
  onChangeSerial(event) {
    console.log("serialNumber",event.target.value)
    this.serialNumber = event.target.value
    this.ProjectSiteAssetService.GetProjectSiteAssetBySerialNumber(this.serialNumber).subscribe(
      res=>{
        this.ProjectSiteAssetObj=res
        if(this.ProjectSiteAssetObj!=null)
        {
          this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'this serial already exist , plz write another' });
          this.projectSiteClientObj.serialNumber=""
        }
      }
    )

  }
  CloseStipper() {
    this.router.navigate(['home/tabs']);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Congratulations all data stored' });
  }
  GetmilestonStartDate($event) {
    this.milestonStartDate = $event
    console.log("milestonStartDate",this.milestonStartDate)
    this.milestonInLst.startDate = $event
  }
  GetplanndedStartDate($event) {
    this.plannedStartdate = $event
    this.projectObj.actualStartDate = $event
  }
  GetActualStartDate($event) {
    this.ActualStartDate = $event
    this.projectObj.actualEndDate = $event
  }
  GetDifferentDate($event) {
    var date1: any = new Date(this.plannedStartdate);
    var date2: any = new Date($event);
    this.diffDays = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
  }
  AddProject() {
    this.IsSaveProject = true
    if (this.projectObj.projectName != ""&& this.projectObj.projectName.length>=3&& this.projectObj.projectCode != "" &&this.projectObj.projectCode.length>=2&&
      this.projectObj.projectTypeId != 0 && this.projectObj.organizationId != 0
       && this.projectObj.employeeId != 0 && this.selectedSitesColumns.length!=0) {
      var date1: any = new Date(this.projectObj.planndedStartDate);
      var date2: any = new Date(this.projectObj.planndedEndDate);
      this.diffDays = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
      console.log("diffDays", this.diffDays)
      this.projectObj.projectPeriod = this.diffDays
      console.log("Before", this.projectObj)
      this.projectService.AddProject(this.projectObj).subscribe(
        res => {
          this.projectID = Number(res)
          this.stackholderInLst.projectId = this.projectID
          this.docproject.projectId = this.projectID
          this.ProjectSitesObj.projectId = Number(res)
          console.log("projectID1", this.projectID)
          console.log("projectID2", res)
          console.log("selectedSitesColumns", this.selectedSitesColumns)
          this.ProjectSitesObj.lstSites = this.selectedSitesColumns
          this.ProjectSitesService.insertProjectSite(this.ProjectSitesObj).subscribe(
            result => {
              this.ProjectSitesService.GetAllProjectSitesByProjectId(this.projectID).subscribe(
                sites => {
                  this.lstSites = sites
                  console.log("lstSites", this.lstSites)
                  this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record Added' });
                  this.activeIndex = this.activeIndex + 1
                  this.IsDisabled = true
                 this.IsSaveProject = true
                 this.disabledButton = true
                }
              )
            }
          )
        },
        err => console.log(err),
      );
    }
    else {
      this.IsSaveProject = false
      this.activeIndex = this.activeIndex
      this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz Complete Data' });
    }
  }
  Finish() {
    this.router.navigate(['home/tabs']);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Congratulations all data stored' });
  }

  Savetolist_Stackholders() {
    if (this.stackholderInLst.stackeholderName != "" && this.stackholderInLst.mobile != "" && this.stackholderInLst.rank != "") {
      this.stackholderInLst.mobile = String(this.stackholderInLst.mobile);
      this.lstOfStackholder.push(this.stackholderInLst);
      this.stackholderInLst = {
        description: '', id: 0, mobile: '', projectId: this.projectID, rank: '', stackeholderName: ''
      }
    }
    else {
      this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz Complete Data' });

    }

  }

  SaveToDB_Stackholders() {
    this.stackholderService.insertListOfStackholders(this.lstOfStackholder).subscribe(e => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Partener Added' });
    })
  }

  SaveToDB_Milestones() {
    this.milestoneService.insertListOfMilestoness(this.lstOfMilestones).subscribe(e => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Milestone Added' });

    })
  }
  Savetolist_Milestones() {
    if (this.milestonInLst.title != "" && this.milestonInLst.startDate != "" && this.milestonInLst.endDate != "") {
      this.milestonInLst.projectId = this.projectID;
      console.log("this.projectID", this.projectID)
      this.lstOfMilestones.push(this.milestonInLst);
      this.milestonInLst = {
        description: '', id: 0, endDate: "", projectId: 0, startDate: "", title: ''
      }
    }
    else {
      this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz Complete Data' });

    }

  }

  OnChangeEmpID(i: any) {
    console.log(i)
    console.log(this.ProjectTeam.employeeId)
    this.departmentService.getDepartmentByEmpID(this.ProjectTeam.employeeId).subscribe(e => {
      this.department = e
      console.log(this.department)
    }
      , error => {
        console.log(error);
      });
  }
  teamname: any
  saveTeam() {

  }
  tasneem: number;
  SaveToDB_ProjectTeams() {
    var addTeamObj = new CreateTeamVM();
    addTeamObj.name = this.team.Name;
    addTeamObj.projectTeams = this.lstOfProjectTeams;

    this.projectService.addTeam(addTeamObj).subscribe(e => {
      this.Idteam = e;
      this.tasneem = this.Idteam;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Team Added' });

    })


  }
  Savetolist_Teams() {
    if (this.team.Name != "" && this.ProjectTeam.projectPositionId != 0 && this.ProjectTeam.employeeId != 0
      && this.ProjectTeam.departmentId != 0) {
      this.ProjectTeam.projectId = this.projectID
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
          this.lstOfProjectTeams.push(this.ProjectTeam);
          this.ProjectTeam = {
            teamName: '',
            teamId: 0,
            departmentId: 0, id: 0, departmentName: '', employeeName: '', projectPositionId: 0, projectPositionName: '', employeeId: 0
            , projectId: this.projectID, projectName: ''
          }
        })
      })
    }
    else {
      this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz Complete Data' });

    }
    // console.log("projteam before show", this.ProjectTeam)
    // console.log("lst of teams", this.lstOfProjectTeams)
  }

  Idteam: any
  teamObj: any;

  clickkk() {
    console.log("clickkkkkkkk")
  }
  AddAssets() {
    if (this.projectSiteClientObj.siteId != 0) {
      this.NewDialogbool = true
    }
    else {
      this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz select Site' });
    }
  }
  saveSiteAssettoList() {
    for (let index = 0; index < this.projectSiteClientObj.clients.length; index++) {
      const element = this.projectSiteClientObj.clients[index];
      console.log("element", element)
      this.clientService.GetclientByID(Number(element)).subscribe(
        res4 => {
          console.log("res4", res4)
          this.projectSiteClientObj.clients.push(res4)

        }
      )
    }
    if (this.projectSiteClientObj.assetId != 0 && this.projectSiteClientObj.supplierId != 0 && this.projectSiteClientObj.siteId != 0) {
      this.assetservice.GetAssetById(this.projectSiteClientObj.assetId).subscribe(
        res => {
          this.projectSiteClientObj.assetName = res.assetName
          this.SuppliersService.GetSupplierById(this.projectSiteClientObj.supplierId).subscribe(
            res2 => {
              this.projectSiteClientObj.supplierName = res2.supplierName
              this.SiteService.GetSiteById(this.projectSiteClientObj.siteId).subscribe(
                res3 => {
                  this.projectSiteClientObj.siteName = res3.sitename
                  this.listProjectSiteAssetClients.push(this.projectSiteClientObj)
                  this.projectSiteClientObj = {id:0,
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
    else {
      this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz Complete Data' });
    }

  }
  getProjectSiteIdEvent($event) {
    this.SiteId = $event.value
    //this.projectID
    this.ProjectSitesService.GetProjectSiteByProjectIdAndSiteId(this.projectID, this.SiteId).subscribe(
      res => {
        this.projectSiteId = res.id
      }
    )
    this.ProjectSiteAssetService.GetAllProjectSiteAssetBySiteId(this.SiteId, this.projectID).subscribe(
      res => {
        this.listProjectSiteAssetClients = res
        console.log("res", res)
      }
    )
    this.SiteClientsService.GetAllUnassignedClients(this.SiteId, this.projectID).subscribe(
      //this.clientService.GetAllClients().subscribe(
      res => { this.lstClients = res },
      err => console.log(err)
    )
  }
  saveSiteAssetToDB() {
    this.ProjectSiteAssetObj.assetId = this.projectSiteClientObj.assetId
    this.ProjectSiteAssetObj.days = this.projectSiteClientObj.days
    this.ProjectSiteAssetObj.serialNumber = this.projectSiteClientObj.serialNumber
    this.ProjectSiteAssetObj.supplierId = this.projectSiteClientObj.supplierId
    this.ProjectSiteAssetObj.warrantyPeriod = this.projectSiteClientObj.warrantyPeriod
    this.ProjectSiteAssetObj.warrantyStartDate = this.projectSiteClientObj.warrantyStartDate
    this.ProjectSiteAssetObj.ProjectSiteId = this.projectSiteId
    this.ProjectSiteAssetService.insertProjectSiteAsset(this.ProjectSiteAssetObj).subscribe(
      res => {
        this.SiteClientsObj.projectSiteId = this.projectSiteId
        this.SiteClientsObj.clients = this.projectSiteClientObj.clients
        console.log("this.SiteClientsObj", this.SiteClientsObj)
        if (this.SiteClientsObj.clients.length != 0) {
          this.SiteClientsService.insertSiteClient(this.SiteClientsObj).subscribe(
            res1 => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record Added' });
            }
          )
        }
        else {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record Added' });
        }
      }
    )
  }
  GetAllProjectSiteAssetBySiteId() {

  }
  Savedoctolist() {
    if (this.docproject.documentName != "" && this.docproject.documentFile != "") {
      this.lstoddocproj.push(this.docproject);
      this.docproject = {
        Description: '', documentName: '', id: 0, documentFile: '', projectId: this.projectID
      };
      console.log(this.lstoddocproj);
    }
    else {
      this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz Complete Data' });

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
    console.log(fileToUpload.name)

    this.httpClient.post(environment.uploadFile, formData)
      .subscribe(res => {
        console.log(res)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Uploaded Successfully' });
        //  alert('Uploaded Successfully.');



      });
  }
  SaveDocuentToDB() {
    this.projectdocumentService.postProjectDocumentByProjectID(this.lstoddocproj).subscribe(e => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Document Added' });
      console.log(e)
    })
  }
  PreviousStep() {
    this.activeIndex = this.activeIndex - 1
  }
  NextStep() {
    if (this.activeIndex == 0) {
      if (this.projectObj.projectName == "" && this.projectObj.projectCode == "" &&
        this.projectObj.projectTypeId == 0 && this.projectObj.organizationId == 0 && this.projectObj.employeeId == 0) {
        this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz Complete Data' });
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
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record Added' });
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
  showCustom() {
    this.messageService.add({ severity: 'custom', summary: 'Custom', detail: 'Message Content', icon: 'pi-file' });
  }
  showTopLeft() {
    this.messageService.add({ key: 'tl', severity: 'info', summary: 'Info', detail: 'Message Content' });
  }
  showTopCenter() {
    this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Warn', detail: 'Message Content' });
  }
  showBottomCenter() {
    this.messageService.add({ key: 'bc', severity: 'success', summary: 'Success', detail: 'Message Content' });
  }
  showConfirm() {
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed' });
  }
  onConfirm() {
    this.messageService.clear('c');
  }
  onReject() {
    this.messageService.clear('c');
  }
}
