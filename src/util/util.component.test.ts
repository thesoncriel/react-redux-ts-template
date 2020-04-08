import { cn } from './util.component';

describe('util.component.test', () => {
  describe('getClassNamesBy', () => {
    it('단일 문자열', () => {
      expect(cn('hana')).toBe('hana');
    });
    it('문자열 여러개', () => {
      expect(cn('bada', 'gang', 'soop')).toBe('bada gang soop');
    })
    it('단일 객체', () => {
      expect(cn({ market: true, pet: false, xen: undefined, city: true })).toBe('market city');
    })
    it('undefined, 문자열 및 객체 혼합', () => {
      expect(cn('single', { 'is-active': true, 'disabled': false, start: undefined }, undefined, '둘리')).toBe('single is-active 둘리');
    })
    it('인자 없음', () => {
      expect(cn()).toBe('');
    })
  });
});