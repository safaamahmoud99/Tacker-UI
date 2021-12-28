import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { department } from 'src/Shared/Models/department';
import { DepartmentService } from 'src/Shared/Services/department.service';
@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css']
})
export class EditDepartmentComponent implements OnInit {
  lstDepts:department[]
  departmentObj:department
  DepartmentID = this.activeRoute.snapshot.params['id'];

  constructor(private departmentService: DepartmentService,private router: Router
    , private activeRoute: ActivatedRoute,
    private confirmationService: ConfirmationService, private messageService: MessageService) {
      
     }


    ngOnInit(): void {
      this.departmentObj = {
        id:0,name:''
      }
      this.departmentService.getDepartmentByID(this.DepartmentID).subscribe(
        data=>{this.departmentObj=data},
        err=>console.log(err)
  
      )
    }
    update() {
      this.departmentService.updateDepartment(this.DepartmentID,this.departmentObj).subscribe(
        res => {
          this.messageService.add({ severity: 'info', summary: 'Record Updated!', detail: 'Record Updated!' });
          this.router.navigate(['home/DisplayDepartments']);
        },
        error => console.log(error),
      );
    }
    showSuccess() {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
    }
  
    showInfo() {
      this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content' });
    }
  
    showWarn() {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Message Content' });
    }
  
    showError() {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
    }
  
    showTopLeft() {
      this.messageService.add({ key: 'tl', severity: 'info', summary: 'Info', detail: 'Message Content' });
    }
  
    showTopCenter() {
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Message Content' });
    }
  
    showBottomCenter() {
      this.messageService.add({ key: 'bc', severity: 'info', summary: 'Info', detail: 'Message Content' });
    }
  
    showConfirm() {
      this.messageService.clear();
      this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed' });
    }
  
    showMultiple() {
      this.messageService.addAll([
        { severity: 'info', summary: 'Message 1', detail: 'Message Content' },
        { severity: 'info', summary: 'Message 2', detail: 'Message Content' },
        { severity: 'info', summary: 'Message 3', detail: 'Message Content' }
      ]);
    }
  
    showSticky() {
      this.messageService.add({ severity: 'info', summary: 'Sticky', detail: 'Message Content', sticky: true });
    }
  
    onConfirm() {
      this.messageService.clear('c');
    }
  
    onReject() {
      this.messageService.clear('c');
    }
  
    clear() {
      this.messageService.clear();
    }
  
}
