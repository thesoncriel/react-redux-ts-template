import { DateRange } from './collections.model';

/**
 * 입력 컴포넌트의 변경 이벤트 객체.
 */
export interface InputChangeArgs {
  /**
   * 컴포넌트의 이름.
   */
  name: string;
  /**
   * 사용자에 의해 변경된 값.
   */
  value: string;
}

/**
 * 날짜 범위 변경 이벤트 객체.
 */
export interface DateRangeChangeArgs {
  /**
   * 변경 컴포넌트 이름
   */
  name: string;
  /**
   * 사용자에 의해 변경된 날짜 범위값
   */
  dateRange: DateRange;
}

/**
 * 체크형 컴포넌트의 변경 이벤트 객체.
 */
export interface CheckedChangeArgs {
  /**
   * 컴포넌트의 일음.
   */
  name: string;
  /**
   * 사용자에 의해 변경된 체크 값.
   */
  checked: boolean;
}

/**
 * 아코디언(Accordion) 형태에 체크박스가 더해진 UI 의 내용이 변경 되었을 때 사용되는 이벤트 객체.
 */
export interface CollapsedChangeArgs extends CheckedChangeArgs {
  /**
   * 펼쳐짐 여부.
   */
  collapsed: boolean;
}

/**
 * 페이지 변경 시 전달되는 자료
 */
export interface PageChangeArgs {
  /**
   * 페이징을 위하여 스킵 할 자료 개수
   */
  skip: number;
  /**
   * 페이징을 위하여 한번에 가져올 자료 개수
   */
  limit: number;
}

/**
 * UI 에서 파일이 변경 되었을 때 보내주는 데이터.
 */
export interface FileChangeArgs {
  name: string;
  file: File;
}
