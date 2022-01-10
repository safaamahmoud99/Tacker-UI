import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { from } from 'rxjs';
import { Table } from 'primeng/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/Shared/Services/auth.service';
import { projectType } from 'src/Shared/Models/projectType';
import{ProjectTypeService} from 'src/Shared/Services/project-type.service';
@Component({
  selector: 'app-project-type',
  templateUrl: './project-type.component.html',
  styleUrls: ['./project-type.component.css']
})
export class ProjectTypeComponent implements OnInit {

  lstProjectTypes:projectType[]
  ProjectTypeObj:projectType
  displayBasic: boolean;
  loading: boolean = true;
  Editboolean: boolean;
  NewDialogbool: boolean;
  constructor(private projectTypeService:ProjectTypeService,private router: Router,private authservice:AuthService,
    private confirmationService: ConfirmationService, private messageService: MessageService) { }
  ngOnInit(): void {
    this.ProjectTypeObj={id:0,typeName:''}
    this.lstProjectTypes = []
    this.projectTypeService.GetAllProjectTypes().subscribe(
      res=>{this.lstProjectTypes=res,console.log("lstProjectTypes",res)
      this.loading=false},
      err=>console.log(err)
    )
  }
  NewDialog() {
    this.NewDialogbool = true;
    this.ProjectTypeObj={id:0,typeName:''}

}
add() {
    this.projectTypeService.AddprojectType(this.ProjectTypeObj).subscribe(
        res => {
            this.NewDialogbool = false;
            this.ngOnInit(),
                this.messageService.add({ severity: 'info', summary: 'Record Added!', detail: 'Record Added!' });
        },
         error =>{
            //  console.log("error",error.error.message),
        //this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
    }
        
    );
}
EditDialog(id) {
    this.Editboolean = true;
    this.projectTypeService.GetprojectTypeByID(id).subscribe(
        data => { this.ProjectTypeObj = data },
        error => {// console.log("error",error.error.message)
         }
    )
}
update(id) {
    console.log("id", id)
    this.projectTypeService.UpdateprojectType(id, this.ProjectTypeObj).subscribe(
        data => {
            this.ngOnInit()
            this.messageService.add({ severity: 'info', summary: 'Record Updated!', detail: 'Record Updated!' });
            this.Editboolean = false;
        },
        error => { console.log("error",error.error.message) }
    );
    
}
  showBasicDialog(id) {
    this.displayBasic = true;
    this.projectTypeService.GetprojectTypeByID(id).subscribe(
        data => { this.ProjectTypeObj = data, console.log(data) },
        error => { console.log(error) }
    )
}

confirm(id) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
            this.projectTypeService.DeleteprojectType(id).subscribe(
                data => {
                    this.ngOnInit(),
                        this.messageService.add({ severity: 'info', summary: 'Record Deleted!', detail: 'Record Deleted!' });
                }
            )
        }
    });
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