import React, { FC } from 'react';
import styled from 'styled-components';
import {
  JumbotronBottomLink,
  JumbotronBottomLinkProps,
} from '../atoms/JumbotronBottomLink';

/**
 * 점보트론 컴포넌트의 프로퍼티.
 */
export interface JumbotronProps extends JumbotronBottomLinkProps {
  /**
   * 하단에 출력될 명칭.
   */
  name?: string;
}

const StyledJumbotron = styled.article`
  overflow: hidden;
  border-radius: 5px;
  text-align: center;
  background: #e0e0e0;
`;

const Wrap = styled.p`
  padding: 2em 0;
  font-size: 3em;
`;

/**
 * 넓은 영역에 큰 글자를 출력한다.
 * @param props
 */
export const Jumbotron: FC<JumbotronProps> = props => (
  <StyledJumbotron>
    <Wrap>{props.children}</Wrap>
    <JumbotronBottomLink link={props.link}>
      {props.name || '없음'}
    </JumbotronBottomLink>
  </StyledJumbotron>
);
