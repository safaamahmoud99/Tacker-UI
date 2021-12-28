import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAllClientsComponent } from './display-all-clients.component';

describe('DisplayAllClientsComponent', () => {
  let component: DisplayAllClientsComponent;
  let fixture: ComponentFixture<DisplayAllClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayAllClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAllClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
