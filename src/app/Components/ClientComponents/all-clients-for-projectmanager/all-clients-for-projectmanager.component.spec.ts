import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllClientsForProjectmanagerComponent } from './all-clients-for-projectmanager.component';

describe('AllClientsForProjectmanagerComponent', () => {
  let component: AllClientsForProjectmanagerComponent;
  let fixture: ComponentFixture<AllClientsForProjectmanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllClientsForProjectmanagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllClientsForProjectmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
