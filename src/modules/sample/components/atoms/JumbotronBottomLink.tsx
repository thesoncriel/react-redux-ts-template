import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { hocSampleClickTracker } from '../../hoc';

export interface JumbotronBottomLinkProps {
  /**
   * 클릭 시 연결될 웹주소.
   */
  link?: string;
}

const StyledLink = styled(Link)`
  display: block;
  padding: 0.5em 0;
  color: #333;
  background: #eee;
`;

const TrackedLink = hocSampleClickTracker('linkClick', StyledLink);

/**
 * 점보트론 하단 링크를 표현한다.
 * @param props
 */
export const JumbotronBottomLink: FC<JumbotronBottomLinkProps> = props =>
  props.link ? (
    <TrackedLink to={props.link}>{props.children}</TrackedLink>
  ) : null;
