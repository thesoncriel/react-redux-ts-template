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
 * 설정하는 장소는 Next js SSR 기준으로 App.getInitialProps 이다.
 *
 * client side 에서 동작 시 무시한다.
 *
 * @param ua 적용 할 user agent 정보
 */
export function setUserAgent(ua?: string) {
  if (isServer && ua) {
    userAgent = ua;
  }
}

/**
 * user agent 정보를 가져 온다.
 *
 * server side 일 경우, 수행전 반드시 setUserAgent 로 값을 주어야 하며
 *
 * client side 는 자동으로 window.navigator.userAgent 값을 전달한다.
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
 * user-agent 정보를 이용하여 태블릿 여부를 판단한다.
 *
 * TODO: 아직 Android 태블릿 여부는 확인이 불가하다. (ipad 만 가능)
 */
export function isTablet() {
  const ua = userAgent;

  if (!ua) {
    return false;
  }

  return /iPad/.test(ua);
}

/**
 * user-agent 정보를 이용하여 ios 여부를 판단한다.
 */
export function isIOS() {
  const ua = userAgent;

  if (!ua) {
    return false;
  }

  return /iPad|iPhone|iPad/.test(ua);
}

/**
 * user-agent 정보를 이용하여 native app 여부를 판단한다.
 */
export function isNativeApp() {
  const ua = userAgent;

  if (!ua) {
    return false;
  }

  return /NaviveApp/.test(ua);
}