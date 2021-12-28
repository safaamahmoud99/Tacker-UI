import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {ProjectDocuments} from '../Models/ProjectDocuments'
@Injectable({
  providedIn: 'root'
})
export class ProjectDocumentService {

  constructor(private httpClient : HttpClient) { }
  httpHeader={headers: new HttpHeaders({
    'content-type':'application/json',
    'Accept': '*/*'  
  })};

  postProjectDocumentByProjectID(projdoc:ProjectDocuments[]): Observable <any >{
  
    return this.httpClient.post<any> (`${environment.postProjectDocumentByProjectID}`,projdoc,this.httpHeader) ;
  }
//   upload(file):Observable<any> { 
  
//     // Create form data 
//     const formData = new FormData();  
      
//     // Store form name as "file" with file data 
//     formData.append("file", file, file.name); 
      
//     // Make http post request over api 
//     // with formData as req 
//     return this.http.post(this.baseApiUrl, formData) 
// } 
  addFile(file):Observable<any>{
    const formData = new FormData();  
    formData.append("file", file, file.name); 

    return this.httpClient.post(`${environment.uploadFile}`,formData,this.httpHeader)
  }
  GetAllDocumentsByProjectID(ProjectID:Number): Observable <ProjectDocuments[]>{
    return this.httpClient.get<ProjectDocuments[]> (`${environment.GetAllDocumentByProjectId}${ProjectID}`,this.httpHeader) ;
  }
  updatedocumentbyprojectid(documents:ProjectDocuments[]):Observable<ProjectDocuments[]>{
    return this.httpClient.put<ProjectDocuments[]>(`${environment.updatedocumectsbyprojectid}`,documents,this.httpHeader);
  }
  deletedocument(id:number):Observable<any>{ 
    return this.httpClient.delete<any>(`${environment.deletedocument}${id}`,this.httpHeader);
  }
  downloadInFile(fileName): any {
		return this.httpClient.get(`${environment.Domain}wwwroot/documentFiles/${fileName}`, this.httpHeader);
  }
}
