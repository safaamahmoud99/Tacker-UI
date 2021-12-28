import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignemployeeRequestComponent } from './assignemployee-request.component';

describe('AssignemployeeRequestComponent', () => {
  let component: AssignemployeeRequestComponent;
  let fixture: ComponentFixture<AssignemployeeRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignemployeeRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignemployeeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
