import React from 'react';
import styled from 'styled-components';
import { PageContainer } from '../common/components/layout';

const Wrap = styled.div`
  width: 100%;
  text-align: center;
`;

export const TestPage: React.FC<{}> = () => (
  <PageContainer>
    <Wrap>
      <h1>React.js - Template Project</h1>
      <p>템플릿 프로젝트 메인</p>
      <ul>
        <li>&apos;ㅅ&apos;)b</li>
        <li>하하하</li>
      </ul>
    </Wrap>
  </PageContainer>
);
