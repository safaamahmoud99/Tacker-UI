import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllManagerRequestsComponent } from './all-manager-requests.component';

describe('AllManagerRequestsComponent', () => {
  let component: AllManagerRequestsComponent;
  let fixture: ComponentFixture<AllManagerRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllManagerRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllManagerRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
