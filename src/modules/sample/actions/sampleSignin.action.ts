import { createAction, ActionType } from 'typesafe-actions';
import { ErrorModel } from '../../../common';

/**
 * 액션: 샘플 로그인 내용 초기화.
 */
export const actSampleSigninInit = createAction('SampleSigninInit')();

/**
 * 액션: 샘플 로그인.
 */
export const actSampleSignin = createAction('SampleSignin')();
/**
 * 액션: 샘플 로그인 성공.
 */
export const actSampleSigninSucc = createAction('SampleSigninSucc')();
/**
 * 액션: 샘플 로그인 실패.
 */
export const actSampleSigninFail = createAction('SampleSigninFail')<
  ErrorModel
>();

const actions = {
  actSampleSigninInit,
  actSampleSignin,
  actSampleSigninSucc,
  actSampleSigninFail,
};

export type SampleSigninActions = ActionType<typeof actions>;
