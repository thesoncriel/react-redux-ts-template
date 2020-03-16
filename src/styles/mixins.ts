import {
  DESKTOP_MAX_WIDTH,
  MOBILE_LANDSCAPE_MIN_WIDTH,
  MOBILE_PORTRAIT_SMALL_MAX_WIDTH,
} from './variables';

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
   * 데스크탑 미디어쿼리. 1720px 이상
   */
  desktop: getMediaQuery(DESKTOP_MAX_WIDTH),
  /**
   * 태블릿 미디어쿼리. 1024px 이상
   */
  tablet: getMediaQuery(MOBILE_LANDSCAPE_MIN_WIDTH, DESKTOP_MAX_WIDTH - 1),
  /**
   * 아이패드가 새로로 보일 때 미디어 쿼리. 768 ~ 1023px
   */
  iPadPortrait: getMediaQuery(768, 1024 - 1),
  /**
   * 모바일 미디어쿼리. 0 ~ 799px
   */
  mobile: getMediaQuery(0, MOBILE_LANDSCAPE_MIN_WIDTH - 1),
  /**
   * 모바일 미디어쿼리 - 화면 큰 것들 (ex: 갤럭시S5, 아이폰6)
   */
  mobileMedium: getMediaQuery(
    MOBILE_PORTRAIT_SMALL_MAX_WIDTH,
    MOBILE_LANDSCAPE_MIN_WIDTH - 1,
  ),
  /**
   * 모바일 미디어쿼리 - 화면 작은 애들 (ex: 아이폰4~5)
   */
  mobileSmall: getMediaQuery(0, MOBILE_PORTRAIT_SMALL_MAX_WIDTH - 1),
  /**
   * 세로로 긴 것들 (ex: 아이폰X)
   */
  longHeight: '@media screen and (min-height: 700px)',
};
