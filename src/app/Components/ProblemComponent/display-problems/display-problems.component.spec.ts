import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayProblemsComponent } from './display-problems.component';

describe('DisplayProblemsComponent', () => {
  let component: DisplayProblemsComponent;
  let fixture: ComponentFixture<DisplayProblemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayProblemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayProblemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
