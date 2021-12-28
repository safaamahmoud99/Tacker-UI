import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Gender } from 'src/Shared/Models/Gender'
import { MaritalStatus } from 'src/Shared/Models/marital-status'
import { SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/Shared/Services/employee.service';
import { DepartmentService } from 'src/Shared/Services/department.service';
import { department } from 'src/Shared/Models/department';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
  providers: [DatePipe]
})
export class AddEmployeeComponent implements OnInit {

  DepartmentList: department[];
  selectedFile: any;
  Employee: any;
  selectedGender: Gender;
  selectedMaritalStatus: MaritalStatus;
  genderType: Gender[] = [
    { name: 'Male' },
    { name: 'Female' }
  ];
  MaritalStatus: MaritalStatus[] = [
    { name: 'Single' },
    { name: 'Married' }
  ];
  fileToUpload: File;
  uploadedFiles: any[] = [];
  constructor(private departmentService: DepartmentService, private empService: EmployeeService, private router: Router) {
    this.Employee = {employeeName: '',Address: '', Email: '', MaritalStatus: 'Marital Status', Name: '',
      Phone: '', departmentId: 0, photo: 'dummyPerson.png', gender: 'Gender'
    };
    this.selectedGender = { name: '' };
    this.selectedMaritalStatus = { name: '' };
  }

  ngOnInit(): void {
    this.departmentService.GetAllDepartmens().subscribe(
      (res) => { this.DepartmentList = res;},
      (err) => { console.log(err) }
    );
  }
  add() {
    console.log(typeof (this.Employee.departmentId));
    this.Employee.departmentId = Number(this.Employee.departmentId);
    console.log(this.Employee);
    this.empService.AddEmployee(this.Employee).subscribe(
      res => { this.router.navigate(['home/employee']); },
      error => console.log(error),
    );
  }



  onFileSelected(files: FileList) {
    this.fileToUpload = files.item(0);
    const oldName = this.fileToUpload.name;
    const fileExtension = oldName.slice(oldName.lastIndexOf('.') - oldName.length);
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const lengthOfCode = 40;
    const newName = this.makeRandom(lengthOfCode, possible);

    console.log(this.fileToUpload.name);
    Object.defineProperty(this.fileToUpload, 'name', {
      writable: true,
      value: newName + fileExtension
    });
    console.log(this.fileToUpload.name);

    this.Employee.photo = this.fileToUpload.name;
    //alert(this.prd.Img);

    this.uploadFileToActivity();
  }
  uploadFileToActivity() {
    this.empService.postFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
      //c(data);
    }, error => {
      console.log(error);
    });
  }
  makeRandom(lengthOfCode, possible) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text;
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }
}
