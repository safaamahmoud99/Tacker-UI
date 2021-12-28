import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { client } from '../Models/client';
import { OrganizationClients } from '../Models/OrganizationClients';
import { project } from '../Models/project';
@Injectable({
  providedIn: 'root'
})
export class OrganizationClientsService {
  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };
  GetAllOrganizationClients(): Observable<OrganizationClients[]> {
    return this.httpClient.get<OrganizationClients[]>(`${environment.OrganizationClients}`, this.httpHeader);
  }
  GetOrganizationProjectsByClientId(ClientId: number): Observable<project[]> {
    return this.httpClient.get<project[]>(`${environment.GetOrganizationProjectsByClientId}/`+ ClientId, this.httpHeader)
  }
  insertOrganizationClient(OrganizationClients: OrganizationClients): Observable<OrganizationClients> {
    return this.httpClient.post<OrganizationClients>(`${environment.OrganizationClients}`, OrganizationClients, this.httpHeader);
  }
  GetAllUnassignedClients(): Observable<client[]> {
    return this.httpClient.get<client[]>(`${environment.GetAllUnassignedClientsByOrganization}`, this.httpHeader)
  }
  GetAllAssignedClientsByOrganizationId(OrganizationId: number): Observable<client[]> {
    return this.httpClient.get<client[]>(`${environment.GetAllAssignedClientsByOrganizationId}/`+ OrganizationId, this.httpHeader)
  }
  GetAllAssignedClientsDataByOrganizationId(OrganizationId: number): Observable<client[]> {
    return this.httpClient.get<client[]>(`${environment.GetAllAssignedClientsDataByOrganizationId}/`+ OrganizationId, this.httpHeader)
  }
  GetAllUnassignedClientsforAnotherOrganizationAndAssignedByThisOrganizationId(OrganizationId: number): Observable<client[]> {
    return this.httpClient.get<client[]>(`${environment.GetAllUnassignedClientsforAnotherOrganizationAndAssignedByThisOrganizationId}/`+ OrganizationId, this.httpHeader)
  }
  UpdateByOrganizationId(OrganizationId: Number, lstOrganizationClients: client[]): Observable<OrganizationClients[]> {
    return this.httpClient.put<OrganizationClients[]>(`${environment.OrganizationClients}/` + OrganizationId, lstOrganizationClients, this.httpHeader);
  }


  // deleteOrganizationClient(id: number): Observable<OrganizationClients> {
  //   return this.httpClient.delete<OrganizationClients>(`${environment.OrganizationClients}/` + id, this.httpHeader);
  // }
  // updateOrganizationClient(id: Number, Site: OrganizationClients): Observable<OrganizationClients> {
  //   return this.httpClient.put<OrganizationClients>(`${environment.OrganizationClients}/` + id, Site, this.httpHeader);
  // }
  // GetOrganizationClientById(OrganizationClientsID: number): Observable<OrganizationClients> {
  //   return this.httpClient.get<OrganizationClients>(`${environment.OrganizationClients}/` + OrganizationClientsID, this.httpHeader)
  // }
}