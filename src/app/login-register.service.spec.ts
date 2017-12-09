import { TestBed, inject } from '@angular/core/testing';

import { LoginRegisterService } from './login-register.service';

describe('LoginRegisterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginRegisterService]
    });
  });

  it('should be created', inject([LoginRegisterService], (service: LoginRegisterService) => {
    expect(service).toBeTruthy();
  }));
});
