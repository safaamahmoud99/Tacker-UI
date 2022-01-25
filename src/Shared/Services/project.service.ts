import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { project } from '../Models/project'
import { CreateTeamVM, Team } from '../Models/team';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };

  GetAllProjects(): Observable<project[]> {
    return this.httpClient.get<project[]>(`${environment.project}`, this.httpHeader);
  }
  proCanrequest():Observable<project[]>
  {
    return this.httpClient.get<project[]>(`${environment.GetProjectForRequest}`,this.httpHeader);
  }
  AddProject(project): Observable<project> {
    return this.httpClient.post<project>(`${environment.project}`,project, this.httpHeader);
  }
  DeleteProject(id:number,project:project):Observable<project> {
    return this.httpClient.put<project>(`${environment.DeleteProject}${id}`, project,this.httpHeader);
  }
  updateProject(id:number,project:project):Observable<project>{
    return this.httpClient.put<project>(`${environment.updateProject}${id}`,project,this.httpHeader);
  }
  getProjectById(id:number):Observable<any>{
    return this.httpClient.get<any>(`${environment.GetProjectById}${id}`,this.httpHeader);
  }
  GetClientByProjectId(ProjectId:Number):Observable<any>{
    return this.httpClient.get<any[]>(`${environment.GetClientByProjectId}${ProjectId}`,this.httpHeader);
  }
  GetProjectsByClientId(ClientId:Number):Observable<any>{
    return this.httpClient.get<any[]>(`${environment.GetProjectsByClientId}${ClientId}`,this.httpHeader);
  }
  // addTeam(team):Observable<Team>{
  //   return this.httpClient.post<Team>(`${environment.addteams}`,team,this.httpHeader);
  // }

  addTeam(team):Observable<CreateTeamVM>{
    return this.httpClient.post<CreateTeamVM>(`${environment.addteams}`,team,this.httpHeader);
  }

  GetAllProjectsByProjectTypeId(projecttTypeId:number):Observable<any>{
    return this.httpClient.get<any>(`${environment.GetAllProjectsByProjectTypeId}${projecttTypeId}`,this.httpHeader);
  }

  getTeamByTeamId(id:number):Observable<any>{
    return this.httpClient.get<any>(`${environment.getTeambyId}${id}`,this.httpHeader);
  }
  GetAllProjectsByEmployeeId(id:number):Observable<any>{
    return this.httpClient.get<project[]>(`${environment.GetAllProjectsByEmployeeId}${id}`,this.httpHeader);
  }
  CountProjects(projectId:number):Observable<any>{
    return this.httpClient.get<any>(`${environment.CountProject}${projectId}`,this.httpHeader);
  }
  CountOpenProjects(projectId:number):Observable<any>{
    return this.httpClient.get<any>(`${environment.CountOpenProjects}${projectId}`,this.httpHeader);
  }
  CountInProgressProjects(projectId:number):Observable<any>{
    return this.httpClient.get<any>(`${environment.CountInProgressProjects}${projectId}`,this.httpHeader);
  }
  CountClosedProjects(projectId:number):Observable<any>{
    return this.httpClient.get<any>(`${environment.CountClosedProjects}${projectId}`,this.httpHeader);
  }

  
}