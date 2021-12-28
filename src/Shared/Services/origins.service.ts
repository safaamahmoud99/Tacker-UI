import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Origins } from '../Models/Origins';
@Injectable({
  providedIn: 'root'
})
export class OriginsService {
  constructor(private httpClient : HttpClient) { }
  httpHeader={headers: new HttpHeaders({
    'content-type':'application/json',
    'Accept': '*/*'  
  })};
  GetAllOrigins(): Observable <Origins[]>{
    return this.httpClient.get<Origins[]> (`${environment.Origins}`,this.httpHeader) ;
  }
  inserOrigin(client:Origins): Observable <any>{
    return this.httpClient.post<any> (`${environment.Origins}`,client,this.httpHeader) ;
  }

  deleteOrigin(id:Origins):Observable<any>{ 
    return this.httpClient.delete<any>(`${environment.Origins}${id}`,this.httpHeader);
  }

  updateOrigin(id:Number,Origins:Origins):Observable<Origins>{
    return this.httpClient.put<Origins>(`${environment.Origins}`+ id,Origins,this.httpHeader);
  }
  GetOriginById(OriginsId: number): Observable<any> {
    return this.httpClient.get<Origins>(`${environment.Origins}${OriginsId}`, this.httpHeader)
  }
}
