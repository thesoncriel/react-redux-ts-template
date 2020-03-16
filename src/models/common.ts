/**
 * 키와 값으로 이뤄진 자료구조.
 * 키의 타입은 string 으로 고정된다.
 */
export interface HashMap<T> {
  [key: string]: T;
}

/**
 * 목록 형태의 응답 데이터.
 */
export interface ListDataRes<T> {
  items: T[];
  totalCount: number;
  skip?: number;
  limit?: number;
}
