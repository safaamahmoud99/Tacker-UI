import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { assignedRequests } from '../Models/assignedRequest';

@Injectable({
  providedIn: 'root'
})
export class AssignedRequestsService {

  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };
  AssignedRequest(reqAssigned): Observable<assignedRequests> {
    return this.httpClient.post<assignedRequests>(`${environment.assignedRequests}`,reqAssigned, this.httpHeader);
  }
}
