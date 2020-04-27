/**
 * 샘플 목록 요청 시 사용되는 파라미터.
 *
 * http://www.google.com
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

/**
 * 샘플 로그인 기능 이용 시 전달 될 파라미터 정보
 */
export interface SampleSigninParams {
  /**
   * 로그인 할 사용자 ID
   */
  userId: string;
  /**
   * 로그인 시 사용될 비밀번호
   */
  userPw: string;
}

/**
 * 샘플 로그인 기능 이용 시 반환되는 응답 자료.
 */
export interface SampleSigninRes {
  /**
   * 로그인 성공 시 받아오는 토큰
   */
  token: string;
}
