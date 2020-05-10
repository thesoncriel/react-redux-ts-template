import 'styled-components';
import { DefaultTheme } from 'styled-components';

interface ThemeColorModel {
  text: string;
  textOver: string;
  textMute: string;
  primary: string;
  secondary: string;
  tertiary: string;
  primaryLight: string;
  primaryDark: string;
  secondaryLight: string;
  secondaryDark: string;
  tertiaryLight: string;
  tertiaryDark: string;
  headerBg: string;
  footerBg: string;
}

/**
 * 기기별 사이즈를 정해놓은 모델.
 * 사용 단위는 px.
 */
interface ThemeDeviceSizeModel {
  /**
   * 작은 모바일 기기
   *
   * ex: iPhone 4S, iPhone 5
   */
  mobileSm: string;
  /**
   * 일반적인 모바일 기기
   *
   * ex: iPhone 6 이상, Galaxy S5 이상
   */
  mobile: string;
  /**
   * 작은 태블릿 기기
   *
   * ex: iPad Normal, iPad Mini, Nexus 7 등
   */
  tabletSm: string;
  /**
   * 일반 태블릿 기기
   *
   * ex: iPad Pro
   */
  tablet: string;
  /**
   * 작은 데스크탑, 혹은 큰 태블릿 기기
   *
   * ex: iPad Pro
   */
  desktopSm: string;
  /**
   * 일반적인 데스크탑
   */
  desktop: string;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    color: ThemeColorModel;
    deviceSize: ThemeDeviceSizeModel;
  }
}

/**
 * 컬러 참고:
 * https://coolors.co/e63946-f1faee-a8dadc-457b9d-1d3557
 */
enum ThemeColorType {
  IMPERIAL_RED = '#E63946',
  HONEYDEW = '#F1FAEE',
  POWDER_BLUE = '#A8DADC',
  STEEL_BLUE = '#457B9D',
  PRUSSIAN_BLUE = '#1D3557',
}

/**
 * 기기별 사이즈를 정의한 것.
 *
 * 사이즈 참고:
 * https://stackoverflow.com/questions/6370690/media-queries-how-to-target-desktop-tablet-and-mobile
 */
export enum DeviceSizeType {
  MOBILE_SM = 320,
  MOBILE = 481,
  TABLET_SM = 641,
  TABLET = 961,
  DESKTOP_SM = 1025,
  DESKTOP = 1280,
}

/**
 * 테마 모음.
 *
 */
export const theme: DefaultTheme = {
  color: {
    text: '#2c3744',
    textOver: '#506073',
    textMute: '#80878f',
    primary: ThemeColorType.IMPERIAL_RED,
    secondary: ThemeColorType.PRUSSIAN_BLUE,
    tertiary: ThemeColorType.STEEL_BLUE,
    primaryLight: 'hsl(355, 75%, 61%)',
    primaryDark: 'hsl(355, 75%, 51%)',
    secondaryLight: 'hsl(215, 67%, 28%)',
    secondaryDark: 'hsl(215, 67%, 18%)',
    tertiaryLight: 'hsl(203, 56%, 49%)',
    tertiaryDark: 'hsl(203, 56%, 39%)',
    headerBg: ThemeColorType.HONEYDEW,
    footerBg: ThemeColorType.POWDER_BLUE,
  },
  deviceSize: {
    mobileSm: DeviceSizeType.MOBILE_SM + 'px',
    mobile: DeviceSizeType.MOBILE + 'px',
    tabletSm: DeviceSizeType.TABLET_SM + 'px',
    tablet: DeviceSizeType.TABLET + 'px',
    desktopSm: DeviceSizeType.DESKTOP_SM + 'px',
    desktop: DeviceSizeType.DESKTOP + 'px',
  },
}

