/**
 * 샘플 목록 요청 시 사용되는 파라미터.
 */
export interface SampleListLoadParams {
  /**
   * 고유 ID.
   */
  _id?: string;
  /**
   * 검색 할 이름.
   */
  name?: string;
  /**
   * 검색 할 나이.
   */
  age?: string;
}

/**
 * 샘플 페이지의 목록을 출력할 때 쓰이는 아이템 모델.
 *
 * http://www.google.com
 */
export interface SampleResItem {
  /**
   * 고유 아이디값.
   */
  _id: string;
  /**
   * 이름
   */
  name: string;
  /**
   * 나이
   */
  age: number;
}