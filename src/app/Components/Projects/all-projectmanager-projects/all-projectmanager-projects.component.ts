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
import { date } from 'ngx-custom-validators/src/app/date/validator';
import { SiteClientsService } from 'src/Shared/Services/site-clients.service';
import { ProjectSiteAssetService } from 'src/Shared/Services/project-site-asset.service';
import { client } from 'src/Shared/Models/client';
import { ListProjectSiteAssetClients } from 'src/Shared/Models/ListProjectSiteAssetClients';
import { OrganizationClientsService } from 'src/Shared/Services/organization-clients.service';

@Component({
  selector: 'app-all-projectmanager-projects',
  templateUrl: './all-projectmanager-projects.component.html',
  styleUrls: ['./all-projectmanager-projects.component.scss']
})
export class AllProjectmanagerProjectsComponent implements OnInit {

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

  constructor(private route: Router, private projectteamservice: ProjectTeamService,
    private projectdocumentsservice: ProjectDocumentService,
    private messageService: MessageService, private confirmationService: ConfirmationService,
    private milestoneservice: MilestoneService, private projectService: ProjectService,
    private stackholderService: StackholdersService, private siteClientsService: SiteClientsService,
    private projectSiteAssetService: ProjectSiteAssetService, private organizationClientsService: OrganizationClientsService,
    private router: Router) { }

  ngOnInit() {
    this.lstClientsByProjectId = []
    this.listProjectSiteAssetClients = []
    this.role = localStorage.getItem('roles')
    this.LoggedInUserId = Number(localStorage.getItem('id'))
    this.clientId = Number(localStorage.getItem("clientId"))
    this.clientManager = localStorage.getItem("clientManager")
    console.log("loggedin", localStorage.getItem('id'))
    console.log("clientManager", this.clientManager)
    if (this.role == "ClientManager") {
      this.organizationClientsService.GetOrganizationProjectsByClientId(this.clientId).subscribe(
        res => {
          this.projects = res
        }
      )
    } else {
      this.projectService.GetAllProjectsByEmployeeId(this.LoggedInUserId).subscribe(pro => {
        pro.forEach(customer => customer.actualStartDate = new Date(customer.actualStartDate));
        pro.forEach(customer => customer.actualEndDate = new Date(customer.actualEndDate));
        this.projects = pro
        console.log(this.projects)
      })
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
    this.stake = {
      id: 0, stackeholderName: '', mobile: '', projectId: 0, rank: '', description: ''
    }
  }
  showAllProjectDetails(projectID: number) {
    console.log(projectID)
  }
  showModalDialog() {
    this.displayModal = true;
    //this.displayMaximizable = true;

  }
  showMaximizableDialog(Projectid: number) {
    console.log(Projectid)
    this.projects.forEach(element => {
      if (element.id == Projectid) {
        this.project1 = element
        console.log(this.project1)
      }
    });
    this.projectSiteAssetService.GetAllProjectSiteAssetByProjectId(Projectid).subscribe(
      res => {
        this.listProjectSiteAssetClients = res
        // this.listProjectSiteAssetClients.forEach(customer => customer.warrantyStartDate = new Date(customer.warrantyStartDate));
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


    this.displayMaximizable = true;
  }
  stake: any
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
        console.log(this.project1)
      }
      this.projectService.getProjectById(this.project1.id).subscribe(res => {
        this.projectObj = res;
      })

      this.stackholderService.GetAllStackholdersByProjectID(Projectid).subscribe(e => {
        this.stackholders = e
        this.projectObj.listOfStackholders = e
        this.stake = e
        console.log("stakeee", this.stake)
        // console.log("e",e)

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