import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { department } from "../../../../Shared/Models/department";
import { DepartmentService } from "../../../../Shared/Services/department.service";
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  lstDepts:department[]
  departmentObj:department
  constructor(private router: Router,private depatService:DepartmentService) { }

  ngOnInit(): void {
    this.departmentObj = {
      id:0,name:''
    }
    this.depatService.GetAllDepartmens().subscribe(e=>{
      this.lstDepts = e
    })
  }
  SaveDepToDB(){
    this.depatService.inserDepartment(this.departmentObj).subscribe(e=>{
      console.log(this.departmentObj),this.router.navigate(['home/DisplayDepartments']);

    })
  }
}
