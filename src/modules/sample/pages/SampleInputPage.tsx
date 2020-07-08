import React, { FC } from 'react';
import { PageContainer } from '../../_shared';
import { SampleInputContainer } from '../containers';

/**
 * 페이지: 샘플 입력 페이지를 만든다.
 */
export const SampleInputPage: FC = () => {
  // const queries = useQueryParams();

  return (
    <PageContainer title="입력 테스트">
      <SampleInputContainer />
    </PageContainer>
  );
};
