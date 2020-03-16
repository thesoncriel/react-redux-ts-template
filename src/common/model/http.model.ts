/**
 * 목록 형태의 응답을 가져오는 API호출 시 쓰이는 기본 파라미터.
 */
export interface ListQueryParams {
  /**
   * 페이징 시 넘길 데이터 개수
   */
  skip?: number;
  /**
   * 페이징 시 한번에 가져올 데이터 개수
   */
  limit?: number;
}

/**
 * 목록 형태의 응답 데이터.
 */
export interface ListRes<T> {
  /**
   * 데이터 목록
   */
  items: T[];
  /**
   * 전체 개수
   */
  totalCount: number;
}

/**
 * Backend API 호출 시 오류일 때 전달되는 오류 객체 데이터.
 */
export interface ErrorModel {
  /**
   * 상태값.
   * - 400번대: 잘못된 호출
   * - 500번대: 서버 오류
   */
  status: number;
  /**
   * 오류명
   */
  name: string;
  /**
   * 서버에서 전달되는 메시지 내용.
   */
  message: string;
}

/**
 * Backend API 호출 시 오류일 때 전달되는 응답 데이터.
 */
export interface ErrorRes {
  error: ErrorModel;
}

/**
 * 업로드 상태를 확인할 수 있는 객체.
 */
export interface UploadStateArgs {
  /**
   * 진행도. 0~100 까지의 수치.
   */
  progress: number;
  /**
   * 업로드된 바이트수.
   */
  loaded: number;
  /**
   * 업로드 해야 할 총 바이트수.
   */
  total: number;
  /**
   * 완료여부.
   */
  completed: boolean;
}
