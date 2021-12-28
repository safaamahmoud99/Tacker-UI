import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { requestPeriority } from "../Models/requestPeriority";

@Injectable({
  providedIn: 'root'
})
export class RequestPeriorityService {
  
  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };

  GetAllRequestPeriorties(): Observable<requestPeriority[]> {
    return this.httpClient.get<requestPeriority[]>(`${environment.requestPeriorities}`, this.httpHeader);
  }
  inserRequestPeriority(reqPeriorty: requestPeriority): Observable<any> {
    return this.httpClient.post<any>(`${environment.requestPeriorities}`, reqPeriorty, this.httpHeader);
  }
}
