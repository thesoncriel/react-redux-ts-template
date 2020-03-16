/**
 * 키와 값으로 이뤄진 자료구조.
 * 키의 타입은 string 으로 고정된다.
 */
export interface HashMap<T> {
  [key: string]: T;
}

/**
 * 날짜 범위 자료.
 */
export interface DateRange {
  /**
   * 시작 날짜
   */
  startDate: string;
  /**
   * 종료 날짜
   */
  endDate: string;
}

/**
 * 사이즈 정보.
 */
export interface Size {
  /**
   * 가로 크기 (픽셀)
   */
  width: number;
  /**
   * 세로 크기 (픽셀)
   */
  height: number;
}
