/* eslint-disable no-param-reassign */
import { ActionCreator, AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { HashMap, InputChangeArgs, ListQueryParams } from '../common/model';
import { isServer } from './util.common';
import { AppState } from '../stores';

export type AsyncDispatch<A extends AnyAction = AnyAction> = ThunkDispatch<
  AppState,
  {},
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
  ) => Promise<R>,
): ActionCreator<ThunkAction<Promise<R>, AppState, any, A>> {
  /**
   * 액션을 수행한다.
   * @param payload
   */
  return (payload: Q) => (
    dispatch: AsyncDispatch<A>,
    getState: () => AppState,
  ) => {
    try {
      const prm = fnProcess(payload, dispatch, getState);

      if (prm instanceof Promise) {
        return prm;
      }

      return Promise.resolve(prm);
    } catch (error) {
      if (error.message && !isServer()) {
        alert(error.message);
      }
      return Promise.reject(error);
    }
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

/**
 * 비밀번호 체크 옵션만 별도로 구성된 함수이다.
 *
 * effect 에서 password, passwordConfirm 2가지 항목을 비교할 때 쓰인다.
 * @param password 패스워드
 */
// export function getValidOptionsForPassword(password: string): ValidateBulkOptionModel {
//   return {
//     password: [{
//       valid: validEmpty,
//       message: MSG_SHARE_REQUIRED
//     }, {
//       valid: validPassword,
//       message: MSG_SHARE_INVALID_PASSWORD,
//     }],
//     passwordConfirm: [{
//       valid: validEmpty,
//       message: MSG_SHARE_REQUIRED
//     }, {
//       valid: (pwConfirm => pwConfirm === password),
//       message: MSG_SHARE_NO_SAME_PASSWORD_CONFIRM
//     }],
//   };
// }

/**
 * 연락처 유효성 여부만 별도로 구성된 함수이다.
 * @param state 자료가 들어있는 상태 객체
 */
// export function getValidOptionsForPhone() {
//   return {
//     phone: [{
//       valid: validEmpty,
//       message: MSG_SHARE_REQUIRED
//     }, {
//       valid: validPhone,
//       message: MSG_SHARE_INVALID_PHONE,
//     }]
//   };
// }

/**
 * 기간 타입에 따라 알맞은 시작/종료 날짜가 담긴 객체를 만들어준다.
 * @param type 기간 타입. 업무 유형에 따라 다름.
 * @param params periodType, periodStartDate, periodEndDate 두 필드가 존재하는 객체.
 */
export function getDateRangeByPeriodType(params: {
  periodType?: string;
  periodStartDate?: string;
  periodEndDate?: string;
}) {
  try {
    const { periodType: type, periodStartDate, periodEndDate } = params;
    const hasBoth = !!periodStartDate && !!periodEndDate;

    if (type && hasBoth) {
      return {
        [type + 'StartDate']: periodStartDate,
        [type + 'EndDate']: periodEndDate,
      };
    }
  } catch (error) {
    /** */
  }

  return null;
}

/**
 * 파라미터 객체에서 periodType 값을 가져 온다.
 *
 * {type}StartDate 혹은 {type}EndDate 와 같은 key가 객체 내에 포함 되어 있어야 한다.
 * @param params 타입을 확인하고 가져올 파라미터 객체.
 */
export function getPeriodTypeFrom(params: any) {
  const regex = /(Start|End)Date$/;
  let sRet = '';

  Object.keys(params).every((key) => {
    if (regex.test(key)) {
      sRet = key.replace(regex, '');
      return false;
    }

    return true;
  });

  return sRet;
}

/**
 * 파라미터에서 skip, limit 가 없을 경우 기본 값으로 보충해 준다.
 * @param params
 */
export function setDefaultPagingAsParams<T extends ListQueryParams = any>(
  params: T,
) {
  if (!params.limit) {
    params.limit = 10;
  }
  if (!params.skip) {
    params.skip = 0;
  }

  return params;
}
