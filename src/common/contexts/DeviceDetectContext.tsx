import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { DeviceSizeType } from '../../styles';
import { isMobile, isTablet } from '../services/user-agent.service';

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

  return isMobile() || window.innerWidth < DeviceSizeType.TABLET;
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
    (window.innerWidth >= DeviceSizeType.TABLET &&
      window.innerWidth <= (DeviceSizeType.DESKTOP_SM - 1))
  );
}

export const DeviceDetectContext = createContext([
  getIsMobile(),
  getIsTablet(),
]);

const { Provider: DeviceDetectProvider } = DeviceDetectContext;

/**
 * 컨텍스트: UserAgent 및 Resizing 여부에 따른 태블릿/모바일 여부를 판별 해 준다.
 *
 * 지정된 곳 이외에서는 사용치 않는다.
 *
 * 내부적으로 window.mediaQuery API를 사용한다.
 *
 * @see https://stackoverflow.com/questions/29046324/whats-the-most-reliable-way-to-integrate-javascript-with-media-queries
 * @see https://jsperf.com/matchmedia-vs-resize/3
 */
export const DeviceDetectContextProvider: FC = ({ children }) => {
  const [isMobile, setIsMobile] = useState(getIsMobile());
  const [isTablet, setIsTablet] = useState(getIsTablet());

  useEffect(() => {
    if (isServer) {
      return;
    }

    const mqMobile = window.matchMedia(
      `screen and (max-width: ${DeviceSizeType.TABLET - 1}px)`);
    const mqTablet = window.matchMedia(
      `screen and (min-width: ${DeviceSizeType.TABLET
      }px) and (max-width: ${DeviceSizeType.DESKTOP_SM - 1}px)`
    );

    const handleResizeForMobile = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    const handleResizeForTablet = (e: MediaQueryListEvent) => {
      setIsTablet(e.matches);
    };

    mqMobile.addListener(handleResizeForMobile);
    mqTablet.addListener(handleResizeForTablet);

    return () => {
      mqMobile.removeListener(handleResizeForMobile);
      mqTablet.removeListener(handleResizeForTablet);
    };
  }, []);

  return (
    <DeviceDetectProvider value={[isMobile, isTablet]}>
      {children}
    </DeviceDetectProvider>
  );
};

export const useIsMobile = () => useContext(DeviceDetectContext)[0];
export const useIsTablet = () => useContext(DeviceDetectContext)[1];
