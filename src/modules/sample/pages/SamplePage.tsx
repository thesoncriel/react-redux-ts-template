import React, { FC } from 'react';
import { useQuery } from '../../../common/hooks';
import { LayoutContainer, PageContainer } from '../../_shared';
import {
  SampleJumbotronContainer,
  SampleListContainer,
  SampleResetContainer,
} from '../containers';
import { SampleQueryParams } from '../models';
import { ResultWrap } from '../components/atoms/RefWrap';

/**
 * 샘플 페이지 컴포넌트.
 * @constructor
 */
export const SamplePage: FC = () => {
  const queries = useQuery<SampleQueryParams>();

  return (
    <PageContainer title="샘플 목록">
      <LayoutContainer>
        <SampleJumbotronContainer />
        <SampleListContainer queries={queries} />
        <SampleResetContainer />
        <ResultWrap>아하하!</ResultWrap>
      </LayoutContainer>
    </PageContainer>
  );
};
