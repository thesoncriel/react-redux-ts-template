import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import { debounce } from '../../util';
import { getUserAgent } from '../../services/user-agent.service';
import { MOBILE_LANDSCAPE_MIN_WIDTH } from '../../styles/variables';

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

  const bRet =
    regexMobile.test(userAgent) ||
    window.innerWidth <= MOBILE_LANDSCAPE_MIN_WIDTH;

  return bRet;
}

function getIsTablet(req?: any): boolean {
  const regexTablet = /iPad/;

  if (isServer) {
    try {
      return regexTablet.test(req.headers['user-agent']);
    } catch (error) {
      //
    }
    return false;
  }
  return regexTablet.test(navigator.userAgent);
}

export const DeviceDetectContext = createContext([false, false]);

export const DeviceDetectContextProvider: FC = ({ children }) => {
  const ua = getUserAgent();
  const [isMobile, setIsMobile] = useState(getIsMobile(ua));
  const [isTablet, setIsTablet] = useState(getIsTablet(ua));
  const [isIPadPort, setIsIPadPort] = useState(false);

  useEffect(() => {
    if (isServer) {
      return;
    }

    const handleResize = debounce(() => {
      const { innerWidth } = window;

      setIsMobile(innerWidth <= MOBILE_LANDSCAPE_MIN_WIDTH);
      setIsTablet(innerWidth >= 768 && innerWidth <= 1366);
      setIsIPadPort(innerWidth === 768);
    }, 150);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize); // eslint-disable-line
  });

  return (
    <DeviceDetectContext.Provider value={[isMobile, isTablet, isIPadPort]}>
      {children}
    </DeviceDetectContext.Provider>
  );
};

export const useIsMobile = () => useContext(DeviceDetectContext)[0];
export const useIsTablet = () => useContext(DeviceDetectContext)[1];
export const useIsIPadPortrait = () => useContext(DeviceDetectContext)[2];
