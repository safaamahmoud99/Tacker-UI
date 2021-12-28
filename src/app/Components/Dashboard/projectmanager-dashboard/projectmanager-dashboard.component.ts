import { Component, OnInit } from '@angular/core';
import { project } from 'src/Shared/Models/project';
import { projectsVM } from 'src/Shared/Models/projectsVM';
import { projectTeam } from 'src/Shared/Models/projectTeam';
import { projectTeamVM } from 'src/Shared/Models/projectTeamVM';
import { request } from 'src/Shared/Models/request';
import { requestStatus } from 'src/Shared/Models/requestStatus';
import { ProjectTeamService } from 'src/Shared/Services/project-team.service';
import { ProjectService } from 'src/Shared/Services/project.service';
import { RequestStatusService } from 'src/Shared/Services/request-status.service';
import { RequestService } from 'src/Shared/Services/request.service';

@Component({
  selector: 'app-projectmanager-dashboard',
  templateUrl: './projectmanager-dashboard.component.html',
  styleUrls: ['./projectmanager-dashboard.component.css']
})
export class ProjectmanagerDashboardComponent implements OnInit {
  role: string
  LoggedInUserId: number
  projects: project[]
  projectId: number[]
  lstprojId: projectsVM
  lstProjectTeamIds: projectTeamVM
  lstRequests: request[]
  lstRequestStatus: requestStatus[]
  RequestOpenedLength: any
  RequestClosedLength: any
  RequestInProgressLength: any
  projectTeams: projectTeam[]

  constructor(private projectService: ProjectService,
    private projectTeamservice: ProjectTeamService,
    private requestService: RequestService,
    private requeststatusservice: RequestStatusService) { }

  ngOnInit(): void {

    this.projects = []
    this.lstRequestStatus = []
    this.lstprojId = { ProjectIds: '' }
    this.lstProjectTeamIds = { ProjectTeamIds: '' }
    this.lstRequests = []
    this.projectTeams = []
    this.RequestOpenedLength = 0
    this.RequestClosedLength = 0
    this.RequestInProgressLength = 0
    this.requeststatusservice.GetAllRequestStatus().subscribe(e => {
      this.lstRequestStatus = e
    })
    this.role = localStorage.getItem('roles')
    this.LoggedInUserId = Number(localStorage.getItem('id'))
    console.log("loggedin", localStorage.getItem('id'))
    this.projectService.GetAllProjectsByEmployeeId(this.LoggedInUserId).subscribe(projects => {
      this.projects = projects
      this.projects.forEach(ele => {
        this.lstprojId.ProjectIds += (ele.id).toString() + ','
        this.projectService.CountClosedProjects(ele.id).subscribe(count=>{
          console.log("count",count);
          ele.RequestClosedLength=count
        })
        this.projectService.CountInProgressProjects(ele.id).subscribe(count=>{
          console.log("count",count);
          ele.RequestInProgressLength=count
        })
        this.projectService.CountOpenProjects(ele.id).subscribe(count=>{
          console.log("count",count);
          ele.RequestOpenedLength=count
        })
      });
    })
  }

}
