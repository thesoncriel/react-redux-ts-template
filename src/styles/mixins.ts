import {
  DESKTOP_MIN_WIDTH,
  MOBILE_MIN_WIDTH,
  MOBILE_SMALL_MIN_WIDTH,
  TABLET_MIN_WIDTH,
  TABLET_SMALL_MIN_WIDTH,
} from './constants/device-sizes';

/**
 * 믹스인으로 쓰일 스타일은 여기에 정의한다.
 * 반드시 접두어가 mx 로 시작되도록 작성한다.
 */
function getMediaQuery(min: number, max?: number) {
  return `@media screen and (min-width: ${min}px)${
    max ? ' and (max-width: ' + max + 'px)' : ''
  }`;
}

/**
 * 화면 사이즈별 미디어 쿼리를 적용 시킨다.
 */
export const mxBreakpoint = {
  /**
   * 데스크탑 미디어쿼리. 1025px 이상
   */
  desktop: getMediaQuery(DESKTOP_MIN_WIDTH),
  /**
   * 태블릿 미디어쿼리. 961px 이상
   */
  tablet: getMediaQuery(TABLET_MIN_WIDTH, DESKTOP_MIN_WIDTH - 1),
  /**
   * 소형 태블릿 미디어쿼리. 641px 이상
   */
  tabletSm: getMediaQuery(TABLET_SMALL_MIN_WIDTH, TABLET_MIN_WIDTH - 1),
  /**
   * 모바일 미디어쿼리. 481px 이상
   */
  mobile: getMediaQuery(MOBILE_MIN_WIDTH, TABLET_SMALL_MIN_WIDTH - 1),
  /**
   * 소형 모바일 미디어쿼리. 320px 이상
   */
  mobileSm: getMediaQuery(MOBILE_SMALL_MIN_WIDTH, MOBILE_MIN_WIDTH - 1),
};
