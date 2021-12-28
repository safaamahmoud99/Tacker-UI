import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { requestMode } from '../Models/requestMode';

@Injectable({
  providedIn: 'root'
})
export class RequestModeService {

  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };
  GetAllRequetsMode(): Observable<requestMode[]> {
    return this.httpClient.get<requestMode[]>(`${environment.reqMode}`, this.httpHeader);
  }
  AddReqMode(reqMode): Observable<requestMode> {
    return this.httpClient.post<requestMode>(`${environment.reqMode}`,reqMode, this.httpHeader);
  }
}
