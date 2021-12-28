import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllClientRequestsComponent } from './all-client-requests.component';

describe('AllClientRequestsComponent', () => {
  let component: AllClientRequestsComponent;
  let fixture: ComponentFixture<AllClientRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllClientRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllClientRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
