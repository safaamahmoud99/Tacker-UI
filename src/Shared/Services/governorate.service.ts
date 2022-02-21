import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Governorate } from '../Models/governorate';

@Injectable({
  providedIn: 'root'
})
export class GovernorateService {

  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };

  GetAllGovernorates(): Observable<Governorate[]> {
    return this.httpClient.get<Governorate[]>(`${environment.Governorates}`, this.httpHeader);
  }
  insertGovernorate(Governorate: Governorate): Observable<Governorate> {
    return this.httpClient.post<Governorate>(`${environment.Governorates}/`,Governorate, this.httpHeader);
  }
  deleteGovernorate(id: number): Observable<Governorate> {
    return this.httpClient.delete<Governorate>(`${environment.Governorates}/`+ id, this.httpHeader);
  }
  updateGovernorate(id: Number, gov: Governorate): Observable<Governorate> {
    return this.httpClient.put<Governorate>(`${environment.Governorates}/`+ id, gov, this.httpHeader);
  }
  GetGovernorateeById(GovernorateID: number): Observable<Governorate> {
    return this.httpClient.get<Governorate>(`${environment.Governorates}/`+ GovernorateID, this.httpHeader)
  }
}
