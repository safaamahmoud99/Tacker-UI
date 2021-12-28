import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectmangerRequestsComponent } from './projectmanger-requests.component';

describe('ProjectmangerRequestsComponent', () => {
  let component: ProjectmangerRequestsComponent;
  let fixture: ComponentFixture<ProjectmangerRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectmangerRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectmangerRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
