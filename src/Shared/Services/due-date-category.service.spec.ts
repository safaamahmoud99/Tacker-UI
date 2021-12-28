import { TestBed } from '@angular/core/testing';

import { DueDateCategoryService } from './due-date-category.service';

describe('DueDateCategoryService', () => {
  let service: DueDateCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DueDateCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
