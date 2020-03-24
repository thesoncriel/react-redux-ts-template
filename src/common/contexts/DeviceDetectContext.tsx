import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import { debounce } from '../../util';
import { isMobile, isTablet } from '../services/user-agent.service';
import {
  DESKTOP_MIN_WIDTH,
  TABLET_MIN_WIDTH,
  TABLET_SMALL_MIN_WIDTH,
} from '../../styles/constants/device-sizes';

const isServer = typeof window === 'undefined';
// const _isMobile = isServer ? false : /iPhone|iPod|android/.test(window.navigator.userAgent);

function getIsMobile(): boolean {
  if (isServer) {
    try {
      return isMobile();
    } catch (error) {
      //
    }
    return false;
  }

  return isMobile() || window.innerWidth < TABLET_SMALL_MIN_WIDTH;
}

function getIsTablet(): boolean {
  if (isServer) {
    try {
      return isTablet();
    } catch (error) {
      //
    }
    return false;
  }
  return (
    isTablet() ||
    (window.innerWidth >= TABLET_SMALL_MIN_WIDTH &&
      window.innerWidth <= TABLET_MIN_WIDTH)
  );
}

export const DeviceDetectContext = createContext([
  getIsMobile(),
  getIsTablet(),
]);

const { Provider: DeviceDetectProvider } = DeviceDetectContext;

export const DeviceDetectContextProvider: FC = ({ children }) => {
  const [isMobile, setIsMobile] = useState(getIsMobile());
  const [isTablet, setIsTablet] = useState(getIsTablet());

  // const handle

  useEffect(() => {
    if (isServer) {
      return;
    }

    const handleResize = debounce(() => {
      const { innerWidth } = window;
      const bIsMobile = innerWidth < TABLET_SMALL_MIN_WIDTH;
      const bIsTablet =
        !bIsMobile &&
        innerWidth >= TABLET_SMALL_MIN_WIDTH &&
        innerWidth < DESKTOP_MIN_WIDTH;

      setIsMobile(bIsMobile);
      setIsTablet(bIsTablet);

      // console.log('isMobile', bIsMobile, 'isTablet', bIsTablet, 'innerWidth', innerWidth);
    }, 150);

    window.addEventListener('resize', handleResize);

    // handleResize();

    return () => window.removeEventListener('resize', handleResize); // eslint-disable-line
  }, []);

  return (
    <DeviceDetectProvider value={[isMobile, isTablet]}>
      {children}
    </DeviceDetectProvider>
  );
};

export const useIsMobile = () => useContext(DeviceDetectContext)[0];
export const useIsTablet = () => useContext(DeviceDetectContext)[1];
