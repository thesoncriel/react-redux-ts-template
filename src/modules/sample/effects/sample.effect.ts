import { createEffect } from '../../../util';
import {
  actSampleListFail,
  actSampleListLoad,
  actSampleListLoaded,
  actSampleSignin,
  actSampleSigninFail,
  actSampleSigninSucc,
} from '../actions';
import { SampleListLoadParams, SampleSigninParams } from '../models';
import { sampleApi } from '../services';

/**
 * 이펙트: 샘플 목록을 불러온다.
 */
export const effSampleListLoad = createEffect<SampleListLoadParams>(
  async (payload, dispatch) => {
    dispatch(actSampleListLoad());

    try {
      const res = await sampleApi.loadList(payload);

      dispatch(actSampleListLoaded(res));
    } catch (e) {
      console.log(e);
      alert(e.message);
      dispatch(actSampleListFail(e));
    }
  },
);

/**
 * 이펙트: 샘플 로그인을 수행한다.
 */
export const effSampleSignin = createEffect<SampleSigninParams>(
  async (payload, dispatch) => {
    dispatch(actSampleSignin());

    try {
      await sampleApi.signin(payload);

      dispatch(actSampleSigninSucc());
    } catch (error) {
      dispatch(actSampleSigninFail(error));
    }
  },
);
