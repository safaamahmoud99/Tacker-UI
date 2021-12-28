import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DueDateCategoryComponent } from './due-date-category.component';

describe('DueDateCategoryComponent', () => {
  let component: DueDateCategoryComponent;
  let fixture: ComponentFixture<DueDateCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DueDateCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DueDateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
