import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamleaderDashboardComponent } from './teamleader-dashboard.component';

describe('TeamleaderDashboardComponent', () => {
  let component: TeamleaderDashboardComponent;
  let fixture: ComponentFixture<TeamleaderDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamleaderDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamleaderDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
