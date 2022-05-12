import { TestBed } from '@angular/core/testing';

import { DatiServiceService } from './dati-service.service';

describe('DatiServiceService', () => {
  let service: DatiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
