import { TestBed } from '@angular/core/testing';

import { CurrentsearchService } from './currentsearch.service';

describe('CurrentsearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrentsearchService = TestBed.get(CurrentsearchService);
    expect(service).toBeTruthy();
  });
});
