import { LimitWordPipe } from './limit-word.pipe';

describe('LimitWordPipe', () => {
  it('create an instance', () => {
    const pipe = new LimitWordPipe();
    expect(pipe).toBeTruthy();
  });
});
