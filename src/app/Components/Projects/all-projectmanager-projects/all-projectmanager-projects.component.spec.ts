import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProjectmanagerProjectsComponent } from './all-projectmanager-projects.component';

describe('AllProjectmanagerProjectsComponent', () => {
  let component: AllProjectmanagerProjectsComponent;
  let fixture: ComponentFixture<AllProjectmanagerProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllProjectmanagerProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProjectmanagerProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
