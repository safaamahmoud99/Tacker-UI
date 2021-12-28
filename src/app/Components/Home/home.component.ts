import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
// import {PharmacyService} from '../../services/pharmacy.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private routee: Router) { }
  role:string
  pharmacyType:string

  pharmacyID:Number
  ngOnInit() {
  this.role=localStorage.getItem("roles")
  }
}
