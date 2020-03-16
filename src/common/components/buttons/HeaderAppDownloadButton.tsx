import React from 'react';
import styled from 'styled-components';
import { mxBreakpoint } from '../../../styles/mixins';
import {
  COLOR_BLACK,
  COLOR_BLACK_OVER,
  COLOR_WHITE_OVER,
  TRANSITION_BUTTON,
} from '../../../styles/variables';
import { cn } from '../../../util';
import { Icon } from '../Icon';

interface Props {
  /**
   * 애플 앱스토어 버전으로 변경 여부
   */
  appStore?: boolean;

  className?: string;

  onClick?: (event: React.MouseEvent) => void;
}

const Button = styled.div`
  display: inline-flex;
  align-items: center;
  /* align-content: center; */
  justify-content: center;
  width: 200px;
  height: 50px;
  border: solid 1px rgba(0, 0, 0, 0.08);
  border-radius: 50px;
  transition: ${TRANSITION_BUTTON};
  letter-spacing: 1px;
  line-height: 24px;
  font-size: 16px;
  background: #fff;
  cursor: pointer;

  ${mxBreakpoint.mobile} {
    width: 160px;
    height: 44px;
    font-size: 14px;
  }

  &:hover {
    border-color: ${COLOR_WHITE_OVER};
    background: ${COLOR_WHITE_OVER};
  }

  & > .icon {
    margin-right: 0.6em;
  }

  &.appStore {
    border-color: ${COLOR_BLACK};
    color: #fff;
    background: ${COLOR_BLACK};

    &:hover {
      border-color: ${COLOR_BLACK_OVER};
      background: ${COLOR_BLACK_OVER};
    }
  }
`;

/**
 * 앱 다운로드 버튼을 만든다.
 * @param props
 */
export const HeaderAppDownloadButton: React.FC<Props> = ({
  appStore,
  className,
  onClick,
}) => {
  const handleOnClick = (event: React.MouseEvent) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Button onClick={handleOnClick} className={cn(className, { appStore })}>
      <Icon>{appStore ? 'apple' : 'google-play'}</Icon>
      {appStore ? 'App Store' : 'Google Play'}
    </Button>
  );
};
