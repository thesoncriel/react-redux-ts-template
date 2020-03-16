import React from 'react';
import styled from 'styled-components';
import {
  COLOR_BLACK,
  COLOR_BLACK_OVER,
  COLOR_VERY_LIGHT_GRAY,
  TRANSITION_BUTTON,
} from '../../../styles/variables';
import { cn, newWindow } from '../../../util';
import { RightCircleIcon } from '../icons/RightCircleIcon';
import { HeaderAppDownloadButton } from '../buttons';

interface Props {
  href?: string;
  to?: string;
  white?: boolean;
  fat?: boolean;
  /**
   * 버튼인지 앵커인지 정하는 프로퍼티
   */
  isButton?: boolean;
  isShowDropdown?: boolean;
  toggleDropDown?: (value?: boolean) => void;
}

const urlAppDownload = '';

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
    width: 24px;
    height: 24px;
    transition-duration: 0.3s;
    transform: rotate(0deg);
    transform-origin: center;
    .fat {
      transform: scale(1.35);
      transform-origin: right;
    }
  }

  .right-icon.rotation {
    transform: rotate(90deg);
  }
`;

const Button = styled.button``;

const DesktopAppDownloadMenu = styled.div`
  position: absolute;
  top: 60px;
  right: -40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 260px;
  height: 184px;
  padding: 30px 0;
  box-shadow: 0 16px 32px 0 rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  &:hover {
    cursor: default;
  }

  &.dropdown.show {
  }

  &.dropdown.hide {
    width: 0px;
    height: 0px;
    overflow: hidden;
  }
`;

export const HeaderAppDownloadNavigation: React.FC<Props> = props => {
  const {
    white = true,
    href,
    fat,
    isButton,
    isShowDropdown,
    toggleDropDown,
  } = props;

  const rightIconClassName = isShowDropdown
    ? 'right-icon rotation'
    : 'right-icon';

  const inner = (
    <span className="btn-body">
      <span className="left-text">{props.children}</span>
      <span className={rightIconClassName}>
        <RightCircleIcon className={cn({ fat })} />
      </span>
    </span>
  );

  const classNames = cn({ white, fat });

  const handleClickDownloadMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleOnBlur = () => {
    if (toggleDropDown) {
      toggleDropDown(false);
    }
  };

  const handleOnClickButton = () => {
    if (toggleDropDown) {
      toggleDropDown(!isShowDropdown);
    }
  };

  const handleOnClickPlayStore = (event: React.MouseEvent) => {
    newWindow(urlAppDownload);
    event.stopPropagation();
  };

  const handleOnClickAppStore = (event: React.MouseEvent) => {
    newWindow(urlAppDownload);
    event.stopPropagation();
  };

  if (isButton) {
    const dropDownClassNames = isShowDropdown
      ? 'dropdown show'
      : 'dropdown hide';

    return (
      <Button onClick={handleOnClickButton} onBlur={handleOnBlur}>
        <Anchor className={classNames}>{inner}</Anchor>
        <DesktopAppDownloadMenu
          className={dropDownClassNames}
          onClick={handleClickDownloadMenu}
        >
          <HeaderAppDownloadButton onClick={handleOnClickPlayStore} />
          <HeaderAppDownloadButton onClick={handleOnClickAppStore} appStore />
        </DesktopAppDownloadMenu>
      </Button>
    );
  }

  return (
    <Anchor href={href} target="_blank" className={classNames}>
      {inner}
    </Anchor>
  );
};
