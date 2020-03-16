import _chunk from 'lodash/chunk';
import _debounce from 'lodash/debounce';
import _throttle from 'lodash/throttle';
import { doSetTimeout } from './util.common';

/**
 * 외부 서드파티 라이브러리를 불러온다.
 * @param src 불러올 경로
 * @param id 만들어지는 스트립트태그 id. 만약 이미 존재 한다면 스크립트 불러오는 것을 수행하지 않는다.
 */
export function loadThirdpartyLib(src: string, id: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const tagName = 'script';
    const d = document;
    const fjs = d.getElementsByTagName(tagName)[0];

    if (d.getElementById(id)) {
      resolve(true);
      return;
    }

    const js = d.createElement(tagName);

    js.id = id;
    js.src = src;
    js.onload = () => resolve(true);

    if (!fjs.parentNode) {
      reject(new Error('parentNode is null'));

      return;
    }
    fjs.parentNode.insertBefore(js, fjs);
  });
}

/**
 * 쓰로틀을 사용 한다.
 * 최초 한번 콜백 수행 후 지정된 시간이 경과되기 전 까진 콜백을 다시 수행하지 않는다.
 * lodash 의 throttle 을 내부적으로 사용한다.
 * @param callback 쓰로틀링으로 수행 될 콜백 함수.
 * @param wait 쓰로틀을 걸 시간. (밀리초)
 */
export function throttle(callback: (...args: any[]) => any, wait: number) {
  return _throttle(callback, wait, { trailing: false });
}

/**
 * 디바운스를 사용 한다.
 * wait 시간 만큼 입력이 안되면 그 때 callback 을 수행한다.
 * lodash 의 debounce 를 내부적으로 사용한다.
 * @param callback 디바운스로 수행 될 콜백 함수.
 * @param wait 디바운스를 걸 시간. (밀리초)
 */
export function debounce(callback: (...args: any[]) => any, wait: number) {
  return _debounce(callback, wait);
}

/**
 * 배열을 지정한 사이즈로 쪼갠 뒤 배열로 다시 묶어서 준다.
 * lodash 의 chunk 를 내부적으로 사용한다.
 * @param array 쪼갤 배열.
 * @param size 쪼갤 개수.
 */
export function chunk<T>(array: T[], size: number) {
  return _chunk(array, size);
}

/**
 * 파이프 패턴을 사용하여 자료를 변환 한다.
 * @param fns 파이프 요소 함수.
 */
export function pipe<T = any, U = any>(
  ...fns: Array<(arg0: T, arg1?: U) => T>
) {
  return (data0: T, data1?: U) =>
    fns.reduce((prev: T, fn) => fn(prev, data1), data0);
}

/**
 * Promise 에서 then 으로 넘길 때 중간에 특정 작업을 하고 그대로 들어온 데이터를 넘기고 싶을 때 쓰인다.
 * @param fn 비동기로 수행 될 함수.
 */
export function tap<T>(fn?: (data: T) => void) {
  return (d: T) => {
    if (fn) {
      fn(d);
    }

    return d;
  };
}

/**
 * 특정 시간이 지난 후 비동기로 특정 값을 전달 한다.
 * @param time 경과 할 시간 (ms)
 * @param value 시간이 지난 후 전달 할 값
 * @param stopCallback 타임아웃 되기 전, 중지 할 수 있는 함수를 넘겨주는 콜백.
 */
export function timeout<T = void>(
  time: number,
  value?: T,
  stopCallback?: (stop: () => void) => void,
) {
  return new Promise<T>((resolve) => {
    const t = doSetTimeout(() => resolve(value), time);

    if (stopCallback) {
      stopCallback(() => clearTimeout(t));
    }
  });
}

/**
 * 콘솔로그 대체 함수.
 * @param args
 */
// export function log(...args: any[]) {
// // tslint:disable-next-line: no-console
//   console.log(args);
// }
