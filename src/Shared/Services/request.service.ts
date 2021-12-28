import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { projectTeamVM } from '../Models/projectTeamVM';
import { request } from "../Models/request";
import { RequestImage } from '../Models/RequestImages';
import { RequestProblems } from '../Models/requestProblems';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };

  GetAllRequests(): Observable<request[]> {
    return this.httpClient.get<request[]>(`${environment.requests}`, this.httpHeader);
  }
  // GetAllStackholdersByProjectID(ProjectID:Number): Observable <stackholder[]>{
  //   return this.httpClient.get<stackholder[]> (`${environment.GetAllStackholdersByProjectID}${ProjectID}`,this.httpHeader) ;
  // }
  inserRequest(req): Observable<request> {
    return this.httpClient.post<request>(`${environment.requests}`, req, this.httpHeader);
  }

  insertListOfrequests(requests: request[]): Observable<any> {
    return this.httpClient.post<any>(`${environment.requests}`, requests, this.httpHeader);
  }
  GetRequestsByClientId(clientID: Number): Observable<any> {
    return this.httpClient.get<request[]>(`${environment.GetAllRequestByClientId}${clientID}`, this.httpHeader);
  }
  GetAllRequestByProjectId(ProjectId: Number): Observable<request[]> {
    return this.httpClient.get<request[]>(`${environment.GetAllRequestByProjectId}${ProjectId}`, this.httpHeader);
  }
  addListRequestImages(images: RequestImage[]): Observable<RequestImage[]> {
    return this.httpClient.post<RequestImage[]>(`${environment.addRequstImages}`, images, this.httpHeader);
  }
  GetRequestImageByRequestId(requestId: Number): Observable<any> {
    return this.httpClient.get<RequestImage[]>(`${environment.GetRequestImageByRequestId}${requestId}`, this.httpHeader);
  }
  GetAllRequestByProjectSiteAssetId(ProjectSiteAssetId: number): Observable<request[]> {
    return this.httpClient.get<request[]>(`${environment.GetAllRequestByProjectSiteAssetId}${ProjectSiteAssetId}`, this.httpHeader);
  }
    GetAllRequestByEmployeeId(empID: number): Observable<any> {
    return this.httpClient.get<request[]>(`${environment.GetAllRequestByEmployeeId}${empID}`, this.httpHeader);
  }
  GetAllRequestByProjectTeamId(projectTeamIdS:projectTeamVM): Observable<any> {
    return this.httpClient.post<request[]> (`${environment.GetAllRequestByProjectTeamId}`,projectTeamIdS,this.httpHeader) ;
  }
  GetRequestByRequestId(requestId: number): Observable<any> {
    return this.httpClient.get<request[]>(`${environment.requests}${requestId}`, this.httpHeader);
  }
  updateRequest(id:number,request:request):Observable<request>{
    return this.httpClient.put<request>(`${environment.updateRequest}${id}`,request,this.httpHeader);
  }
  GetProblemByEmployeeIdAndRequestId(empID: number,reqId:number): Observable<any> {
    return this.httpClient.get<RequestProblems[]>(`${environment.GetProblemByEmployeeIdAndRequestId}${empID}/${reqId}`, this.httpHeader);
  }
  GetAllRequestByRequestStatus(requestStatusID:number): Observable<any> {
    return this.httpClient.get<any>(`${environment.GetAllRequestByRequestStatus}${requestStatusID}`, this.httpHeader);
  }
  GetRequestByRequestStatusAndProjectTeamId(requestStatusID:number,projectTeamId:number): Observable<any> {
    return this.httpClient.get<any>(`${environment.GetAllRequestByRequestStatusAndProjectTeamId}${requestStatusID}/${projectTeamId}`, this.httpHeader);
  }
}
