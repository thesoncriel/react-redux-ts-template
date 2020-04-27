import { createReducer } from 'typesafe-actions';
import {
  actSampleSignin,
  actSampleSigninFail,
  actSampleSigninInit,
  actSampleSigninSucc,
  SampleSigninActions,
} from '../actions';
import { SampleSigninParams } from '../models/sample-domain.model';

/**
 * 스토어 상태: 샘플 로그인
 */
export interface SampleSigninState extends SampleSigninParams {
  /**
   * 로그인 실패 메시지
   */
  invalidMessage: string;
  /**
   * 로그인 시도중 여부
   */
  loading: boolean;
}

export function getInitSampleSigninState(): SampleSigninState {
  return {
    userId: '',
    userPw: '',
    invalidMessage: '',
    loading: false,
  };
}

/**
 * 리듀서: 샘플 로그인
 */
export const sampleSigninReducer = createReducer<
  SampleSigninState,
  SampleSigninActions
>(getInitSampleSigninState())
  .handleAction(actSampleSignin, state => ({
    ...state,
    loading: true,
  }))
  .handleAction(
    [actSampleSigninInit, actSampleSigninSucc],
    getInitSampleSigninState,
  )
  .handleAction(actSampleSigninFail, (state, action) => ({
    ...state,
    invalidMessage: action.payload.message,
    loading: false,
  }));
