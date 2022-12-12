import { TestBed } from '@angular/core/testing';

import { ChatObsService } from './chat-obs.service';

describe('ChatObsService', () => {
  let service: ChatObsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatObsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
