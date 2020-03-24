import { padNumber } from './util.format';

describe('padNumber', () => {
  it('입력: 3', () => {
    expect(padNumber(3)).toBe('03');
  });
  it('입력: 11 ', () => {
    expect(padNumber(11)).toBe('11');
  });
  it('숫자: 440, 자릿수: 5', () => {
    expect(padNumber(440, 5)).toBe('00440');
  });
  it('입력: -6 입력 시 오류 발생.', () => {
    expect(() => padNumber(-6)).toThrow();
  });
});
