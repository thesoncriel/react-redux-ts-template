import { ListRes } from '../../../common/model';
import { compareSome } from '../../../util';
import { publicApi } from '../../_shared';
import { MSG_SAMPLE_LIST_LOAD_ERROR } from '../messages';
import { SampleItemModel, SampleListLoadParams } from '../models';

const filterSampleList = (params: SampleListLoadParams) => (
  res: ListRes<SampleItemModel>,
) => {
  const keys = Object.keys(params);
  const items = res.items.filter(item => !compareSome(keys, item, params));

  return {
    items,
    totalCount: res.totalCount,
  } as ListRes<SampleItemModel>;
};

let loadCount = 0;

/**
 * 샘플 페이지를 위한 API Service.
 */
export const sampleApi = {
  /**
   * 샘플 목록을 불러온다.
   * @param params
   */
  loadList(params: SampleListLoadParams) {
    loadCount++;

    if (loadCount % 4 === 0) {
      return Promise.reject(new Error(MSG_SAMPLE_LIST_LOAD_ERROR));
    }

    console.log('params', params);
    return publicApi
      .get<ListRes<SampleItemModel>>('/data/sample-list.json')
      .then(filterSampleList(params));
  },
};
