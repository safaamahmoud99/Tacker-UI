import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAssignedRequestsComponent } from './employee-assigned-requests.component';

describe('EmployeeAssignedRequestsComponent', () => {
  let component: EmployeeAssignedRequestsComponent;
  let fixture: ComponentFixture<EmployeeAssignedRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAssignedRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAssignedRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
