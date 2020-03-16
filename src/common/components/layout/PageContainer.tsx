import React, { FC } from 'react';
import styled from 'styled-components';
import GlobalStyle from '../../../styles/GlobalStyle';
import { PageFooter } from './PageFooter';
import { PageHead } from './PageHead';
import { PageHeader } from './PageHeader';

/**
 * 페이지 컨테이너의 프로퍼티를 정의 한 것.
 */
export interface PageContainerProps {
  /**
   * 출력될 제목
   */
  title?: string;
  /**
   * 노랑색 헤더 적용여부
   */
  yellowHeader?: boolean;
  /**
   * 하단 푸터 영역 숨김 여부
   */
  hideFooter?: boolean;
}

const Main = styled.main`
  overflow: hidden;
`;

const ContanerStyle = styled.div``;

/**
 * 페이지의 전체적인 레이아웃을 잡아주는 컴포넌트.
 * @param props
 */
export const PageContainer: FC<PageContainerProps> = (props) => (
  <ContanerStyle>
    <PageHead title={props.title} />
    <GlobalStyle />
    <PageHeader white={!props.yellowHeader} />
    <Main>{props.children}</Main>
    {!props.hideFooter && <PageFooter />}
  </ContanerStyle>
);
