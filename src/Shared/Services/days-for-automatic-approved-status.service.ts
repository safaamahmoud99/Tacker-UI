import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { daysForAutomaticApprovedStatus} from '../Models/daysForAutomaticApprovedStatus';
@Injectable({
  providedIn: 'root'
})
export class DaysForAutomaticApprovedStatusService {
  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };
  GetAllDaysForAutomaticApprovedStatus(): Observable<daysForAutomaticApprovedStatus[]> {
    return this.httpClient.get<daysForAutomaticApprovedStatus[]>(`${environment.DaysForAutomaticApprovedStatus}`, this.httpHeader);
  }
  GetDaysforAutomaticApprovedbyId( ID: number): Observable<daysForAutomaticApprovedStatus> {
    return this.httpClient.get<daysForAutomaticApprovedStatus>(`${environment.DaysForAutomaticApprovedStatus}/` +ID, this.httpHeader)
  }
  updateApprovedDays(id: Number, daysForAutomaticApprovedStatus: daysForAutomaticApprovedStatus): Observable<daysForAutomaticApprovedStatus> {
    return this.httpClient.put<daysForAutomaticApprovedStatus>(`${environment.DaysForAutomaticApprovedStatus}/` + id, daysForAutomaticApprovedStatus, this.httpHeader);
  }
}
