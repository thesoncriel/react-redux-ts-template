import { createReducer } from 'typesafe-actions';
import { SampleItemModel } from '../models';
import { actSampleListFail, actSampleListLoad, actSampleListLoaded, SampleActions } from '../actions';

/**
 * 스토어 상태: 샘플 페이지에 대한 상태 모델.
 */
export interface SampleState {
  /**
   * 샘플 목록 데이터.
   */
  items: SampleItemModel[];
  /**
   * 전체 샘플 개수.
   */
  totalCount: number;
  /**
   * 로딩중 여부.
   */
  loading: boolean;
}

export function getInitSampleState(): SampleState {
  return {
    items: [],
    totalCount: 0,
    loading: false,
  }
}

export const sampleReducer = createReducer<SampleState, SampleActions>(getInitSampleState())
  .handleAction(actSampleListLoad, state => ({
    ...state, loading: true
  }))
  .handleAction(actSampleListLoaded, (state, action) => ({
    ...state, ...action.payload, loading: false
  }))
  .handleAction(actSampleListFail, state => ({
    ...state, loading: false
  }))
;