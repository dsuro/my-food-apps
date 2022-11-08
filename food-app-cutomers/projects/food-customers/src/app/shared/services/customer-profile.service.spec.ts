/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomerProfileService } from './customer-profile.service';

describe('Service: CustomerProfile', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerProfileService]
    });
  });

  it('should ...', inject([CustomerProfileService], (service: CustomerProfileService) => {
    expect(service).toBeTruthy();
  }));
});
