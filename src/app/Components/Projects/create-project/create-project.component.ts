import { Component, OnInit, ViewChild } from '@angular/core';
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
import { ConfirmationService} from 'primeng/api';
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
import { MatStepper } from '@angular/material/stepper';
import { DatePipe } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { User } from 'src/Shared/Models/User';
import { UsersService } from 'src/Shared/Services/users.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  projectObj: project;
  lstClients: client[];
  stackholders: stackholder[];
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
  dispalyStackholderEdit:boolean
  dispalyMileEdit:boolean
  stackObj:stackholder
  MileObj:mileStone
  lstEmployees: employee[];
  employeeObj: employee;
  lstProjectTypes: projectType[];
  ProjectTypeObj: projectType;
  projectID: number
  docproject: ProjectDocuments
  lstoddocproj: ProjectDocuments[]
  diffDays: number;
  items: MenuItem[];
  users:User[];
  usersfil:User[]=[];
  emps:employee[]=[];
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
  ISfound:boolean=false;
  Namefound:boolean=false;
  displayteam:boolean;
  Codefound:boolean=false;
  warantryStartDate: string;
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
  displayMile:boolean;
  projectSiteId: number;
  displaydoc:boolean;
  isshowBtn:boolean;
  documents: ProjectDocuments[];
  IsDisabled: boolean = false
  isDisabled1: boolean = false
  isDisabled2: boolean = false
  isDisabled3: boolean = false
  isDisabled4: boolean = false
  minDate: Date;
  startdateMile:string;
  enddateMile:string;
  isFound:boolean=false;
  existProject:project[];
  plannedStartdate: Date;
  ActualStartDate: Date;
  displayBasic:boolean;
    project1: project = new project()
  teams: projectTeam[]
  ProjectData: any;
  CountTeamLeader:boolean=false;
  CountProjectManger:boolean=false;
  selectedlang: string = '';
  ProjectdataFormGroup: FormGroup;
  AssetFormGroup: FormGroup;
  PartenerFormGroup: FormGroup;
  MileStoneFormGroup: FormGroup;
  TeamFormGroup: FormGroup;
  DocumentsFormGroup: FormGroup;
  isLinear = false;
  disabledButton: boolean=true;
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
    private datePipe: DatePipe,private confirmationService: ConfirmationService,private userService:UsersService,
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
    console.log('button',this.disabledButton)
    // this.disabledButton = false
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
     // id: 0, sitename: ''
      id:0,sitename:"",address:"",phone:"",governorateId:0,governorateName:"",cityId:0,cityName:""
    }
    this.ProjectSiteAssetObj = {
      id: 0, days: 0, supplierName: '', ProjectSiteId: 0, assetId: 0, assetName: '',
      serialNumber: '', supplierId: 0, warrantyPeriod: 0, warrantyStartDate: ""
    }
    this.stackObj={
      id: 0,stackeholderName:'',mobile:'',rank:'',description:'',projectId:0
    }
    this.MileObj={
      id:0,title:'',startDate:'',endDate:'',description:'',projectId:0
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
    // this.stackholderService.GetAllStackholdersByProjectID(this.projectID).subscribe(e => {
    //   // this.stackholders = e
    //   this.projectObj.listOfStackholders = e
    // })
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
    this.userService.getAllUsers().subscribe(
      data=>{
        this.users=data;
      },
      error=>console.log(error)
      );
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
    this.LOadPro();
  }

  LOadPro()
  {
    this.projectService.GetAllProjects().subscribe(
      e => { this.existProject= e },
      err => console.log(err)
    ) 
  } 
  addEventwarantryStartDate(event: MatDatepickerInputEvent<Date>) {
    console.log("ggggg",this.ProjectSiteAssetObj)
    this.warantryStartDate = this.datePipe.transform(event.value, 'yyyy-MM-dd');
    this.ProjectSiteAssetObj.warrantyStartDate = this.warantryStartDate
  }
  addEventstartdateMile(event:MatDatepickerInputEvent<Date>)
{
  this.startdateMile=this.datePipe.transform(event.value,'yyyy-MM-dd')
  this.MileObj.startDate=this.startdateMile;
}
addEventenddateMile(event:MatDatepickerInputEvent<Date>)
{
  this.enddateMile=this.datePipe.transform(event.value,'yyyy-MM-dd')
  this.MileObj.endDate=this.enddateMile
}
  onChangeSerial(event) {
    console.log("serialNumber",event.target.value)
    this.serialNumber = event.target.value
    this.ProjectSiteAssetService.GetProjectSiteAssetBySerialNumber(this.serialNumber).subscribe(
      res=>{
        this.ProjectSiteAssetObj=res
        if(this.ProjectSiteAssetObj!==null)
        {  if(this.translate.currentLang=='English')
         {
          this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky:false, detail: 'this serial already exist , plz write another' });
         }
         else
         {
          this.messageService.add({ key: 'tr', severity: 'error', summary: 'انتبه !!!', sticky:false, detail: 'هذا المسلسل بالفعل مستخدم من فضلك اكتب غيره ' });
         }
         
          this.projectSiteClientObj.serialNumber=""
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
    console.log("$event.value",$event)
    this.plannedStartdate = $event
     this.projectObj.actualStartDate = $event
    
  }
  GetActualStartDate($event) {
    console.log("GetActualStartDate",$event)
    this.ActualStartDate = $event
     this.projectObj.actualEndDate = $event
  }
  GetDifferentDate($event) {
    var date1: any = new Date(this.plannedStartdate);
    var date2: any = new Date($event);
    this.diffDays = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
  }

  showmileDialog() {
    this.displayMile = true;
  }
  // addEventplanndedStart(event: MatDatepickerInputEvent<Date>) {
  //   this.minplannedStartDate = event.value
  //   this.plannedStartDate = this.datepipe.transform(event.value, 'yyyy-MM-dd');
  //   this.projectObj.planndedStartDate = this.plannedStartDate
  //   this.projectObj.planndedEndDate = this.projectObj.planndedStartDate
  // }
  // addEventActualStart(event: MatDatepickerInputEvent<Date>) {
  //   this.minActualStartDate = event.value
  //   this.ActualStartDate = this.datepipe.transform(event.value, 'yyyy-MM-dd');
  //   this.projectObj.actualStartDate = this.ActualStartDate
  //   this.projectObj.actualEndDate = this.projectObj.actualStartDate
  // }
  // addEventplanndedEnd(event: MatDatepickerInputEvent<Date>) {
  //   this.planndedEndDate = this.datepipe.transform(event.value, 'yyyy-MM-dd');
  //   this.projectObj.planndedEndDate = this.planndedEndDate
  // }
  // addEventActualEnd(event: MatDatepickerInputEvent<Date>) {
  //   this.ActualEndtDate = this.datepipe.transform(event.value, 'yyyy-MM-dd');
  //   this.projectObj.actualEndDate = this.ActualEndtDate
  // }
  
  AddProject()
  {
    this.messageService.clear();

    // this.projectObj.actualStartDate=new Date();
    if (this.projectObj.projectName != ""&& this.projectObj.projectName.trim().length>=3&& this.projectObj.projectCode != "" &&this.projectObj.projectCode.trim().length>=2&&
      this.projectObj.projectTypeId != 0 && this.projectObj.organizationId != 0
       && this.projectObj.employeeId != 0 && this.selectedSitesColumns.length!=0)
      {

        if(this.projectObj.planndedEndDate==""
        && this.projectObj.actualEndDate=="" && this.projectObj.planndedStartDate=="" && this.projectObj.actualStartDate=="")
        {

          if(this.translate.currentLang=='English')
          {
            this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky:false, detail: 'Plz Complete All Dates Info' });
          }
          else
          {
            this.messageService.add({ key: 'tr', severity: 'error', summary: 'انتبه ', sticky:false, detail: 'من فضلك ادخل معلومات جميع التواريخ  كامله ' });

          }
         // this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: false, detail: 'Plz complete All Dates Info' });       
        }

        console.log('button',this.disabledButton)
        // this.disabledButton = true
      var date1: any = new Date(this.projectObj.planndedStartDate);
      var date2: any = new Date(this.projectObj.planndedEndDate);
      this.diffDays = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
      this.projectObj.projectPeriod = this.diffDays
      console.log("this.projectObj",this.projectObj)
      this.checkNameandCode();
      if (this.Namefound)
      {
        this.messageService.add({ key:'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Project Name aleardy exits' });
        this.Namefound=false;
        return false;
      }
      if (this.Codefound)
      {
        this.messageService.add({ key:'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Code Name aleardy exits' });
        this.Codefound=false;
        return false;
      }
      this.projectService.AddProject(this.projectObj).subscribe(
        res => {
          
          this.projectID = Number(res)
          this.stackholderInLst.projectId = this.projectID
          this.docproject.projectId = this.projectID
          this.ProjectSitesObj.projectId = Number(res)
          this.ProjectSitesObj.lstSites = this.selectedSitesColumns
          this.ProjectSitesService.insertProjectSite(this.ProjectSitesObj).subscribe(
            result => {
              this.ProjectSitesService.GetAllProjectSitesByProjectId(this.projectID).subscribe(
                sites => {
                  this.lstSites = sites
                  console.log("lstSites", this.lstSites)
                  if(this.translate.currentLang=='English')
                  {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record Added' });
                  }
                  else
                  {
                    this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تم اضافه المشروع بنجاح ' });
                  }
                  
                  this.activeIndex +=1
                 this.IsDisabled = true
                 this.isDisabled1 = true
                 this.isDisabled2 = true
                 this.isDisabled3 = true
                 this.isDisabled4 = true
                 this.IsSaveProject = true
                 this.stepper.next();
                 this.disabledButton = false
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
     // this.activeIndex = this.activeIndex
      console.log('active index',this.activeIndex);
      if(this.translate.currentLang=='English')
          {
            this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky:false, detail: 'Plz Complete Data' });
          }
          else
          {
            this.messageService.add({ key: 'tr', severity: 'error', summary: 'انتبه ', sticky:false, detail: 'من فضلك ادخل البيانات كامله ' });

          }
      
     // this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz Complete Data' });
    }
  }
  Finish() {
    this.router.navigate(['home/tabs']);
    if(this.translate.currentLang=='English')
    {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Congratulations all data stored' });
    }
    else
    {
      this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تهانينا جميع بيانات المشروع سجلت بنجاح ' });
    }
  
  }
  
  Savetolist_Stackholders() {
    this.messageService.clear();
    if (this.stackholderInLst.stackeholderName.trim().length>=3 && this.isPhone() && this.stackholderInLst.rank != "") {
      this.stackholderInLst.mobile = String(this.stackholderInLst.mobile);
      this.lstOfStackholder.push(this.stackholderInLst);
      this.stackholderInLst = {
        description: '', id: 0, mobile: '', projectId:this.projectID, rank: '', stackeholderName: ''
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
            this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky:false, detail: 'من فضلك ادخل البيانات كامله ' });

          }

    }

  }

  SaveToDB_Stackholders() {
    this.messageService.clear();
    this.stackholderService.insertListOfStackholders(this.lstOfStackholder).subscribe(e => {
      this.lstOfStackholder = []
      this.displayBasic=false;
      this.stackholderService.GetAllStackholdersByProjectID(this.projectID).subscribe(e => {
        this.stackholders = e
        this.projectObj.listOfStackholders = e
      })
      if(this.translate.currentLang=='English')
      {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Partener Added' });
      }
      else
      {
        this.messageService.add({ severity: 'success', summary: 'نجاح ', detail: 'تم اضافة المستفيد بنجاح ' });
      }
     
    })
  }
  // delStakeHolders(id: number) {
  //   this.stackholderService.deletestakeholder(id).subscribe(res => {
  //     this.stackholderService.GetAllStackholdersByProjectID(this.projectID).subscribe(e => {
  //       this.stackholders = e
  //       this.projectObj.listOfStackholders = e
  //     })
  //   })
  // }

  ConfirmDelStack(id:number)
  {
    this.confirmationService.confirm({
    message:'Are you sure to perform this action?' ,
    accept:()=>{
      this.stackholderService.deletestakeholder(id).subscribe(res => {
        this.stackholderService.GetAllStackholdersByProjectID(this.projectID).subscribe(e => {
          this.stackholders = e
          this.projectObj.listOfStackholders = e
        })
      })  
    } 
    })
  }
    editStak(id:number)
    {
      this.dispalyStackholderEdit=true;
      this.stackholderService.getstackholderbyId(id).subscribe(
        res=>{
          this.stackObj=res
          console.log("stackkkkkkkk",this.stackObj);
      
        }
      
  
      )
    }
    UpdateStackholder()
    {
       
     // id=Number(this.stackObj.id);
     this.stackholderService.updatestakeholder(this.stackObj.id,this.stackObj).subscribe(
       res=>{
        this.stackholderService.GetAllStackholdersByProjectID(this.projectID).subscribe(e => {
          this.stackholders = e
          this.projectObj.listOfStackholders = e
          this.dispalyStackholderEdit=false;
        })               
       }
       ) 
    }
    editMile(id:number)
    {
      this.dispalyMileEdit=true;
      this.milestoneService.GetMileStoneById(id).subscribe(
        res=>{
          this.MileObj=res
          console.log("stackkkkkkkk",this.stackObj);    
        }
      )
    }
    UpdateMileStone()
    {
       
     // id=Number(this.stackObj.id);
     this.milestoneService.updateMileStone(this.MileObj.id,this.MileObj).subscribe(
       res=>{
        this.milestoneService.GetAllMileStonesByProjectID(this.projectID).subscribe(e => {
          this.projectObj.listOfmilestones = e
          this.dispalyMileEdit=false;
        })               
       }
       ) 
    }
    delMile(id: number) {
      this.confirmationService.confirm({
        message:'Are you sure to perform this action?',
    accept:()=>{
      this.milestoneService.deletemilestone(id).subscribe(res => {
        // this.ngOnInit()
        this.milestoneService.GetAllMileStonesByProjectID(this.projectID).subscribe(m => {
          this.projectObj.listOfmilestones = m
        }), err => console.log(err)
      })
    } 
      }) 
    }
    delteam(id: number) {
      this.confirmationService.confirm({
       message:'Are you sure to perform this action?',
        accept:()=>{
          this.projectTeamService.deleteteam(id).subscribe(res => {
            this.projectTeamService.GetAllTeamsByProjectID(this.projectID).subscribe(t => {
              this.teams = t;
              this.project1.listofprojectteam = this.teams;
              this.projectObj.listofprojectteam = t
            }), err => console.log(err)
      
          })
        }
         })
        }



  SaveToDB_Milestones() {
    this.messageService.clear();
    this.milestoneService.insertListOfMilestoness(this.lstOfMilestones).subscribe(e => {
      this.lstOfMilestones = []
      this.milestoneService.GetAllMileStonesByProjectID(this.projectID).subscribe(m => {
        this.projectObj.listOfmilestones = m
      }), err => console.log(err)
    
    
    this.displayMile=false;
     // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Milestone Added' });
     if(this.translate.currentLang=='English')
      {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Milestone  Added' });
      }
      else
      {
        this.messageService.add({ severity: 'success', summary: 'نجاح ', detail: 'تم اضافة الخطوه  بنجاح ' });
      }

    })
  }
  Savetolist_Milestones() {
    this.messageService.clear();
    if (this.milestonInLst.title.trim().length>=3 && this.milestonInLst.startDate != "" && this.milestonInLst.endDate != "") {
      this.milestonInLst.projectId = this.projectID;
      console.log("this.projectID", this.projectID)
      this.lstOfMilestones.push(this.milestonInLst);
      this.milestonInLst = {
        description: '', id: 0, endDate: "", projectId: 0, startDate: "", title: ''
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
            this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky:false, detail: 'من فضلك ادخل البيانات كامله ' });

          }

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
  OnChangePosID(i:any)
  {
    this.emps.length=0;
    this.usersfil=this.users;
   if(this.ProjectTeam.projectPositionId==1)
   {
    this.usersfil=this.users.filter(e=>e.roles==="TL");
    console.log("tl",this.usersfil);
   }
  if(this.ProjectTeam.projectPositionId==2)
   {
     this.usersfil=this.users.filter(e=>e.roles==="Employee")
     console.log("employee",this.usersfil);
   }     
  for(let x=0;x<this.usersfil.length;x++)
    {
       for(let i=0;i<this.lstEmployees.length;i++)
       {
          if(this.usersfil[x].email==this.lstEmployees[i].email)
          {         
            this.emps.push(this.lstEmployees[i]);        
          }
      }
   }
        console.log("emplotrererer",this.emps); 
  } 
   



  teamname: any
  saveTeam() {

  }
  tasneem: number;
  TeamLead:boolean=false;
  SaveToDB_ProjectTeams() {

    this.TeamLead=false;
    this.messageService.clear();
    this.CountTeamLeader=false;
    this.CountProjectManger=false;
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
      this.tasneem = this.Idteam;
      this.projectTeamService.GetAllProjectTeams().subscribe(e => {
        // this.lstOfProjectTeams = e
        console.log("lstof teams", this.lstOfProjectTeams)
      })
      this.projectTeamService.GetAllTeamsByProjectID(this.projectID).subscribe(
        res => {
          this.projectObj.listofprojectteam = res
        }
      )
      this.projectPositionService.GetAllProjectPosition().subscribe(e => {
        this.lstOfprojectPosition = e
      })
     // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Team Added' });
     if(this.translate.currentLang=='English')
     {
       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Team Added' });
     }
     else
     {
       this.messageService.add({ severity: 'success', summary: 'نجاح ', detail: 'تم اضافة الفريق بنجاح ' });
     }
     

    });
    this.displayteam=false;
    this.lstOfProjectTeams.length=0;
    this.team.Name="";
    this.teamname="";
   
  }
  else
  {
    this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky:false, detail: 'team must have team leader ' });
  }


  }
  Savetolist_Teams()
   {
    this.messageService.clear();
    if (this.team.Name.trim().length>=1&& this.ProjectTeam.projectPositionId != 0 && this.ProjectTeam.employeeId != 0
      && this.ProjectTeam.departmentId != 0)
    {
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
          // this.ProjectTeam.teamId = 29;
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
                , projectId: this.projectID, projectName: ''
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
            , projectId: this.projectID, projectName: ''
          }
       
        }
          // this.lstOfProjectTeams.push(this.ProjectTeam);
       
          // this.ProjectTeam = {
          //   teamName: '',
          //   teamId: 0,
          //   departmentId: 0, id: 0, departmentName: '', employeeName: '', projectPositionId: 0, projectPositionName: '', employeeId: 0
          //   , projectId: this.projectID, projectName: ''
          // }
        
        })
      })
    }
    else {
     // this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz Complete Data' });
     if(this.translate.currentLang=='English')
          {
            this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky:false, detail: 'Plz Complete Data' });
          }
          else
          {
            this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky:false, detail: 'من فضلك ادخل البيانات كامله ' });

          }

    }
    // console.log("projteam before show", this.ProjectTeam)
    // console.log("lst of teams", this.lstOfProjectTeams)
  }
  delDocument(id: number) {
 
    this.confirmationService.confirm({
      message:'Are you sure to perform this action?',
  accept:()=>{
   this.projectdocumentService.deletedocument(id).subscribe(res => {
      //this.ngOnInit()
      this.projectdocumentService.GetAllDocumentsByProjectID(this.projectID).subscribe(d => {
        this.documents = d;
        this.project1.listOfdocuments = this.documents;
        this.projectObj.listOfdocuments = d;
      }), err => console.log(err)
    })
  }})
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
     // this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz select Site' });

     if(this.translate.currentLang=='English')
     {
      this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: false, detail: 'Plz select Site' });
     }
     else
     {
      this.messageService.add({ key: 'tr', severity: 'error', summary: 'انتبه !!!', sticky: false, detail: 'من فضلك اختر موقع ' });
     }

    }
  }
  saveSiteAssettoList() {
    this.messageService.clear();
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
    if (this.projectSiteClientObj.assetId != 0 && this.projectSiteClientObj.supplierId != 0 && this.projectSiteClientObj.siteId != 0
      && this.projectSiteClientObj.serialNumber!="" && this.projectSiteClientObj.warrantyStartDate!="") {
      this.assetservice.GetAssetById(this.projectSiteClientObj.assetId).subscribe(
        res => {
          this.projectSiteClientObj.assetName = res.assetName
          this.SuppliersService.GetSupplierById(this.projectSiteClientObj.supplierId).subscribe(
            res2 =>{
              this.projectSiteClientObj.supplierName = res2.supplierName
              this.SiteService.GetSiteById(this.SiteId).subscribe(
                res3 => {
                  this.projectSiteClientObj.siteName = res3.sitename
               //   this.listProjectSiteAssetClients.push(this.projectSiteClientObj)
                  console.log("in save site asset to list this.projectSiteClientObj",this.projectSiteClientObj);
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
    //  this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz Complete Data' });
    if(this.translate.currentLang=='English')
          {
            this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky:false, detail: 'Plz Complete Data' });
          }
          else
          {
            this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky:false, detail: 'من فضلك ادخل البيانات كامله ' });

          }
    }

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
        this.ProjectSiteAssetService.GetAllProjectSiteAssetBySiteId(this.SiteId, this.projectID).subscribe(
          res => {
            this.listProjectSiteAssetClients = res
            console.log("listProjectSiteAssetClients", this.listProjectSiteAssetClients);
          }
        )
      }
    )
  }



  saveSiteAssetToDB() {
    this.messageService.clear();  
    this.ProjectSiteAssetObj.assetId = this.projectSiteClientObj.assetId    
    this.ProjectSiteAssetObj.days = this.projectSiteClientObj.days   
    this.ProjectSiteAssetObj.serialNumber = this.projectSiteClientObj.serialNumber  
    this.ProjectSiteAssetObj.supplierId = this.projectSiteClientObj.supplierId   
    this.ProjectSiteAssetObj.warrantyPeriod = this.projectSiteClientObj.warrantyPeriod 
    this.ProjectSiteAssetObj.warrantyStartDate = this.projectSiteClientObj.warrantyStartDate
    this.ProjectSiteAssetObj.ProjectSiteId = this.projectSiteId
    this.ProjectSiteAssetService.insertProjectSiteAsset(this.ProjectSiteAssetObj).subscribe(
      res => {
     //   this.SiteClientsObj.projectSiteId = this.projectSiteId
  //  this.SiteClientsObj.clients = this.lstSelectedClients
        console.log("enter service0000000000000000000000000000000");
        this.SiteClientsObj.projectSiteId = this.projectSiteId
        this.SiteClientsObj.clients = this.projectSiteClientObj.clients
        console.log("this.SiteClientsObj", this.SiteClientsObj)
       if (this.SiteClientsObj.clients.length != 0) {
         this.SiteClientsService.insertSiteClient(this.SiteClientsObj).subscribe(
        res=>{
           
        }   
         )
       }
        this.ProjectSiteAssetService.GetAllProjectSiteAssetBySiteId(this.SiteId, this.projectID).subscribe(
                res => {
                  this.listProjectSiteAssetClients = res
                }
              )
            
     //   }
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

  GetAllProjectSiteAssetBySiteId() {

  }
  Savedoctolist() {
    this.messageService.clear();
    if (this.docproject.documentName.trim().length>=1 && this.docproject.documentFile != "") {
      this.lstoddocproj.push(this.docproject);
      this.docproject = {
        Description: '', documentName: '', id: 0, documentFile: '', projectId: this.projectID
      };
      console.log(this.lstoddocproj);
    }
    else {
     // this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz Complete Data' });
     if(this.translate.currentLang=='English')
          {
            this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky:false, detail: 'Plz Complete Data' });
          }
          else
          {
            this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky:false, detail: 'من فضلك ادخل البيانات كامله ' });

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
    console.log(fileToUpload.name)

    this.httpClient.post(environment.uploadFile, formData)
      .subscribe(res => {
        console.log(res)
        //  this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Uploaded Successfully' });
        //  alert('Uploaded Successfully.');
        if(this.translate.currentLang=='English')
        {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Uploaded Successfully' });
        }
        else
        {
          this.messageService.add({ severity: 'success', summary: 'نجاح ', detail: 'تم الرفع   بنجاح ' });
        }



      });
  }
  SaveDocuentToDB() {
    this.projectdocumentService.postProjectDocumentByProjectID(this.lstoddocproj).subscribe(e => {
      this.projectdocumentService.GetAllDocumentsByProjectID(this.projectID).subscribe(d => {
        this.documents = d;
        this.project1.listOfdocuments = this.documents;
        this.projectObj.listOfdocuments = d;
      }), err => console.log(err)
     // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Document Added' });
     if(this.translate.currentLang=='English')
        {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Document Added' });
        }
        else
        {
          this.messageService.add({ severity: 'success', summary: 'نجاح ', detail: 'تمت الاضافة' });
        }
     
      console.log(e)
    })
    this.displaydoc =false;
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
  PreviousStep() {
    this.activeIndex = this.activeIndex - 1
  }
  NextStep() {
    if (this.activeIndex == 0) {
      if (this.projectObj.projectName == "" && this.projectObj.projectCode == "" &&
        this.projectObj.projectTypeId == 0 && this.projectObj.organizationId == 0 && this.projectObj.employeeId == 0)
      {
      //  this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Plz Complete Data' });
      
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
  showBasicDialog() {
    this.displayBasic = true;
  }
  showteamDialog() {
    this.displayteam = true
  }
  showdocDialog() {
    this.displaydoc = true
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
  checkNameandCode()  
  {
     
    for (let index = 0; index < this.existProject.length; index++)
    {
        if(this.existProject[index].projectName==this.projectObj.projectName && this.existProject[index].id!=this.projectObj.id)
        {
          console.log(this.existProject[index].projectName);
          
        // this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Supplier  Name aleardy exits' });
          this.Namefound=true;                    
        }

        if(this.existProject[index].projectCode==this.projectObj.projectCode && this.existProject[index].id!=this.projectObj.id)
        {
          console.log(this.existProject[index].projectCode);
          
        // this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Supplier  Name aleardy exits' });
          this.Codefound=true;                   
        }
    }
   
       
  }

}
