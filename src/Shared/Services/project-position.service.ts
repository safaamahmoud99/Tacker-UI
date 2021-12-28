import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Position } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { projectPosition } from "./../Models/projectPosition";


@Injectable({
  providedIn: 'root'
})
export class ProjectPositionService {

  constructor(private httpClient : HttpClient) { }
  httpHeader={headers: new HttpHeaders({
    'content-type':'application/json',
    'Accept': '*/*'  
  })};
  GetAllProjectPosition(): Observable<projectPosition[]> {
    return this.httpClient.get<projectPosition[]>(`${environment.projectPositions}`, this.httpHeader);
  }
  getPositionByID(positionID:number)
  {
    return this.httpClient.get<projectPosition>(`${environment.projectPositions}${positionID}`,this.httpHeader) ;
  }
}
