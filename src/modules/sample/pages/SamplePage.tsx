import React, { FC } from 'react';
import { useQuery } from '../../../common/hooks';
import { cleanUpNil } from '../../../util';
import { PageContainer, LayoutContainer } from '../../_shared';
import { SampleJumbotronContainer, SampleListContainer, SampleResetContainer } from '../containers';
import { SampleQueryParams } from '../models';

/**
 * 샘플 페이지 컴포넌트.
 * @constructor
 */
export const SamplePage: FC = () => {
  const queries = cleanUpNil(useQuery<SampleQueryParams>());

  return (
    <PageContainer title="샘플 목록">
      <LayoutContainer>
        <SampleJumbotronContainer />
        <SampleListContainer queries={queries} />
        <SampleResetContainer />
      </LayoutContainer>
    </PageContainer>
  );
};