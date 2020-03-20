import React, { FC } from 'react';
import styled from 'styled-components';
import GlobalStyle from '../../../styles/GlobalStyle';
import { PageFooter } from './PageFooter';
import { PageHead, PageHeadProps } from '../../../common/components/PageHead';
import { PageHeader } from './PageHeader';
import { MARGIN_SECTION } from '../../../styles/constants';

/**
 * 페이지 컨테이너의 프로퍼티를 정의 한 것.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PageContainerProps extends PageHeadProps {
}

const Main = styled.main`
  margin: ${MARGIN_SECTION} 0;
`;

/**
 * 페이지의 전체적인 레이아웃을 잡아주는 컴포넌트.
 * @param props
 */
export const PageContainer: FC<PageContainerProps> = (props) => (
  <>
    <PageHead title={props.title} />
    <GlobalStyle />
    <PageHeader />
    <Main>
      {props.children}
    </Main>
    <PageFooter />
  </>
);
