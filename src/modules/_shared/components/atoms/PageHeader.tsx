import React, { FC } from 'react';
import styled from 'styled-components';
import { LayoutContainer } from './LayoutContainer';
import { Link } from 'react-router-dom';

const Header = styled.header`
  background: ${props => props.theme.color.headerBg};
`;

const H1 = styled.h1`
  font-size: 1.2em;
  font-weight: bold;
`;

const StyledLink = styled(Link)`
  &:link,
  &:visited {
    color: inherit;
  }
`;

/**
 * 페이지 헤더 컴포넌트.
 */
export const PageHeader: FC = props => (
  <Header>
    <LayoutContainer>
      <H1>
        <StyledLink to="/">
          {props.children}
        </StyledLink>
      </H1>
    </LayoutContainer>
  </Header>
);
