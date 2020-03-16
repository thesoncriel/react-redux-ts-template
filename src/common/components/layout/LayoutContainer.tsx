import React from 'react';
import styled from 'styled-components';
import { mxBreakpoint } from '../../../styles/mixins';
import {
  DESKTOP_MAX_WIDTH,
  MOBILE_PORTRAIT_MAX_WIDTH,
  SIZE_SIDE_PADDING_MOBILE,
  SIZE_SIDE_PADDING_TABLET,
  SIZE_SIDE_PADDING_TABLET_INNER,
  TABLET_LANDSCAPE_MIN_WIDTH,
} from '../../../styles/variables';
import { cn } from '../../../util';

interface Props {
  /**
   * 내부 여백 적용 여부.
   *
   * 기본 false.
   */
  innerPadding?: boolean;
  /**
   * 태블릿 전용 내부 여백 적용 여부.
   *
   * 기본 false.
   */
  tabletPadding?: boolean;
  /**
   * 태블릿 전용 내부 여백 중 왼쪽만을 지정할지의 여부.
   *
   * 기본 false.
   */
  tabletLeftPadding?: boolean;
  /**
   * 태블릿 전용 내부 여백 중 오른쪽 만을 지정할지의 여부.
   *
   * 기본 false.
   */
  tabletRightPadding?: boolean;
  /**
   * 모바일 전용 최대폭을 지정한다.
   */
  mobileMaxWidth?: boolean;
  /**
   * 모바일 및 태블릿 모드일 때 최대폭을 지정한다.
   */
  mtWidth?: boolean;
  /**
   * position: relative 를 적용 시킨다.
   */
  relative?: boolean;
  /**
   * 현재 컴포넌트에 적용 할 CSS 클래스명.
   */
  className?: string;
}

/**
 * 가운데 정렬을 하는 레이아웃 컨네이너.
 */
export const Wrap = styled.div`
  width: 100%;
  margin: 0 auto;

  ${mxBreakpoint.desktop} {
    max-width: ${DESKTOP_MAX_WIDTH}px;
  }
  ${mxBreakpoint.tablet} {
    max-width: ${TABLET_LANDSCAPE_MIN_WIDTH}px;
    padding: 0
      ${props => (props.theme === 'ip' ? SIZE_SIDE_PADDING_TABLET : 0)}px;
  }
  ${mxBreakpoint.mobile} {
    max-width: ${MOBILE_PORTRAIT_MAX_WIDTH}px;
    padding: 0
      ${props => (props.theme === 'ip' ? SIZE_SIDE_PADDING_MOBILE : 0)}px;
  }

  &.relative {
    position: relative;
  }

  &.tabletPadding {
    ${mxBreakpoint.tablet} {
      padding: 0 ${SIZE_SIDE_PADDING_TABLET_INNER}px;
    }
  }
  &.tabletLeftPadding {
    ${mxBreakpoint.tablet} {
      padding: 0 0 0 ${SIZE_SIDE_PADDING_TABLET_INNER}px;
    }
  }
  &.tabletRightPadding {
    ${mxBreakpoint.tablet} {
      padding: 0 ${SIZE_SIDE_PADDING_TABLET_INNER}px 0 0;
    }
  }
  &.mobileMaxWidth {
    ${mxBreakpoint.mobile} {
      max-width: 400px;
    }
  }
  &.mtWidth {
    ${mxBreakpoint.tablet} {
      max-width: 824px;
      padding: 0;
    }
  }
`;

/**
 * 페이지 내 컨텐츠 표현 시 좌우 여백을 동일하게 잡아주는 컴포넌트.
 *
 * 반응형으로 동작되며 화면 크기에 따라 알맞은 여백을 자동으로 적용한다.
 * @param param0
 */
export const LayoutContainer: React.FC<Props> = ({
  innerPadding,
  tabletPadding,
  tabletLeftPadding,
  tabletRightPadding,
  mtWidth,
  mobileMaxWidth,
  className,
  relative,
  children,
}) => (
  <Wrap
    theme={innerPadding ? 'ip' : ''}
    className={cn(className, {
      relative,
      tabletPadding,
      tabletLeftPadding,
      tabletRightPadding,
      mtWidth,
      mobileMaxWidth,
    })}
  >
    {children}
  </Wrap>
);
