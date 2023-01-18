import { TestBed } from '@angular/core/testing';

import { ConnectStreamService } from './connect-stream.service';

describe('ConnectStreamService', () => {
  let service: ConnectStreamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectStreamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
