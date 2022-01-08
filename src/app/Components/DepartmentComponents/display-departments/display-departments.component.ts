
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { from } from 'rxjs';
import { Table } from 'primeng/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/Shared/Services/auth.service';
import { department } from 'src/Shared/Models/department';
import { DepartmentService } from 'src/Shared/Services/department.service';
@Component({
    selector: 'app-display-departments',
    templateUrl: './display-departments.component.html',
    styleUrls: ['./display-departments.component.css']
})
export class DisplayDepartmentsComponent implements OnInit {
    lstDepts: department[]
    departmentObj: department
    displayBasic: boolean;
    loading: boolean = true;
    Editboolean: boolean;
    NewDialogbool: boolean;
    constructor(private depService: DepartmentService, private router: Router, private authservice: AuthService,
        private confirmationService: ConfirmationService, private messageService: MessageService) { }

    ngOnInit(): void {
        this.departmentObj = {
            id: 0, name: ''
        }
        this.depService.GetAllDepartmens().subscribe(
            data => {
                this.lstDepts = data,
                this.loading = false;
            },
            err => console.log(err)

        )
    }
    NewDialog() {
        this.NewDialogbool = true;
        this.departmentObj = {
            id:0,name:''
          }
    }
    add() {
        this.depService.inserDepartment(this.departmentObj).subscribe(
            res => {
                this.NewDialogbool = false;
                this.ngOnInit(),
                console.log("objectdept",this.departmentObj)
                this.messageService.add({ severity: 'info', summary: 'Record Added!', detail: 'Record Added!' });
            },
            error => console.log(error),
        );
    }
    EditDialog(id) {
        this.Editboolean = true;
        this.depService.getDepartmentByID(id).subscribe(
            data => { this.departmentObj = data },
            error => { console.log(error) }
        )
    }
    update(id) {
        console.log("id", id)
        this.depService.updateDepartment(id,this.departmentObj).subscribe(
            data => {
                this.ngOnInit()
                this.messageService.add({ severity: 'info', summary: 'Record Updated!', detail: 'Record Updated!' });
            },
            error => { console.log(error) }
        );
        this.Editboolean = false;
    }

    showBasicDialog(id) {
        this.displayBasic = true;
        this.depService.getDepartmentByID(id).subscribe(
            data => { this.departmentObj = data, console.log(data) },
            error => { console.log(error) }
        )
    }

    confirm(id) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to perform this action?',
            accept: () => {
                this.depService.deleteDepartment(id).subscribe(
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
