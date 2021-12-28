import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { projectsVM } from '../Models/projectsVM';
import { projectTeam } from '../Models/projectTeam';
import { request } from '../Models/request';

@Injectable({
  providedIn: 'root'
})
export class ProjectTeamService {

  constructor(private httpClient : HttpClient) { }
  httpHeader={headers: new HttpHeaders({
    'content-type':'application/json',
    'Accept': '*/*'  
  })};
  insertListOfteams(projectTeams:projectTeam[]): Observable <any>{
    return this.httpClient.post<any> (`${environment.ProjectTeams}`,projectTeams,this.httpHeader) ;
  }
  GetAllProjectTeams(): Observable<projectTeam[]> {
    return this.httpClient.get<projectTeam[]>(`${environment.ProjectTeams}`, this.httpHeader);
  }
  GetProjectByProjectID(ProjectTeamID:Number): Observable <projectTeam>{
    return this.httpClient.get<projectTeam> (`${environment.ProjectTeams}${ProjectTeamID}`,this.httpHeader) ;
  }
  GetEmployeessByTeamIdAndPositionId(teamId:number,positionId:number):Observable <projectTeam[]>{
    return this.httpClient.get<projectTeam[]> (`${environment.GetEmployeessByTeamId}${teamId}/${positionId}`,this.httpHeader) ;
  }
  GetAllTeamsByProjectID(ProjectID:Number): Observable <projectTeam[]>{
    return this.httpClient.get<projectTeam[]> (`${environment.GetAllTeamsByProjectId}${ProjectID}`,this.httpHeader) ;
  }
  updateteambyprojectid(team:projectTeam[]):Observable<projectTeam[]>{
    return this.httpClient.put<projectTeam[]>(`${environment.updateteamsbyprojectid}`,team,this.httpHeader);
  }
  deleteteam(id:number):Observable<any>{ 
    return this.httpClient.delete<any>(`${environment.deleteteam}${id}`,this.httpHeader);
  }
  GetProjectTeamsByProjectPositionId(positionId:number){
    return this.httpClient.get<projectTeam[]> (`${environment.GetProjectTeamsByProjectPositionId}${positionId}`,this.httpHeader) ;
  }
  GetProjectTeamsByProjectId(projectId:number){
    return this.httpClient.get<projectTeam[]> (`${environment.GetAllProjectTeamsByProjectID}${projectId}`,this.httpHeader) ;
  }
  GetProjectTeamByProjectIdAndTeamIdAndProjectPositionId(projectId:number,teamId:number){
    return this.httpClient.get<projectTeam> (`${environment.GetAllProjectTeamIdByProjectIDandTeamIdAndPoaitionId}${projectId}/${teamId}/1`,this.httpHeader) ;
  }
  GetProjectTeamByProjectPositionIdAndEmployeeId(projectPositionId:number,empId:number){
    return this.httpClient.get<projectTeam[]> (`${environment.GetProjectTeamByProjectPositionIdAndEmployeeId}${projectPositionId}/${empId}`,this.httpHeader) ;
  }

  GetAllProjectTeamsByProjectIds(ProjectIds:projectsVM): Observable<any> {
    return this.httpClient.post<request[]> (`${environment.GetAllProjectTeamsByProjectIds}`,ProjectIds,this.httpHeader) ;
  }

}
