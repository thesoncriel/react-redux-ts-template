import { ListRes } from '../../../common/model';
import { publicApi } from '../../_shared';
import { SampleItemModel, SampleListLoadParams } from '../models';
import { filterSampleList } from './sample.virtual-backend';

/**
 * 샘플 페이지를 위한 API Service.
 */
export const sampleApi = {
  /**
   * 샘플 목록을 불러온다.
   * @param params
   */
  loadList(params: SampleListLoadParams) {
    return publicApi
      .get<ListRes<SampleItemModel>>('/data/sample-list.json')
      .then(filterSampleList(params));
  },
};
