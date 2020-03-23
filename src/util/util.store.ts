/* eslint-disable no-param-reassign */
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { HashMap, InputChangeArgs } from '../common/model';
import { AppState } from '../entries/stores';

export type AsyncDispatch<A extends AnyAction = AnyAction> = ThunkDispatch<
  AppState,
  any,
  A
>;

/**
 * 비동기 액션을 수행하는 이펙트 함수를 만든다. 쿼리 인자가 필요하다.
 * - Q: 함께 전달될 페이로드 타입. 필요 없다면 generic 에 void 선언 하거나 생략한다.
 * - R: Promise 로 반환될 타입. 기본 void
 * - A: 지정할 Action 타입. 기본 AnyAction
 * @param fnProcess type 이 들어간 액션 객체를 비동기로 반환 해야 한다.
 */
export function createEffect<
  Q = void,
  R = any,
  A extends AnyAction = AnyAction
>(
  fnProcess: (
    payload: Q,
    dispatch: AsyncDispatch<A>,
    getState: () => AppState,
  ) => void,
) {
  return (payload: Q) => (dispatch: AsyncDispatch<A>, getState: () => AppState) => {
    fnProcess(payload, dispatch, getState);
  };
}

/**
 * 리듀서에서 입력 변경 사항을 공통 처리할 때 쓰이는 함수
 * @param payload 입력 변경사항이 들어있는 객체
 * @param invalidMessages 유효하지 않을 때 보여줄 메시지가 모인 객체
 */
export function mergeInputChangeState(
  payload: InputChangeArgs,
  invalidMessages: HashMap<string>,
) {
  const { name, value } = payload;

  return {
    [name]: value,
    invalidMessages: {
      ...invalidMessages,
      [name]: '',
    },
  };
}
