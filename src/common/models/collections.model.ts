import React from 'react';
/**
 * 키와 값으로 이뤄진 자료구조.
 * 키의 타입은 string 으로 고정된다.
 */
export interface HashMap<T> {
  [key: string]: T;
}

/**
 * 유효기간이 있는 스토리지 데이터 모델.
 */
export interface ExpirableStorageModel<T> {
  /**
   * 최대 유효시간. Unix Time Stamp 값을 기준으로 기록한다.
   *
   * Date.prototype.getTime 값에 대응한다.
   */
  expiredTime: number;
  /**
   * 보관된 자료
   */
  data: T;
}

/**
 * 라우트 모델. 라우팅 설정 시 사용한다.
 */
export interface RouteModel {
  /**
   * 라우트 이름. 네비게이션에 노출되는 명칭이다.
   */
  name: string;
  /**
   * 경로 정확성 여부.
   *
   * 현 모델 내 path 프로퍼티 값이 URL 경로와 정확히 일치해야 설정된 컴포넌트로 동작 된다.
   *
   * 아래 내용 참고.
   * https://reacttraining.com/react-router/web/api/Route/exact-bool
   */
  exact?: boolean;
  /**
   * 네비게이션에 노출되는 이동경로.
   */
  href?: string;
  /**
   * 해당 path 를 통해 들어왔을 때 redirect 를 수행 한다.
   * 설정 시 함께 설정된 component 를 무시 한다.
   */
  redirect?: string;
  /**
   * 라우팅이 동작될 경로.
   *
   * 아래 내용 참고.
   * https://reacttraining.com/react-router/web/api/Route/path-string-string
   */
  path: string;
  /**
   * 라우팅 동작 시 표현될 페이지 컴포넌트.
   *
   * 아래 내용 참고.
   * https://reacttraining.com/react-router/web/api/Route/component
   */
  component: React.ComponentClass | React.FC | any;
  /**
   * 특정 조건일 때 해당 라우트 접근을 제한하고자 할 때 쓰인다.
   */
  guard?: () => Promise<boolean>;
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
