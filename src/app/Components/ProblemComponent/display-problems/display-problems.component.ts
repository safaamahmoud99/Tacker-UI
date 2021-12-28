
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { from } from 'rxjs';
import { Table } from 'primeng/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/Shared/Services/auth.service';
import { Problem } from 'src/Shared/Models/problem';
import { DepartmentService } from 'src/Shared/Services/department.service';
import { ProblemServiceService } from 'src/Shared/Services/problem-service.service';
@Component({
  selector: 'app-display-problems',
  templateUrl: './display-problems.component.html',
  styleUrls: ['./display-problems.component.css']
})
export class DisplayProblemsComponent implements OnInit {

  lstProblemss:Problem[]
  problemObj:Problem
  displayBasic: boolean;
  loading: boolean = true;
  constructor(private problemservice:ProblemServiceService,private router: Router,private authservice:AuthService,
    private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.problemObj = {
      id:0,problemName:''
    }
    this.problemservice.GetAllProblems().subscribe(
      data=>{
        this.lstProblemss=data,
        this.loading = false;
      },
      err=>console.log(err)

    )
  }


  showBasicDialog(id) {
    this.displayBasic = true;
    this.problemservice.GetProblemById(id).subscribe(
        data => { this.problemObj = data, console.log(data) },
        error => { console.log(error) }
    )
}

confirm(id) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
            this.problemservice.deleteProblem(id).subscribe(
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
}}
