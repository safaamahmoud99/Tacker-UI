import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Problem } from 'src/Shared/Models/problem';
import { ProblemServiceService } from 'src/Shared/Services/problem-service.service';

@Component({
  selector: 'app-update-problem',
  templateUrl: './update-problem.component.html',
  styleUrls: ['./update-problem.component.css']
})
export class UpdateProblemComponent implements OnInit {

  lstProblems:Problem[]
  problemObj:Problem
  ProblemID = this.activeRoute.snapshot.params['id'];

  constructor(private problemservice: ProblemServiceService,private router: Router
    , private activeRoute: ActivatedRoute,
    private confirmationService: ConfirmationService, private messageService: MessageService) {
      
     }


    ngOnInit(): void {
      this.problemObj = {
        id:0,problemName:''
      }
      this.problemservice.GetProblemById(this.ProblemID).subscribe(
        data=>{this.problemObj=data},
        err=>console.log(err)
  
      )
    }
    update() {
      this.problemservice.updateProblem(this.ProblemID,this.problemObj).subscribe(
        res => {
          this.messageService.add({ severity: 'info', summary: 'Record Updated!', detail: 'Record Updated!' });
          this.router.navigate(['home/DisplayProblemsComponent']);
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
