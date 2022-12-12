import { TestBed } from '@angular/core/testing';

import { UsersTypingService } from './users-typing.service';

describe('UsersTypingService', () => {
  let service: UsersTypingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersTypingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
