/* eslint-disable valid-typeof */
import appConfig from '../common/app.config';

const UNDEFINED = 'undefined';
const IS_SERVER = typeof window === UNDEFINED;
const IS_STORAGE_AVAILABLE = typeof localStorage !== UNDEFINED;
let hasFileConstructor: boolean | null = null;

declare global {
  interface Window {
    location: Location;
  }
}

/**
 * 서버 환경인지 확인한다.
 */
export const isServer = () => IS_SERVER;

/**
 * https 프로토콜로 왔는지 여부를 확인하여 아닐경우 https 로 다시 요청토록 한다.
 * 서버 및 개발 환경이 아닐때만 동작 한다.
 */
export function checkHttps() {
  if (!isServer() && appConfig.production) {
    const location = window.location;
    if (location.protocol === 'http:') {
      location.replace(location.href.replace('http:', 'https:'));
    }
  }
}

/**
 * File 생성자를 지원하는지 확인한다.
 */
export function isFileAvailable() {
  if (isServer()) {
    return false;
  }

  if (hasFileConstructor !== null) {
    return hasFileConstructor;
  }

  try {
    hasFileConstructor = !!new File([''], 'a.txt');
  } catch (error) {
    hasFileConstructor = false;
  }

  return hasFileConstructor;
}

/**
 * 로컬 스토리지 사용 가능 여부를 확인한다.
 */
export const isStorageAvailable = () => IS_STORAGE_AVAILABLE;

/**
 * 아무것도 수행하지 않는 함수.
 */
// tslint:disable-next-line:no-empty
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const nop = () => {};

/**
 * window.setTimeout 의 wapping function.
 * @param callback 일정시간 후 수행될 콜백 함수.
 * @param time 콜백을 수행시키기 까지 지연시킬 시간. (밀리초)
 */
export function doSetTimeout(callback: () => void, time: number): number {
  return setTimeout(callback, time) as any;
}

/**
 * 값이 undefined 이거나 null 인지 여부를 확인한다.
 * @param val 확인 할 값.
 */
export function isNil(val: any) {
  return (
    typeof val === 'undefined' ||
    val === null ||
    val === UNDEFINED ||
    val === 'null'
  );
}

/**
 * 문자열로 구성된 true/false 를 실제 boolean 값으로 변환 해 준다.
 * @param val 변환 할 값.
 */
export function parseBoolean(val: any) {
  return val === 'true' || val === true;
}

/**
 * 특정 객체내에 프로퍼티가 하나도 없는지 여부를 확인한다.
 *
 * 비어있다면 true, 아니면 false 를 반환 한다.
 *
 * {} 와 같은 Plain Object 타입이 아닐 경우 무조건 false 를 반환 한다.
 * @param val 비어있는지 여부를 확인 할 객체
 */
export function isEmpty(val: any) {
  return Object.keys(val).length === 0 && val.constructor === Object;
}

/**
 * 객체의 각 항목들을 검사하여 비어 있다면 그 항목 자체가 지워진 객체를 넘겨준다.
 * @param origin
 */
export function cleanUpNil<T, R = T>(origin: T): R {
  const keys  = Object.keys(origin);
  const len = keys.length;
  const target: any = { ...origin };
  let key = '';
  let val: any;

  for (let i = 0; i < len; i++) {
    key = keys[i];
    val = target[key];

    if (val === '' || isNil(val) || val === 'NaN') {
      delete target[key];
    }
  }

  return target;
}

/**
 * 특정 URL에서 파일명만 가져온다.
 * @param url 파일명을 가져오고싶은 경로
 */
export function getFileName(url: string) {
  return url.substring(url.lastIndexOf('/') + 1);
}
