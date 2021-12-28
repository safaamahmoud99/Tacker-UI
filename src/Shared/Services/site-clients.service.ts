import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { client } from '../Models/client';
import { SiteClients } from '../Models/SiteClients';
@Injectable({
  providedIn: 'root'
})
export class SiteClientsService {
  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };
  GetAllSiteClients(): Observable<SiteClients[]> {
    return this.httpClient.get<SiteClients[]>(`${environment.SiteClients}`, this.httpHeader);
  }
  insertSiteClient(SiteClients: SiteClients): Observable<SiteClients> {
    return this.httpClient.post<SiteClients>(`${environment.SiteClients}`, SiteClients, this.httpHeader);
  }
  deleteSiteClient(id: number): Observable<SiteClients> {
    return this.httpClient.delete<SiteClients>(`${environment.SiteClients}/` + id, this.httpHeader);
  }
  updateSiteClient(id: Number, Site: SiteClients): Observable<SiteClients> {
    return this.httpClient.put<SiteClients>(`${environment.SiteClients}/` + id, Site, this.httpHeader);
  }
  GetSiteClientById(SiteClientsID: number): Observable<SiteClients> {
    return this.httpClient.get<SiteClients>(`${environment.SiteClients}/` + SiteClientsID, this.httpHeader)
  }
  GetAllUnassignedClients(SiteId:number,ProjectId: number): Observable<client[]> {
    return this.httpClient.get<client[]>(`${environment.GetAllUnassignedClients}/`+ SiteId +"/" + ProjectId, this.httpHeader)
  }
  GetAllUnassignedClientsforAnotherProjectAndAssignedByThisProjectId(SiteId:number,ProjectId: number): Observable<client[]> {
    return this.httpClient.get<client[]>(`${environment.GetAllUnassignedClientsforAnotherProjectAndAssignedByThisProjectId}/`+ SiteId +"/" + ProjectId, this.httpHeader)
  }
  GetAllAssignedClients(SiteId:number,ProjectId: number): Observable<client[]> {
    return this.httpClient.get<client[]>(`${environment.GetAllAssignedClients}/`+ SiteId +"/" + ProjectId, this.httpHeader)
  }
  UpdateByProjectId(projectSiteId: Number, lstsiteClients: client[]): Observable<SiteClients[]> {
    return this.httpClient.put<SiteClients[]>(`${environment.SiteClients}/` + projectSiteId, lstsiteClients, this.httpHeader);
  }
  GetAllAssignedClientsByProjectId(ProjectId: number): Observable<client[]> {
    return this.httpClient.get<client[]>(`${environment.GetAllAssignedClientsByProjectId}/`+ ProjectId, this.httpHeader)
  }
  
}