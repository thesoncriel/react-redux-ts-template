import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { PageContainer } from '../common/components/layout';
import { getQueryParams } from '../util';

const Wrap = styled.div`
  width: 100%;
  text-align: center;
`;

export const QueryTestPage: React.FC<RouteComponentProps> = (props) => {
  const queryParams = getQueryParams(props);

  return (
    <PageContainer>
      <Wrap>
        <h1>React.js - Template Project</h1>
        <p>템플릿 프로젝트 메인</p>
        <ul>{JSON.stringify(queryParams)}</ul>
      </Wrap>
    </PageContainer>
  );
};
