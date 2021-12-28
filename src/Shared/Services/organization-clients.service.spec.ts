import { TestBed } from '@angular/core/testing';

import { OrganizationClientsService } from './organization-clients.service';

describe('OrganizationClientsService', () => {
  let service: OrganizationClientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizationClientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
