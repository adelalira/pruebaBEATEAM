import { TestBed } from '@angular/core/testing';

import { BEATEAMService } from './beateam.service';

describe('BEATEAMService', () => {
  let service: BEATEAMService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BEATEAMService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
