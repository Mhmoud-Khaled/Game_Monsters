import { TestBed } from '@angular/core/testing';

import { GruadGuard } from './gruad.guard';

describe('GruadGuard', () => {
  let guard: GruadGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GruadGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
