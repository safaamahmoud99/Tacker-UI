import { TestBed } from '@angular/core/testing';

import { OriginsService } from './origins.service';

describe('OriginsService', () => {
  let service: OriginsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OriginsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
