import React from 'react';
import styled from 'styled-components';
import {
  COLOR_BLACK,
  COLOR_BLACK_OVER,
  COLOR_VERY_LIGHT_GRAY,
  TRANSITION_BUTTON,
} from '../../../styles/variables';
import { cn } from '../../../util';
import { RightCircleIcon } from '../icons/RightCircleIcon';

interface Props {
  href?: string;
  to?: string;
  white?: boolean;
  fat?: boolean;
}

const Anchor = styled.a`
  display: inline-block;
  width: 170px;
  height: 36px;
  /* padding: 5px; */
  margin: 0;
  margin-left: 8px;
  border: solid 1px ${COLOR_BLACK};
  border-radius: 18px;
  transition: ${TRANSITION_BUTTON};
  font-size: 16px;
  line-height: 1.4;
  background: ${COLOR_BLACK};
  cursor: pointer;

  &:link,
  &:hover,
  &:visited,
  &:active {
    color: #fff;
  }
  &:hover {
    border-color: ${COLOR_BLACK_OVER};
    background: ${COLOR_BLACK_OVER};
  }

  &.white {
    color: ${COLOR_BLACK};
    background: #fff;

    &:hover {
      background: ${COLOR_VERY_LIGHT_GRAY};
    }
  }

  .btn-body {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding-right: 24px;
    text-align: center;
  }

  .right-icon {
    position: absolute;
    top: 5px;
    right: 5px;
  }

  &.fat {
    height: 44px;
    padding-left: 4px;
    border-radius: 26px;
    /* line-height: 1.6; */
    font-size: 14px;

    .btn-body {
      padding-right: 30px;
    }
    .right-icon {
      top: 10px;
    }
  }

  /* & > .btn-body {
    display: flex;
    align-items: center;

    & > .left-text {
      flex-grow: 1;
      text-align: center;
    }

    & > .right-icon {
      flex-shrink: 1;
      padding: 5px;
    }
  } */

  .right-icon {
    .fat {
      transform: scale(1.35);
      transform-origin: right;
    }
  }
`;

export const HospitalManagerLinkButton: React.FC<Props> = (props) => {
  const { white, href, to, fat } = props;

  const inner = (
    <span className="btn-body">
      <span className="left-text">{props.children}</span>
      <span className="right-icon">
        <RightCircleIcon className={cn({ fat })} white={!white} />
      </span>
    </span>
  );

  const classNames = cn({ white, fat });

  if (to) {
    return (
      <Anchor href={to} className={classNames}>
        {inner}
      </Anchor>
    );
  }

  return (
    <Anchor href={href} target="_blank" className={classNames}>
      {inner}
    </Anchor>
  );
};
