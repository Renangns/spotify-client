import { TestBed } from '@angular/core/testing';

import { CallbackResolver } from './callback.resolver';

describe('CallbackResolver', () => {
  let resolver: CallbackResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CallbackResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
