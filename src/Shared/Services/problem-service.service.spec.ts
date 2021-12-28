import { TestBed } from '@angular/core/testing';

import { ProblemServiceService } from './problem-service.service';

describe('ProblemServiceService', () => {
  let service: ProblemServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProblemServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
