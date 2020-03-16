/**
 * 두 객체내 값을 AND 조건으로 비교한다.
 * 모두 다르다면 true, 하나라도 같다면 false 를 반환한다.
 * @param keys 비교할 키 목록
 * @param props 현재 프로퍼티
 * @param nextProps 다음 프로퍼티
 */
export function compareEvery(keys: string[], props: any, nextProps: any) {
  return keys.every((k) => props[k] !== nextProps[k]);
}

/**
 * 두 객체내 값을 OR 조건으로 비교한다.
 * 하나라도 다르다면 true, 모두 같다면 false 를 반환한다.
 * @param keys 비교할 키 목록
 * @param props 현재 프로퍼티
 * @param nextProps 다음 프로퍼티
 */
export function compareSome(keys: string[], props: any, nextProps: any) {
  return keys.some((k) => props[k] !== nextProps[k]);
}
