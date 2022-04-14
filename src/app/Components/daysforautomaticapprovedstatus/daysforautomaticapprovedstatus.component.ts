import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { daysForAutomaticApprovedStatus } from 'src/Shared/Models/daysForAutomaticApprovedStatus';
import { DaysForAutomaticApprovedStatusService } from 'src/Shared/Services/days-for-automatic-approved-status.service';

@Component({
  selector: 'app-daysforautomaticapprovedstatus',
  templateUrl: './daysforautomaticapprovedstatus.component.html',
  styleUrls: ['./daysforautomaticapprovedstatus.component.css']
})
export class DaysforautomaticapprovedstatusComponent implements OnInit {
  lstdaysforautomaticApprovedstatus: daysForAutomaticApprovedStatus[];
  DaysforautomaticapprovedStatusObj:daysForAutomaticApprovedStatus;
  Editboolean: boolean;
  displayBasic: boolean;
  constructor(private daysforautomaticapprovedstatusService:DaysForAutomaticApprovedStatusService,private messageService: MessageService ) { 

  }

  ngOnInit(): void {
  this.DaysforautomaticapprovedStatusObj={id:0,days:0}
  this.daysforautomaticapprovedstatusService.GetAllDaysForAutomaticApprovedStatus().subscribe(
    e=>{
      this.lstdaysforautomaticApprovedstatus=e
    }
  )
  }
  showBasicDialog(id) {
    this.displayBasic = true;
    this.daysforautomaticapprovedstatusService.GetDaysforAutomaticApprovedbyId(id).subscribe(
      data => { this.DaysforautomaticapprovedStatusObj = data },
      error => { console.log(error) }
    );
  }
  EditDialog(id) {
    this.Editboolean = true;
    this.daysforautomaticapprovedstatusService.GetDaysforAutomaticApprovedbyId(id).subscribe(
      data => { this.DaysforautomaticapprovedStatusObj = data},
      error => { console.log(error) }
    // this.daysforautomaticapprovedstatusService.updateApprovedDays(id,this.DaysforautomaticapprovedStatusObj).subscribe(
    //   data => { this.DaysforautomaticapprovedStatusObj = data},
    //   error => { console.log(error) }
    )
  }
  update(id) {
    console.log("id",id)
    this.daysforautomaticapprovedstatusService.updateApprovedDays(id,this.DaysforautomaticapprovedStatusObj).subscribe(
      data => { this.ngOnInit()
        this.messageService.add({ severity: 'info', summary: 'Record Updated!', detail: 'Record Updated!' });
      },
      error => { console.log(error) }
    );
    this.Editboolean = false;
  }


}
