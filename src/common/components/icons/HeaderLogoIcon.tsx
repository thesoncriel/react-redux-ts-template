import React from 'react';
import styled from 'styled-components';
import { cn } from '../../../util';
import { Icon } from '../Icon';

interface Props {
  white?: boolean;
  className?: string;
}

const Wrap = styled.h1`
  position: relative;
  height: 29px;
  /* overflow-y: hidden; */

  & > .icon {
    display: block;
    transition: opacity 0.2s linear;
    &:nth-child(2) {
      position: absolute;
      top: 0;
    }
  }
  & > span {
    display: none;
  }
  & > .trans {
    opacity: 0;
  }
`;

export const HeaderLogoIcon: React.FC<Props> = ({ white, className }) => (
  <Wrap className={className}>
    <Icon className={cn({ trans: !white })}>bi-white</Icon>
    <Icon className={cn({ trans: white })}>bi</Icon>
    <span>똑닥</span>
  </Wrap>
);
