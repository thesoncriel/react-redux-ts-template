import { ListRes } from '../../../common';
import { compareSome } from '../../../util';
import { MSG_SAMPLE_LIST_LOAD_ERROR } from '../messages';
import { SampleItemModel, SampleListLoadParams } from '../models';

const COUNT_LIMIT = 6;

let loadCount = 0;

export const filterSampleList = (params: SampleListLoadParams) => (
  res: ListRes<SampleItemModel>,
) => {
  loadCount++;

  if (loadCount % COUNT_LIMIT === 0) {
    return Promise.reject(new Error(MSG_SAMPLE_LIST_LOAD_ERROR.replace('{n}', COUNT_LIMIT + '')));
  }

  console.log('params', params);

  const keys = Object.keys(params);
  const items = res.items.filter(item => !compareSome(keys, item, params));

  return {
    items,
    totalCount: res.totalCount,
  } as ListRes<SampleItemModel>;
};
