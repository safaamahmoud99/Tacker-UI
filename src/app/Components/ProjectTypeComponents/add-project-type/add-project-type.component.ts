import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { projectType } from 'src/Shared/Models/projectType';
import { ProjectTypeService } from 'src/Shared/Services/project-type.service';
@Component({
  selector: 'app-add-project-type',
  templateUrl: './add-project-type.component.html',
  styleUrls: ['./add-project-type.component.css']
})
export class AddProjectTypeComponent implements OnInit {
  lstProjectTypes:projectType[]
  ProjectTypeObj:projectType
  constructor(private router: Router,private projectTypeService:ProjectTypeService
    , private activeRoute: ActivatedRoute,
    private confirmationService: ConfirmationService, private messageService: MessageService) { }
    ngOnInit(): void {
      this.ProjectTypeObj = {
        id:0,typeName:''
      }
      this.projectTypeService.GetAllProjectTypes().subscribe(
        data=>{this.lstProjectTypes=data},
        err=>console.log(err)
  
      )
    }
    Add(){
      this.projectTypeService.AddprojectType(this.ProjectTypeObj).subscribe(e=>{
        console.log(this.ProjectTypeObj),
        this.router.navigate(['home/ProjectTypes']);
  
      })
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
