// import moment from 'moment';

/**
 * 숫자 앞에 0을 채운다.
 * @param num 작업될 숫자값.
 * @param digit 0을 채울 자릿수
 */
export function padNumber(num: number, digit = 2): string {
  if (num < 0) {
    throw new Error('"num" cannot be negative.');
  }
  return (num + '').padStart(digit, '0');
}

/**
 * 날짜와 시간을 년월일 시분초 까지 한글로 출력한다.
 * @param date
 */
export function datetimeFormatAsKor(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return `${year}년 ${month}월 ${day}일 ${hour}:${min}:${sec}`;
}

/**
 * 6, 8, 10~11자리로 이뤄진 전화번호값을 대상으로 중간에 바(-)를 넣어준다.
 * @param value 포멧을 적용할 휴대전화번호.
 */
export function phoneFormat(num: string) {
  let formatNum = '';
  if (num.length === 11) {
    formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  } else if (num.length === 8) {
    formatNum = num.replace(/(\d{4})(\d{4})/, '$1-$2');
  } else {
    if (num.indexOf('02') === 0) {
      formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
    } else {
      formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }
  }
  return formatNum;
}

/**
 * 숫자를 올림 한다.
 * @param value 올림 할 숫자.
 * @param round 올림 할 자릿수
 */
export function roundup(value: number, round = 0) {
  if (round === 0) {
    return value;
  }
  // eslint-disable-next-line no-restricted-properties
  const pow = Math.pow(10, round);

  return Math.floor(value / pow) * pow;
}

/**
 * 숫자를 3자리수마다 콤마(,)를 찍어서 표현한다.
 * @param value 서식을 적용 할 숫자.
 * @param round 반올림 할 자릿수.
 */
export function numberFormat(value: number, round?: number) {
  if (value === 0) {
    return '0';
  }

  const iValue = roundup(value, round);
  const reg = /(^[+-]?\d+)(\d{3})/;
  let n = iValue + '';

  while (reg.test(n)) {
    n = n.replace(reg, '$1,$2');
  }

  return n;
}

/**
 * 지정한 날짜객체를 yyyy-MM-dd 서식의 날짜 문자열로 바꿔준다.
 * @param date 서식을 적용할 날짜
 * @param delimiter 연월일 구분자. 기본값 바(-)
 */
export function dateFormat(date: Date | string, delimiter = '-'): string {
  if (typeof date === 'string') {
    return dateFormat(new Date(date), delimiter);
  }
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${padNumber(year)}${delimiter}${padNumber(
    month,
  )}${delimiter}${padNumber(day)}`;
}

/**
 * 날짜를 연월일 구분자(.)가 적용된 문자열로 바꾼다.
 * @param date
 */
export function dateFormatDot(date: Date | string) {
  if (!date) {
    return '';
  }
  return dateFormat(date, '.');
}

/**
 * 8자리로 된 날짜 데이터를 대시(-)가 들어간 날짜 형태로 바꿔준다.
 * - 예) 19840601 --> 1984-06-01
 * @param strDate 8자리로 된 날짜 데이터
 */
export function strToDateFormat(strDate: string) {
  return (
    strDate.substr(0, 4) +
    '-' +
    strDate.substr(4, 2) +
    '-' +
    strDate.substr(6, 2)
  );
}

/**
 * 현재 날짜를 yyyy-MM-dd 서식으로 바꾸어 출력 한다.
 */
export function dateFormatNow() {
  return dateFormat(new Date());
}

/**
 * 문자열로 된 날짜값에서 대시(-) 대신 다른 값으로 바꿔준다.
 * 기본값은 슬래시(/)
 * @param date 바꿀 날짜 값. yyyy-MM-dd 형태.
 */
export function dateFormatChange(date: string, delimiter = '/') {
  return date.replace(/-/g, delimiter);
}
