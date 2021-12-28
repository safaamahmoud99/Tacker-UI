import { TestBed } from '@angular/core/testing';

import { RequestProblemService } from './request-problem.service';

describe('RequestProblemService', () => {
  let service: RequestProblemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestProblemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
