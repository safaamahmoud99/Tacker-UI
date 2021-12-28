import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brand } from '../Models/Brand';
@Injectable({
  providedIn: 'root'
})
export class BrandService {
  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };
  GetAllBrands(): Observable<Brand[]> {
    return this.httpClient.get<Brand[]>(`${environment.Brand}`, this.httpHeader);
  }
  insertBrand(Brand: Brand): Observable<Brand> {
    return this.httpClient.post<Brand>(`${environment.Brand}`, Brand, this.httpHeader);
  }
  deleteBrand(id: number): Observable<Brand> {
    return this.httpClient.delete<Brand>(`${environment.Brand}/` + id, this.httpHeader);
  }
  updateBrand(id: Number, Brand: Brand): Observable<Brand> {
    return this.httpClient.put<Brand>(`${environment.Brand}/` + id, Brand, this.httpHeader);
  }
  GetBrandById(BrandID: number): Observable<Brand> {
    return this.httpClient.get<Brand>(`${environment.Brand}/` + BrandID, this.httpHeader)
  }
}