import { asyncAction } from '../shares/async-action';
import { sampleApi } from './sample.api';
import * as types from './sample.types';
import { timeout } from '../../util';

const actSamplePending = (payload = true) => ({
  type: types.LIST_PENDING,
  payload,
});

export const actSampleLoad = asyncAction(async (dispatch) => {
  dispatch(actSamplePending());

  timeout(750)
    .then(() => sampleApi.loadList())
    .then((payload) => dispatch({ type: types.LIST_LOAD, payload }));
});
