import React from 'react';
import styled from 'styled-components';
import { LayoutContainer } from './LayoutContainer';

const Footer = styled.footer`
  background: lightgray;
`;

/**
 * 페이지 하단을 출력하는 컴포넌트.
 * @constructor
 */
export const PageFooter: React.FC = () => (
  <Footer>
    <LayoutContainer>
      <small>copyright(?) PomPom</small>
    </LayoutContainer>
  </Footer>
);
