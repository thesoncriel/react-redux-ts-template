import React, { FC } from 'react';
import { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { hocStyled } from '../../../../common/hoc';

export interface JumbotronBottomLinkProps {
  /**
   * 클릭 시 연결될 웹주소.
   */
  link?: string;
}

const StyledLink = hocStyled(Link, css`
  display: block;
  color: #333;
  background: #eee;
`);

/**
 * describe
 * @param props
 */
export const JumbotronBottomLink: FC<JumbotronBottomLinkProps> = props => (
  props.link ?
    <StyledLink to={props.link}>
      {props.children}
    </StyledLink>
    : null
);