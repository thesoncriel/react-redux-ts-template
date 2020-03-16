import React from 'react';
import styled, { keyframes } from 'styled-components';
import { PageContainer } from '../common/components/layout';
import { Icon } from '../common/components/Icon';

const rotation = keyframes`
  0% {
    transform: rotate( 0deg );
  }
  100% {
    transform: rotate( 360deg );
}
`;

const Wrap = styled.div`
  width: 100%;
  text-align: center;
  & > i {
    margin: 100px;
    animation: ${rotation} 2s infinite linear;
  }
`;

const Anchor = styled.a`
  display: block;
  width: 200px;
  height: 3em;
  line-height: 3em;
  background-color: #ffed49;
  color: #2c3744;
  margin: 10px auto;
`;

export const IndexPage: React.FC<{}> = () => (
  <PageContainer>
    <Wrap>
      <Icon>logo</Icon>
      <Anchor href="/test">테스트 페이지</Anchor>
      <Anchor href="/test/parameters/ddocdoc?id=bbros">
        테스트 페이지 파라미터
      </Anchor>
      <Anchor href="/test/list">테스트 페이지 리스트</Anchor>
    </Wrap>
  </PageContainer>
);
