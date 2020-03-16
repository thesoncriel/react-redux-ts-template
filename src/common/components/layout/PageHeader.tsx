import { debounce, isNil as _isNil } from 'lodash';
import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import { LayoutContainer } from '.';
import { HeaderLogoIcon } from '../icons';
import { mxBreakpoint } from '../../../styles/mixins';
import {
  COLOR_WHITE_OVER,
  COLOR_YELLOW,
  MOBILE_PORTRAIT_MAX_WIDTH,
  SIZE_HEADER_HEIGHT,
  SIZE_HEADER_MOBILE_HEIGHT,
  TRANSITION_EASING,
} from '../../../styles/variables';
import { cn, isServer, stopBodyScrolling } from '../../../util';
// import { DrawerButton } from '../buttons/DrawerButton';
import { ButtonNavigation, TopNavigation } from '../navigation';
import { ModalNavigation } from '../navigation/ModalNavigation';

interface Props {
  white?: boolean;
}

const StickyHeight = styled.div`
  height: ${SIZE_HEADER_HEIGHT}px;

  ${mxBreakpoint.mobile} {
    height: ${SIZE_HEADER_MOBILE_HEIGHT}px;
  }
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${SIZE_HEADER_HEIGHT}px;
  z-index: 10;
  transition: 0.6s opacity ${TRANSITION_EASING};
  background: ${COLOR_YELLOW};

  ${mxBreakpoint.mobile} {
    height: ${SIZE_HEADER_MOBILE_HEIGHT}px;
  }

  &.white {
    border-bottom: 1px solid ${COLOR_WHITE_OVER};
    background: #fff;
  }

  .container {
    display: flex;
  }
  .logo {
    flex-shrink: 1;
    align-self: center;
    z-index: 12;
    overflow: hidden;

    ${mxBreakpoint.mobile} {
      transition: 0.3s opacity;
    }

    &.showMenu {
      opacity: 0;
    }
  }
  .btn-group {
    flex-grow: 1;
    text-align: right;
  }
  .drawer-btn {
    position: relative;
    right: -16px;
    z-index: 12;

    ${mxBreakpoint.desktop} {
      display: none;
    }
    ${mxBreakpoint.tablet} {
      display: none;
    }
  }
  .view-lg {
    ${mxBreakpoint.mobile} {
      display: none;
    }
  }
`;

export const PageHeader: React.FC<Props> = ({ white }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showAppDownloadMenu, setShowAppDownloadMenu] = useState(false);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!isServer()) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      window.addEventListener('resize', handleWindowResize);
      return () => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        window.removeEventListener('resize', handleWindowResize);
      };
    }
  }, []);

  useEffect(() => {
    stopBodyScrolling(showMenu);
  }, [showMenu]);

  const handleWindowResize = debounce(() => {
    const width = window.innerWidth;

    if (showMenu && width > MOBILE_PORTRAIT_MAX_WIDTH) {
      setShowMenu(false);
    }
  }, 300);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const handleDropdownButtonClick = (value?: boolean) => {
    if (!_isNil(value)) {
      setShowAppDownloadMenu(value);
    } else {
      setShowAppDownloadMenu(!showAppDownloadMenu);
    }
  };

  return (
    <Fragment>
      <StickyHeight />
      <Header className={cn({ white: showMenu || white })}>
        <LayoutContainer innerPadding className="container">
          <a href="/" className={cn('logo', { showMenu })}>
            <HeaderLogoIcon white={!white} />
          </a>
          <div className="btn-group">
            <TopNavigation className="view-lg" />
            <ButtonNavigation
              className="view-lg"
              showAppDownloadMenu={showAppDownloadMenu}
              toggleDropDown={handleDropdownButtonClick}
            />
            {/* <DrawerButton
              className="drawer-btn"
              close={showMenu}
              onClick={handleMenuClick}
            /> */}
          </div>
        </LayoutContainer>
        <ModalNavigation
          show={showMenu}
          white={white}
          onClose={handleMenuClick}
        />
      </Header>
    </Fragment>
  );
};
