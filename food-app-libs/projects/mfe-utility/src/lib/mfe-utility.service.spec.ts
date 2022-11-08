import { TestBed } from '@angular/core/testing';

import { MfeUtilityService } from './mfe-utility.service';

describe('MfeUtilityService', () => {
  let service: MfeUtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MfeUtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
