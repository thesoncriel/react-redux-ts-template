import React, { FC } from 'react';
import { PageContainer } from '../../_layout/components';
import { SampleListContainer } from '../containers/SampleListContainer';
import { SampleJumbotronContainer, SampleResetContainer } from '../containers';
import { useQuery } from '../../../common/hooks';
import { SampleQueryParams } from '../models';
import { cleanUpNil } from '../../../util';

/**
 * 샘플 페이지 컴포넌트.
 * @constructor
 */
export const SamplePage: FC = () => {
  const queries = cleanUpNil(useQuery<SampleQueryParams>());

  return (
    <PageContainer title="샘플 목록">
      <SampleJumbotronContainer />
      <SampleListContainer queries={queries} />
      <SampleResetContainer />
    </PageContainer>
  );
};