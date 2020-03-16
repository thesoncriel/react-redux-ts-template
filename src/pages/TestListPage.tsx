import React from 'react';
import { PageContainer } from '../common/components/layout/PageContainer';
import { AsyncSampleContainer } from '../containers/AsyncSampleContainer';

interface Props {
  id: string;
}

export const TestListPage: React.FC<Props> = () => (
  <PageContainer title="비동기 샘플 페이지">
    <h1>비동기 샘플 테스트</h1>
    <AsyncSampleContainer />
  </PageContainer>
);
