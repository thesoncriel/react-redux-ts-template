import React, { FC } from 'react';
import { PageContainer } from '../../_layout/components';
import { SampleListContainer } from '../containers/SampleListContainer';
import { useCleanParams } from '../hooks/sample.hook';
import { SampleQueriesContainer } from '../containers';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface QueryParams {
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
 * 샘플 페이지 컴포넌트.
 * @constructor
 */
export const SamplePage: FC = () => {
  const queries = useCleanParams<QueryParams>();

  return (
    <PageContainer title="샘플 목록">
      <SampleQueriesContainer />
      <SampleListContainer queries={queries} />
    </PageContainer>
  );
};