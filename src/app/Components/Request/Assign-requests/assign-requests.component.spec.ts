import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRequestsComponent } from './assign-requests.component';

describe('AssignRequestsComponent', () => {
  let component: AssignRequestsComponent;
  let fixture: ComponentFixture<AssignRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
