import React, { FC } from 'react';
import styled from 'styled-components';
import { PageHead, PageHeadProps } from '../../../common/components';
import { MARGIN_SECTION } from '../../../styles/constants';
import GlobalStyle from '../../../styles/GlobalStyle';
import { PageFooter, PageHeader } from '../components';

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
 * 컨테이너: 페이지의 전체적인 레이아웃을 잡아주는 컴포넌트.
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
