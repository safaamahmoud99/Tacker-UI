import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { requestStatus } from "../Models/requestStatus";

@Injectable({
  providedIn: 'root'
})
export class RequestStatusService {

  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };

  GetAllRequestStatus(): Observable<requestStatus[]> {
    return this.httpClient.get<requestStatus[]>(`${environment.requestStatus}`, this.httpHeader);
  }
  inserRequestStatus(reqStatus: requestStatus): Observable<any> {
    return this.httpClient.post<any>(`${environment.requestStatus}`, reqStatus, this.httpHeader);
  }
}
