import { isNil } from './util.common';

/**
 * 값의 길이를 확인한다.
 * 기본적으로 내부에 validEmpty 를 함께 수행 한다.
 * @param min 최소 길이
 * @param max 최대 길이
 */
export const validLength = (min: number, max: number) => (val: string) => {
  return validEmpty(val) && (val.length >= min) && (val.length <= max);
};

/**
 * 이메일 유효성을 검증한다.
 * 좌측에 숫자/문자/ 언더바(_) 및 하이픈(-) 만 허용한다.
 * 내부적으로 validLength 를 수행하여 7~100 자 까지 인지를 함께 검증한다.
 * @param val
 */
export function validEmail(val: string) {
  return validLength(7, 100)(val) && (
    // tslint:disable-next-line:max-line-length
    // /^(([^<>()\[\]\.,;:\molecules@\"]+(\.[^<>()\[\]\.,;:\molecules@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\molecules@\"]+\.)+[^<>()[\]\.,;:\molecules@\"]{2,10})$/i
    // /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/
    /^(\w|-|\.)+@\w+([.-]?\w+)*(\.\w{2,5})+$/
  ).test(val);
}

/**
 * 값이 비어있는지 여부를 확인한다.
 * undefined, null 여부도 확인하며, 값이 'undefined', 'null' 이라는 문자열로 된 것인지도 확인 한다.
 * @param val
 */
export function validEmpty(val: string) {
  return !isNil(val) && !!val;
}

/**
 * 비밀번호의 유효성을 체크한다. - 약한 버전 - -
 * 숫자, 영문 각각 1자 이상 포함되고
 * 총 길이가 6자~20자 까지 인지를 확인한다.
 * @param val
 */
export function validPasswordWeak(val: string) {
  //  숫자, 영문 대/소문자 및 특수문자가 모두 최소 1자 이상 포함되고
  // return (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,20})/).test(val);
  return (/^(?=.*[A-z])(?=.*[0-9])(?=.{6,20})/).test(val);
}

/**
 * 비밀번호의 유효성을 체크한다. - 강력 버전 - -
 * 숫자, 영문 대/소문자 및 특수문자가 모두 최소 1자 이상 포함되고
 * 총 길이가 6자~18자 까지 인지를 확인한다.
 * @param val
 */
export function validPassword(val: string) {
  return (/^(?=.*[A-z])(?=.*[!@#$%^*+-])(?=.*[0-9]).{6,18}$/).test(val);
}

/**
 * 주민번호의 유효성을 체크한다.
 * @param val 체크할 주민번호
 */
export function validJumin(val: string) {
  return (/^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))-[1-4][0-9]{6}$/).test(val);
}

/**
 * 한글 또는 영문으로 2글자 이상, 100글자 이하인지 확인한다.
 * @param val 확인할 값
 */
export function validKorEng(val: string) {
  return (/^([A-Za-z]|[가-힣]){2,100}$/.test(val));
}

/**
 * 번호 유효성을 체크 한다.
 * 값은 번호만 이뤄져 있어야 하며 앞이 0으로 채워져 있어도 유효하다.
 * @param val 확인할 값
 */
export function validNumber(val: string) {
  return validEmpty(val) &&
    (/^\d{1,}$/).test(val);
  // isFinite(parseInt(val, 10));
}

/**
 * 전화번호 유효성을 체크 한다.
 * 숫자로만 이뤄져 있어야하며, 최소 8자리, 최대 11자리 까지 허용 된다.
 *
 * 중간에 bar (-) 가 있어야 한다.
 * @param val 확인할 값
 */
export function validPhone(val: string) {
  return /^(\d{4}-\d{4}|\d{2,3}-\d{3,4}-\d{3,4})$/.test(val);
  // return validLength(8, 11)(val) &&
  //   validNumber(val);
}

/**
 * 사업자 등록번호 유효성을 검증한다.
 * @param val
 */
export function validCompanyRegNumber(val: string) {
  return /^\d{3}-\d{2}-\d{5}$/.test(val);
}
