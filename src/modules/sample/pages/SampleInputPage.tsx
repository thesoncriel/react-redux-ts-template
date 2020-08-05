import React, { FC } from 'react';
import { PageContainer } from '../../_shared';
import { SampleInputContainer, PaginationContainer } from '../containers';
import { useQueryParams } from '../../../common/hooks';

interface SamplePagingQueryModel {
  limit: number;
  skip: number;
  keyword: string;
}

function selQueries(ori: SamplePagingQueryModel): SamplePagingQueryModel {
  return {
    limit: ori.limit || 10,
    skip: ori.skip || 0,
    keyword: ori.keyword || '',
  };
}

/**
 * 페이지: 샘플 입력 페이지를 만든다.
 */
export const SampleInputPage: FC = () => {
  const queries = useQueryParams<SamplePagingQueryModel>(selQueries);

  return (
    <PageContainer title="입력 테스트">
      <SampleInputContainer />
      <PaginationContainer {...queries} />
    </PageContainer>
  );
};
