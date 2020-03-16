import { HashMap } from '../common/model';

/**
 * 특정 길이를 이용하여 숫자로 이뤄진 배열을 만든다.
 * 배열의 각 요소는 0부터 시작하여 개수만큼 채워진다.
 * @param length 만들 배열의 길이
 */
export function makeLengthArray(length: number) {
  const arr = new Array<number>(length);
  const iLen = arr.length;

  for (let i = 0; i < iLen; i++) {
    arr[i] = i;
  }

  return arr;
}

/**
 * 특정 시작/끝 값을 이용하여 숫자 배열을 만든다.
 * @param start 시작값
 * @param end 종료값
 */
export function makeNumberArray(start: number, end: number) {
  const arr: number[] = [];

  for (let i = start; i <= end; i++) {
    arr.push(i);
    // arr[i] = i;
  }

  return arr;
}

/**
 * 배열에서 인덱스를 이용하여 그 위치에 해당되는 요소를 삭제 한다.
 * 수행 된 내용은 복사된 배열에 반영된다.
 * @param arr 작업 할 배열
 * @param index 없앨 위치의 인덱스
 * @param copy 복사 여부. 기본 true
 */
export function removeArrayIndex<T>(arr: T[], index: number, copy = true): T[] {
  const arrCopy = copy ? ([] as T[]).concat(arr) : arr;

  if (index > -1) {
    arrCopy.splice(index, 1);
  }

  return arrCopy;
}

/**
 * 배열에서 특정 값을 삭제 한다.
 * 배열 안에 값이 여러개가 있어도 1번만 수행한다.
 * 수행 된 내용은 복사된 배열에 반영된다.
 * @param arr 작업 할 배열
 * @param value 없앨 값
 * @param copy 복사 여부. 기본 true
 */
export function removeArrayValue<T>(arr: T[], value: T, copy = true): T[] {
  return removeArrayIndex(arr, arr.indexOf(value), copy);
}

/**
 * 특정 배열을 키/값 형태의 해시맵으로 바꾼다.
 * @param arr 변환할 배열
 * @param field 변환 시 키값으로 사용할 항목명
 */
export function arrayToMap<T>(arr: T[], field: string): HashMap<T> {
  return arr.reduce<HashMap<T>>((acc: HashMap<T>, curr: T) => {
    const item: any = curr;
    acc[item[field]] = curr;

    return acc;
  }, {});
}

/**
 * 특정 해시맵을 키/값으로 이뤄진 배열로 만든다.
 * - 해시맵이 아닌 일반 객체를 이용하려면 toKeyValuePairs 를 이용하라.
 * @param map
 */
export function mapToArray<T>(
  map: HashMap<T>,
): Array<{ key: string; value: T }> {
  return Object.keys(map).map((key) => {
    return {
      key,
      value: map[key],
    };
  });
}

/**
 * 일반적인 객체를 키/값으로 이뤄진 배열로 만들어준다.
 * - 인수가 해시맵이면 mapToArray 를 이용하라.
 * @param data
 */
export function toKeyValuePairs<T = any>(
  data: any,
): Array<{ key: string; value: T }> {
  return Object.keys(data).map((key) => {
    return {
      key,
      value: data[key] as T,
    };
  });
}

/**
 * 2중 배열을 하나의 배열로 만든다.
 * @param arr
 */
export function flatArray<T>(arr: T[][]): T[] {
  const aRet: T[] = [];

  arr.forEach((subArr) => Array.prototype.push.apply(aRet, subArr));

  return aRet;
}
