import { TestBed } from '@angular/core/testing';

import { SiteClientsService } from './site-clients.service';

describe('SiteClientsService', () => {
  let service: SiteClientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteClientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
