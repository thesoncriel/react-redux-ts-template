import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import { debounce } from '../../util';
import { getUserAgent } from '../../services/user-agent.service';
import {
  DESKTOP_MIN_WIDTH,
  MOBILE_MIN_WIDTH,
  TABLET_MIN_WIDTH,
  TABLET_SMALL_MIN_WIDTH,
} from '../../styles/constants/device-sizes';

const isServer = typeof window === 'undefined';
// const _isMobile = isServer ? false : /iPhone|iPod|android/.test(window.navigator.userAgent);

function getIsMobile(userAgent: string): boolean {
  const regexMobile = /iPhone|iPod|Android/;

  if (isServer) {
    try {
      return regexMobile.test(userAgent);
    } catch (error) {
      //
    }
    return false;
  }

  return regexMobile.test(userAgent) || window.innerWidth <= MOBILE_MIN_WIDTH;
}

function getIsTablet(userAgent: string): boolean {
  const regexTablet = /iPad|Galaxy Tab/;

  if (isServer) {
    try {
      return regexTablet.test(userAgent);
    } catch (error) {
      //
    }
    return false;
  }
  return regexTablet.test(userAgent) || window.innerWidth <= TABLET_MIN_WIDTH;
}

export const DeviceDetectContext = createContext([false, false]);
const {
  Provider: DeviceDetectProvider,
  Consumer: DeviceDetectConsumer,
} = DeviceDetectContext;

export const DeviceDetectContextProvider: FC = ({ children }) => {
  const ua = getUserAgent();
  const [isMobile, setIsMobile] = useState(getIsMobile(ua));
  const [isTablet, setIsTablet] = useState(getIsTablet(ua));

  useEffect(() => {
    if (isServer) {
      return;
    }

    const handleResize = debounce(() => {
      const { innerWidth } = window;

      setIsMobile(innerWidth < TABLET_SMALL_MIN_WIDTH);
      setIsTablet(
        innerWidth >= TABLET_SMALL_MIN_WIDTH && innerWidth < DESKTOP_MIN_WIDTH,
      );
    }, 150);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize); // eslint-disable-line
  });

  return (
    <DeviceDetectProvider value={[isMobile, isTablet]}>
      {children}
    </DeviceDetectProvider>
  );
};

export const useIsMobile = () => useContext(DeviceDetectContext)[0];
export const useIsTablet = () => useContext(DeviceDetectContext)[1];
