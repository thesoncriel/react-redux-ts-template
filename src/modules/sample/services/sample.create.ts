import { SampleQueryParams } from '../models';

/**
 * 샘플 링크 목록을 만든다.
 */
export function createSampleLinkList(): SampleQueryParams[] {
  return [
    {
      name: '포메라니안'
    },
    {
      name: '웰시코기'
    },
    {
      name: '너구리'
    }
  ];
}
