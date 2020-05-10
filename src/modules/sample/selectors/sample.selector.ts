import { AppState } from '../../../entries/stores';

/**
 * 셀렉터: 샘플 상태를 가져온다.
 * @param state
 */
const selSample = (state: AppState) => state.sample;

const selBasic = (state: AppState) => selSample(state).basic;

/**
 * 셀렉터: 샘플 목록 데이터를 가져온다.
 * @param state
 */
export const selSampleItems = (state: AppState) => selBasic(state).items;

/**
 * 셀렉터: 샘플 링크 목록을 가져온다.
 * @param state
 */
export const selSampleLinkList = (state: AppState) => selBasic(state).linkList;

/**
 * 셀렉터: 샘플 목록 데이터의 전체 개수.
 * @param state
 */
export const selSampleTotalCount = (state: AppState) =>
  selBasic(state).totalCount;

/**
 * 셀렉터: 샘플 목록 불러오는 중인지의 여부.
 * @param state
 */
export const selSampleLoading = (state: AppState) => selBasic(state).loading;
