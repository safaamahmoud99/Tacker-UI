import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; 
import { city } from '../Models/city';
@Injectable({
  providedIn: 'root'
})
export class CityService {
  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };
  GetAllcities(): Observable<city[]> {
    return this.httpClient.get<city[]>(`${environment.Cities}`, this.httpHeader);
  }
  insertcity(city: city): Observable<city> {
    return this.httpClient.post<city>(`${environment.Cities}`, city, this.httpHeader);
  }
  deletecity(id: number): Observable<city> {
    return this.httpClient.delete<city>(`${environment.Cities}/`+ id, this.httpHeader);
  }
  updatecity(id: Number, city: city): Observable<city> {
    return this.httpClient.put<city>(`${environment.Cities}/`+ id,city, this.httpHeader);
  }
  GetcityById(cityID: number): Observable<city> {
    return this.httpClient.get<city>(`${environment.Cities}/`+ cityID, this.httpHeader)
  }
  filterCitiesbyGovbyid(id:number): Observable<city[]>
  {
    return this.httpClient.get<city[]>(`${environment.getCitiesbygovid}${id}`, this.httpHeader);
  }
}
