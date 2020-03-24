import { ActionType, createAction } from 'typesafe-actions';
import { ErrorModel, InputChangeArgs, ListRes } from '../../../common/model';
import { SampleItemModel } from '../models';

/**
 * 액션: 샘플 목록을 불러온다.
 */
export const actSampleListLoad = createAction('SampleListLoad')();

/**
 * 액션: 샘플 목록 불러오기 성공.
 */
export const actSampleListLoaded = createAction('SampleListLoaded')<
  ListRes<SampleItemModel>
>();

/**
 * 액션: 샘플 목록 실패.
 */
export const actSampleListFail = createAction('SampleListFail')<ErrorModel>();

/**
 * 액션: 샘플 입력값 변경.
 */
export const actSampleInputChange = createAction('SampleInputChange')<
  InputChangeArgs
>();

const actions = {
  actSampleListLoad,
  actSampleListLoaded,
  actSampleListFail,
  actSampleInputChange,
};

export type SampleActions = ActionType<typeof actions>;
