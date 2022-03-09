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
import { client } from 'src/Shared/Models/client';
import { ProjectSiteAssetService } from 'src/Shared/Services/project-site-asset.service';
import { ListProjectSiteAssetClients } from 'src/Shared/Models/ListProjectSiteAssetClients';
@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss']
})
export class AllProjectsComponent implements OnInit {

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
  lstClientsByProjectId:client[]
  listProjectSiteAssetClients: ListProjectSiteAssetClients[]

  constructor(private route: Router, private projectteamservice: ProjectTeamService,
    private projectdocumentsservice: ProjectDocumentService,
    private messageService: MessageService, private confirmationService: ConfirmationService,
    private milestoneservice: MilestoneService, private projectService: ProjectService,
    private stackholderService: StackholdersService,private siteClientsService:SiteClientsService,
    private projectSiteAssetService:ProjectSiteAssetService,
    private router: Router) { }

  ngOnInit() {
    this.projectService.GetAllProjects().subscribe(pro => {
      this.projects = pro,
      console.group("this.projects", this.projects);
    })
    this.lstClientsByProjectId=[]
    this.listProjectSiteAssetClients=[]
    this.project1 = {startDate:new Date,endtDate:new Date,
      IsDeleted: false, RequestClosedLength: 0, RequestInProgressLength: 0, RequestOpenedLength: 0,
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
  }
  showModalDialog() {
    this.displayModal = true;

  }
  showMaximizableDialog(Projectid: number) {
    this.projects.forEach(element => {
      if (element.id == Projectid) {
        this.project1 = element
      }
    });
      this.projectSiteAssetService.GetAllProjectSiteAssetByProjectId(Projectid).subscribe(
        res => {
          this.listProjectSiteAssetClients = res
          // this.listProjectSiteAssetClients.forEach(customer => customer.warrantyStartDate = new Date(customer.warrantyStartDate));
        }
      )
      this.stackholderService.GetAllStackholdersByProjectID(Projectid).subscribe(e => {
        this.stackholders = e

        this.project1.listOfStackholders = this.stackholders
      })
      this.siteClientsService.GetAllAssignedClientsByProjectId(Projectid).subscribe(
        res=>{
          this.lstClientsByProjectId=res
        }
      )
      //milestone
      this.milestoneservice.GetAllMileStonesByProjectID(Projectid).subscribe(m => {
        this.mileStones = m;
        this.project1.listOfmilestones = this.mileStones;
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
    this.projects.forEach(element => {
      if (element.id == Projectid) {
        this.project1 = element
      }
      this.projectService.getProjectById(this.project1.id).subscribe(res => {
        this.projectObj = res;
      })

      this.stackholderService.GetAllStackholdersByProjectID(Projectid).subscribe(e => {
        this.stackholders = e
        this.projectObj.listOfStackholders = e
        this.stake = e
        this.project1.listOfStackholders = this.stackholders
      })
      //milestone
      this.milestoneservice.GetAllMileStonesByProjectID(Projectid).subscribe(m => {
        this.mileStones = m;
        this.project1.listOfmilestones = this.mileStones;
        this.projectObj.listOfmilestones = m
      }), err => console.log(err)

      this.projectteamservice.GetAllTeamsByProjectID(Projectid).subscribe(t => {
        this.teams = t;
        this.teams = t.reduce((unique, o) => {
          if (!unique.some(obj => obj.teamId == o.teamId)) {
            unique.push(o);
          }
          return unique;
        }, []);
      
        this.project1.listofprojectteam = this.teams;
        this.projectObj.listofprojectteam = t
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
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.projectService.getProjectById(id).subscribe(res => {
          this.projectObj = res
          this.projectService.DeleteProject(id, this.projectObj).subscribe(
            data => {
              this.ngOnInit(),
                this.messageService.add({ severity: 'info', summary: 'Record Deleted!', detail: 'Record Deleted!' });
            }
          )
        })
      }
    });
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
