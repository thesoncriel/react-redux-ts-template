import { ListRes } from '../../../common/model';
import { bearerTokenProvider, publicApi } from '../../_shared';
import {
  SampleItemModel,
  SampleListLoadParams,
  SampleSigninParams,
  SampleSigninRes,
} from '../models';
import { filterSampleList, signinProcess } from './sample.virtual-backend';
import { cache } from '../../../decorators';

/**
 * 샘플 페이지를 위한 API Service.
 */
export const sampleApi = {
  /**
   * 샘플 목록을 불러온다.
   * @param params
   */
  loadList(params: SampleListLoadParams) {
    const fetch = cache('session')<ListRes<SampleItemModel>>(publicApi.get);

    return fetch('/data/sample-list.json', params)
      .then(filterSampleList(params));
  },

  /**
   * 샘플 로그인을 수행한다.
   * @param user 로그인 할 사용자 정보
   */
  signin(user: SampleSigninParams) {
    return publicApi
      .post<SampleSigninRes>('/data/signin.json', user)
      .then(signinProcess(user))
      .then(({ token }) => bearerTokenProvider.set(token));
  },
};
