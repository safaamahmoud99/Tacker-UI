import { TestBed } from '@angular/core/testing';

import { PasswordConfirmationService } from './password-confirmation.service';

describe('PasswordConfirmationService', () => {
  let service: PasswordConfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordConfirmationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
