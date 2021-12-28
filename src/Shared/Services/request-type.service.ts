import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { requestType } from "../Models/requestType";

@Injectable({
  providedIn: 'root'
})
export class RequestTypeService {
  
  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };

  GetAllRequestsTypes(): Observable<requestType[]> {
    return this.httpClient.get<requestType[]>(`${environment.requestTypes}`, this.httpHeader);
  }
  inserRequestType(reqType: requestType): Observable<any> {
    return this.httpClient.post<any>(`${environment.requestTypes}`, reqType, this.httpHeader);
  }
}
