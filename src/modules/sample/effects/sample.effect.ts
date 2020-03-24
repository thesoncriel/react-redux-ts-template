import { createEffect } from '../../../util';
import { SampleListLoadParams } from '../models';
import { sampleApi } from '../services';
import {
  actSampleListFail,
  actSampleListLoad,
  actSampleListLoaded,
} from '../actions';

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
