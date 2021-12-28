import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDepartmentsComponent } from './display-departments.component';

describe('DisplayDepartmentsComponent', () => {
  let component: DisplayDepartmentsComponent;
  let fixture: ComponentFixture<DisplayDepartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayDepartmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayDepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
