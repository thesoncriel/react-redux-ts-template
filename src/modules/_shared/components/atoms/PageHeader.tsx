import React, { FC } from 'react';
import styled from 'styled-components';

const Header = styled.header`
  background: skyblue;
`;

/**
 * 페이지 헤더 컴포넌트.
 * @constructor
 */
export const PageHeader: FC = () => (
  <Header />
);
