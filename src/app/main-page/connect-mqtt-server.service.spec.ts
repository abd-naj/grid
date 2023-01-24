import { TestBed } from '@angular/core/testing';

import { ConnectMqttServerService } from './connect-mqtt-server.service';

describe('ConnectMqttServerService', () => {
  let service: ConnectMqttServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectMqttServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
