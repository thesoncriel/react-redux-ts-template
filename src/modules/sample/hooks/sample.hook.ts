import { useQueryParams } from '../../../common/hooks';
import { SampleQueryParams } from '../models';

/**
 * 훅: 샘플 페이지의 쿼리 파라미터를 객체로 가져온다.
 */
export const useSampleParams = () => {
  return useQueryParams<SampleQueryParams>();
};
