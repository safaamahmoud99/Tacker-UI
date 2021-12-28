import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCreateRequestComponent } from './client-create-request.component';

describe('ClientCreateRequestComponent', () => {
  let component: ClientCreateRequestComponent;
  let fixture: ComponentFixture<ClientCreateRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientCreateRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientCreateRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
