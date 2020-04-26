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

interface ThemeDeviceSizeModel {
  mobileSm: string;
  mobile: string;
  tabletSm: string;
  tablet: string;
  desktopSm: string;
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

enum DeviceSizeType {
  MOBILE_SM = '320px',
  MOBILE = '481px',
  TABLET_SM = '641px',
  TABLET = '961px',
  DESKTOP_SM = '1025px',
  DESKTOP = '1280px',
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
    mobileSm: DeviceSizeType.MOBILE_SM,
    mobile: DeviceSizeType.MOBILE,
    tabletSm: DeviceSizeType.TABLET_SM,
    tablet: DeviceSizeType.TABLET,
    desktopSm: DeviceSizeType.DESKTOP_SM,
    desktop: DeviceSizeType.DESKTOP,
  },
}

