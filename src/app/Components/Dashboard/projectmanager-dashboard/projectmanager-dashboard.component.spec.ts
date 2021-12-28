import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectmanagerDashboardComponent } from './projectmanager-dashboard.component';

describe('ProjectmanagerDashboardComponent', () => {
  let component: ProjectmanagerDashboardComponent;
  let fixture: ComponentFixture<ProjectmanagerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectmanagerDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectmanagerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
