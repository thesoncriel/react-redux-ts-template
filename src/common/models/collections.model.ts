import React, { Dispatch, SetStateAction, FC, ComponentType } from 'react';
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

/**
 * 컨텍스트 상태 모델. state 와 자료를 적용시키는 apply 로 구성된다.
 */
export interface ContextState<T> {
  /**
   * 컨텍스트 상태.
   */
  state: T;
  /**
   * 컨텍스트 상태를 변경하기 위한 메서드.
   */
  dispatch: Dispatch<SetStateAction<T>>;
}

/**
 * 컨텍스트 인젝터로 만들어진 결과물.
 */
export interface ContextInjectorResult<T, IT> {
  /**
   * 상태 값을 제공하는 컴포넌트.
   *
   * 상태 관리를 하고싶은 컴포넌트를 감싸서 사용한다.
   *
   * 만약 직접 사용이 아닌 hoc 로 사용하고 싶다면 withCtx 를 이용한다.
   */
  CtxProvider: FC;
  /**
   * HOC: 컨텍스트를 Decorator 형식으로 이용 할 수 있다.
   */
  withCtx: <P>(Comp: ComponentType<P>) => FC<P>;
  /**
   * 컨텍스트용 셀렉터. 가져오고 싶은 데이터만 선택할 수 있다.
   *
   * @example
   *
   * // --- contexts/index.ts
   * // 데이터 로직이 포함된 셀렉터.
   * // 셀렉터는 가급적 selectors 폴더에 두어 사용한다.
   * export const selItemsCondition = (state: CtxState) => {
   *   return state.items.length > 0;
   * };
   *
   * // --- CommandContainer.tsx
   * import React, { FC } from 'react';
   * import { commandContext } from '../../contexts';
   * import { selItemsCondition } from '../../selectors';
   *
   * export const CommandContainer: FC = () => {
   *   // 필요한 자료를 변환하여 가져온다.
   *   const isShow = commandContext.useCtxSelector(selItemsCondition);
   *   const { items } = commandContext.useCtxSelectorAll();
   *
   *   return (
   *     <ConditionalList show={isShow} items={items} />
   *   );
   * };
   */
  useCtxSelector: <R>(selector: (state: T) => R) => R;
  /**
   * 컨텍트스용 셀렉터. 해당 컨텍스트의 모든 상태값을 가져올 수 있다.
   *
   * @example

   * // --- CommandContainer.tsx
   * import React, { FC } from 'react';
   * import { commandContext } from '../../contexts';
   *
   * export const CommandContainer: FC = () => {
   *   // 모든 상태값을 다 가져오거나 destructuring 으로 필요한 값만 사용한다.
   *   const { items } = commandContext.useCtxSelectorAll();
   *
   *   return (
   *     <CommandList items={items} />
   *   );
   * };
   */
  useCtxSelectorAll: () => T;
  /**
   * 컨텍스트용 디스패치. 변경된 상태 전체, 혹은 일부를 넘기면 컨텍스트 상태에 반영된다.
   */
  useCtxDispatch: Dispatch<Partial<T>>;
  /**
   * 컨텍스트용 인터렉터. 액션 및 데이터 호출, 조작 및 디스패치등의 기능을 가진 객체를 가져와 사용할 수 있다.
   */
  useInteractor: () => IT;
}
