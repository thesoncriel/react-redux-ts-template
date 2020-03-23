import { SampleResItem } from './sample-domain.model';

/**
 * 샘플 페이지에서 쓰이는 쿼리 파라미터.
 */
export interface SampleQueryParams {
  /**
   * 검색할 ID.
   */
  _id?: string;
  /**
   * 검색할 이름.
   */
  name?: string;
}

/**
 * 샘플 페이지의 목록을 출력할 때 쓰이는 아이템 모델.
 */
export type SampleItemModel = SampleResItem;