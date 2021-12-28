import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientManagerRequestsComponent } from './client-manager-requests.component';

describe('ClientManagerRequestsComponent', () => {
  let component: ClientManagerRequestsComponent;
  let fixture: ComponentFixture<ClientManagerRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientManagerRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientManagerRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
