import { TestBed } from '@angular/core/testing';

import { CreateListApiService } from './create-list-api.service';

describe('CreateListApiService', () => {
  let service: CreateListApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateListApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
