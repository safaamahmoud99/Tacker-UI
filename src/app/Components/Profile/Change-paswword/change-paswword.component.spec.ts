import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePaswwordComponent } from './change-paswword.component';

describe('ChangePaswwordComponent', () => {
  let component: ChangePaswwordComponent;
  let fixture: ComponentFixture<ChangePaswwordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePaswwordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePaswwordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
