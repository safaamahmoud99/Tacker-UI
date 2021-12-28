import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectSites } from '../Models/ProjectSites';
import { Sites } from '../Models/Sites';
@Injectable({
  providedIn: 'root'
})
export class ProjectSitesService {
  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };
  GetAllProjectSites(): Observable<ProjectSites[]> {
    return this.httpClient.get<ProjectSites[]>(`${environment.ProjectSites}`, this.httpHeader);
  }
  GetAllProjectSitesByProjectId(ProjectId:number): Observable<Sites[]> {
    return this.httpClient.get<Sites[]>(`${environment.GetAllSitesByProjectId}/`+ProjectId, this.httpHeader);
  }
  insertProjectSite(ProjectSites: ProjectSites): Observable<ProjectSites> {
    return this.httpClient.post<ProjectSites>(`${environment.ProjectSites}`, ProjectSites, this.httpHeader);
  }
  deleteProjectSite(id: number): Observable<ProjectSites> {
    return this.httpClient.delete<ProjectSites>(`${environment.ProjectSites}/` + id, this.httpHeader);
  }
  updateProjectSite(ProjectId: Number, lstSites: Sites[]): Observable<Sites[]> {
    return this.httpClient.put<Sites[]>(`${environment.ProjectSites}/` + ProjectId, lstSites, this.httpHeader);
  }
  GetProjectSiteById(ProjectSitesID: number): Observable<ProjectSites> {
    return this.httpClient.get<ProjectSites>(`${environment.ProjectSites}/` + ProjectSitesID, this.httpHeader)
  }
  GetProjectSiteByProjectIdAndSiteId(ProjectId: number,SiteId:number): Observable<ProjectSites> {
    return this.httpClient.get<ProjectSites>(`${environment.GetProjectSiteByProjectIdAndSiteId}/` + ProjectId+"/"+SiteId, this.httpHeader)
  }
}