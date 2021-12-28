import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProblemServiceService } from 'src/Shared/Services/problem-service.service';
import { Problem } from "../../../../Shared/Models/problem";

@Component({
  selector: 'app-add-problem',
  templateUrl: './add-problem.component.html',
  styleUrls: ['./add-problem.component.css']
})
export class AddProblemComponent implements OnInit {
  lstProblems:Problem[]
  problemObj:Problem
  constructor(private router: Router,private problemservice:ProblemServiceService) { }

  ngOnInit(): void {
    this.problemObj = {
      id:0,problemName:''
    }
    this.problemservice.GetAllProblems().subscribe(e=>{
      this.lstProblems = e
    })
  }
  SaveDepToDB(){
    this.problemservice.AddProblem(this.problemObj).subscribe(e=>{
      console.log(this.problemObj),this.router.navigate(['home/DisplayProblemsComponent']);

    })
  }
}

