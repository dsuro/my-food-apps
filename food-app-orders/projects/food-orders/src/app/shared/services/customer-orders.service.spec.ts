/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomerOrdersService } from './customer-orders.service';

describe('Service: CustomerOrders', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerOrdersService]
    });
  });

  it('should ...', inject([CustomerOrdersService], (service: CustomerOrdersService) => {
    expect(service).toBeTruthy();
  }));
});
