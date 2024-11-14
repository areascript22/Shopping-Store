import { TestBed } from '@angular/core/testing';

import { FirebaseErrorCodesService } from './firebase-error-codes.service';

describe('FirebaseErrorCodesService', () => {
  let service: FirebaseErrorCodesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseErrorCodesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
