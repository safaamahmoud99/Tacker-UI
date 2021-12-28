import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTeamLeaderRequestsComponent } from './all-team-leader-requests.component';

describe('AllTeamLeaderRequestsComponent', () => {
  let component: AllTeamLeaderRequestsComponent;
  let fixture: ComponentFixture<AllTeamLeaderRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTeamLeaderRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTeamLeaderRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
