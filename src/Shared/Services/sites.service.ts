import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sites } from '../Models/Sites';
@Injectable({
  providedIn: 'root'
})
export class SitesService {

  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };
  GetAllSites(): Observable<Sites[]> {
    return this.httpClient.get<Sites[]>(`${environment.Sites}`, this.httpHeader);
  }
  insertSite(Sites: Sites): Observable<Sites> {
    return this.httpClient.post<Sites>(`${environment.Sites}`, Sites, this.httpHeader);
  }
  deleteSite(id: number): Observable<Sites> {
    return this.httpClient.delete<Sites>(`${environment.Sites}/` + id, this.httpHeader);
  }
  updateSite(id: Number, Site: Sites): Observable<Sites> {
    return this.httpClient.put<Sites>(`${environment.Sites}/` + id, Site, this.httpHeader);
  }
  GetSiteById(SitesID: number): Observable<Sites> {
    return this.httpClient.get<Sites>(`${environment.Sites}/` + SitesID, this.httpHeader)
  }
}