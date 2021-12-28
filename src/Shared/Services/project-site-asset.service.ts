import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListProjectSiteAssetClients } from '../Models/ListProjectSiteAssetClients';
import { ProjectSiteAsset } from '../Models/ProjectSiteAsset';
@Injectable({
  providedIn: 'root'
})
export class ProjectSiteAssetService {
  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };
  GetAllProjectSiteAsset(): Observable<ProjectSiteAsset[]> {
    return this.httpClient.get<ProjectSiteAsset[]>(`${environment.ProjectSiteAsset}`, this.httpHeader);
  }
  insertProjectSiteAsset(ProjectSiteAsset: ProjectSiteAsset): Observable<ProjectSiteAsset> {
    return this.httpClient.post<ProjectSiteAsset>(`${environment.ProjectSiteAsset}`, ProjectSiteAsset, this.httpHeader);
  }
  deleteProjectSiteAsset(id: number): Observable<ProjectSiteAsset> {
    return this.httpClient.delete<ProjectSiteAsset>(`${environment.ProjectSiteAsset}/` + id, this.httpHeader);
  }
  updateProjectSiteAsset(ProjectSiteAssetId: Number, projectSiteAsset: ProjectSiteAsset): Observable<ProjectSiteAsset> {
    return this.httpClient.put<ProjectSiteAsset>(`${environment.ProjectSiteAsset}/` + ProjectSiteAssetId, projectSiteAsset, this.httpHeader);
  }
  GetProjectSiteAssetById(ProjectSiteAssetID: number): Observable<ProjectSiteAsset> {
    return this.httpClient.get<ProjectSiteAsset>(`${environment.ProjectSiteAsset}/` + ProjectSiteAssetID, this.httpHeader)
  }
  GetProjectSiteAssetBySerialNumber(SerialNumber: string): Observable<ProjectSiteAsset> {
    return this.httpClient.get<ProjectSiteAsset>(`${environment.GetProjectSiteAssetBySerialNumber}/` + SerialNumber, this.httpHeader)
  }
  GetAllAssetsSerialsByAssetId(AssetId: number): Observable<ProjectSiteAsset[]> {
    return this.httpClient.get<ProjectSiteAsset[]>(`${environment.GetAllAssetsSerialsByAssetId}/` + AssetId, this.httpHeader)
  }
  GetAllProjectSiteAssetBySiteId(SiteId: number,ProjectId): Observable<ListProjectSiteAssetClients[]> {
    return this.httpClient.get<ListProjectSiteAssetClients[]>(`${environment.GetAllProjectSiteAssetBySiteId}/` + SiteId+"/"+ProjectId, this.httpHeader)
  }
  GetAllProjectSiteAssetByProjectId(ProjectId: number): Observable<ListProjectSiteAssetClients[]> {
    return this.httpClient.get<ListProjectSiteAssetClients[]>(`${environment.GetAllProjectSiteAssetByProjectId}/` + ProjectId, this.httpHeader)
  }
}