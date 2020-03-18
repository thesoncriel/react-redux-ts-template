import {
  DESKTOP_MAX_WIDTH,
  TABLET_PORTRAIT_MIN_WIDTH,
} from '../styles/constants/device-sizes';

// declare global {
//   interface Window {
//     navigator: Navigator;
//     location: Location;
//   }
// }

const isServer = typeof window === 'undefined';
let userAgent = isServer ? '' : window.navigator.userAgent;

/**
 * user agent 정보를 설정 한다.
 * 설정하는 장소는 Next js SSR 기준으로 App.getInitialProps
 * @param ua 적용 할 user agent 정보
 */
export function setUserAgent(ua?: string) {
  if (ua) {
    userAgent = ua;
  }
}

/**
 * user agent 정보를 가져 온다.
 */
export function getUserAgent() {
  return userAgent;
}

/**
 * user-agent 정보를 이용하여 단순 모바일인지 여부를 확인한다.
 *
 * 모바일 기종: 안드로이드 계열 전 기종, ios 를 사용하는 모든 기종 (아이폰, 아이패드, 아이팟 등)
 */
export function isMobile() {
  const ua = userAgent;

  if (!ua) {
    return false;
  }

  return /iPhone|iPod|Android/.test(ua);
}

/**
 * user-agent 정보를 이용하여
 */
export function isTablet() {
  const ua = userAgent;

  if (!ua) {
    return false;
  }

  return /iPad/.test(ua);
}

export function isTabletByWidth() {
  if (isServer) {
    return false;
  }
  return window.innerWidth < DESKTOP_MAX_WIDTH;
}

export function isMobileByWidth() {
  if (isServer) {
    return false;
  }
  return window.innerWidth < TABLET_PORTRAIT_MIN_WIDTH;
}

export function isIOS() {
  const ua = userAgent;

  if (!ua) {
    return false;
  }

  return /iPad|iPhone|iPad/.test(ua);
}
