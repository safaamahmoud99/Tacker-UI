import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRequesteComponent } from './create-requeste.component';

describe('CreateRequesteComponent', () => {
  let component: CreateRequesteComponent;
  let fixture: ComponentFixture<CreateRequesteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRequesteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRequesteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
