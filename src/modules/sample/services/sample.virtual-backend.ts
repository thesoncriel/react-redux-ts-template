import {
  SampleSigninParams,
  SampleSigninRes,
} from './../models/sample-domain.model';
import { ListRes } from '../../../common';
import { compareSome, template } from '../../../util';
import { MSG_SAMPLE_LIST_LOAD_ERROR } from '../messages';
import { SampleItemModel, SampleListLoadParams } from '../models';

const COUNT_LIMIT = 6;

let loadCount = 0;

export const filterSampleList = (params: SampleListLoadParams) => (
  res: ListRes<SampleItemModel>,
) => {
  loadCount++;

  if (loadCount % COUNT_LIMIT === 0) {
    return Promise.reject(
      new Error(template(MSG_SAMPLE_LIST_LOAD_ERROR, COUNT_LIMIT + '')),
    );
  }

  console.log('params', params);

  const keys = Object.keys(params);
  const items = res.items.filter(item => !compareSome(keys, item, params));

  return {
    items,
    totalCount: res.totalCount,
  } as ListRes<SampleItemModel>;
};

export const signinProcess = (params: SampleSigninParams) => (
  res: SampleSigninRes,
) => {
  if (params.userId !== 'codeshare' || params.userPw !== '1234') {
    throw new Error('잘못된 로그인 정보 입니다!');
  }

  return res;
};
