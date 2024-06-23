import { TestBed } from '@angular/core/testing';

import { MechanicServiceService } from './mechanic-service.service';

describe('MechanicServiceService', () => {
  let service: MechanicServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MechanicServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
