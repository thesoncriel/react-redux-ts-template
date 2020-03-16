/* eslint-disable no-underscore-dangle */
import { CSSProperties } from 'styled-components';

export function getTransformStyles(val: string): CSSProperties {
  if (!val) {
    return {
      msTransform: undefined,
      WebkitTransform: undefined,
      transform: undefined,
    };
  }
  return {
    msTransform: val,
    WebkitTransform: val,
    transform: val,
  };
}

function getTransformOriginStyles(val: string): CSSProperties {
  if (!val) {
    return {
      transformOrigin: undefined,
      msTransformOrigin: undefined,
      WebkitTransformOrigin: undefined,
    };
  }

  return {
    transformOrigin: val,
    msTransformOrigin: val,
    WebkitTransformOrigin: val,
  };
}

export function getTransitionStyles(val: string): CSSProperties {
  if (!val) {
    return {
      msTransition: undefined,
      WebkitTransition: undefined,
      transition: undefined,
    };
  }
  return {
    msTransition: val,
    WebkitTransition: val ? `-webkit-${val}` : val,
    transition: val,
  };
}

function _getAnimationStyles(
  positioning: boolean,
  distance: number,
  transitionCode: string,
  transformCode: string,
): CSSProperties {
  if (positioning) {
    return {
      ...getTransformStyles(transformCode),
      ...getTransitionStyles(''),
    };
  }

  if (distance === 0) {
    return {
      ...getTransformStyles(''),
      ...getTransitionStyles(transitionCode),
    };
  }

  return {
    ...getTransformStyles(''),
    ...getTransitionStyles(''),
  };
}

/**
 * CSS Transition - Translate 애니메이션에 쓰이는 인라인 스타일을 만든다.
 *
 * 세로 방향 (Vertical) 의 스타일 전용.
 * @param positioning 요소가 자리잡는 중인지의 여부. true 면 transform 스타일을 주지 않는다.
 * @param distance 이동 할 거리. (픽셀)
 * @param duration 애니메이션이 진행될 시간 (ms)
 * @param easing 움직이는 형태 (easing). 기본 linear.
 */
export function getVerticalAnimationStyles(
  positioning: boolean,
  distance: number,
  duration: number,
  easing = 'linear',
): CSSProperties {
  const transformCode = `translate(0, ${distance}px)`;
  const transitionCode = `all ${duration}ms ${easing}`;

  return _getAnimationStyles(
    positioning,
    distance,
    transitionCode,
    transformCode,
  );
}

function _getAnimationStylesForH(
  positioning: boolean,
  distance: number,
  transitionCode: string,
  transformCode: string,
): CSSProperties {
  if (positioning) {
    return {
      ...getTransformStyles(''),
      ...getTransitionStyles(transitionCode),
    };
  }

  if (distance !== 0) {
    return {
      ...getTransformStyles(transformCode),
      ...getTransitionStyles(transitionCode),
    };
  }

  return {
    ...getTransformStyles(''),
    ...getTransitionStyles(transitionCode),
  };
}

/**
 * CSS Transition - Translate 애니메이션에 쓰이는 인라인 스타일을 만든다.
 *
 * 가로 방향 (Horizontal) 의 스타일 전용.
 * @param positioning 요소가 자리잡는 중인지의 여부. true 면 transform 스타일을 주지 않는다.
 * @param distance 이동 할 거리. (픽셀)
 * @param duration 애니메이션이 진행될 시간 (ms)
 * @param easing 움직이는 형태 (easing). 기본 linear.
 */
export function getHorizontalAnimationStyles(
  positioning: boolean,
  distance: number,
  duration: number,
  easing = 'linear',
): CSSProperties {
  const transformCode = `translate(${distance}px, 0)`;
  const transitionCode = `all ${duration}ms ${easing}`;

  return _getAnimationStylesForH(
    positioning,
    distance,
    transitionCode,
    transformCode,
  );
}

/**
 * CSS 트랜지션 애니매이션을 이용할 때 시작 위치를 지정하기 위한 스타일을 가져온다.
 * @param distance 이동 거리 (pixel) - 기본 100
 * @param duration 진행 시간 (milliseconds) - 기본 1000
 * @param easing 움직이는 형태. - 기본 linear
 * @param delay 실제 동작전 까지 줄 딜레이 시간 (milliseconds)
 * @param direction 방향. 0:제자리, 1:top, 2:right, 3:bottom, 4:left - 기본 0
 */
export function getTranslateStartStyles(
  distance = 100,
  duration = 1000,
  easing = 'linear',
  delay = 0,
  direction = 0,
): CSSProperties {
  let posX = 0;
  let posY = 0;

  switch (direction) {
    case 1:
      posY = -1 * distance;
      break;
    case 2:
      posX = distance;
      break;
    case 3:
      posY = distance;
      break;
    case 4:
      posX = -1 * distance;
      break;
    default:
  }

  const transformCode =
    posX === 0 && posY === 0 ? '' : `translate(${posX}px,${posY}px)`;
  // const transformCode = `translate(${posX}px,${posY}px)`;
  const transitionCode = `all ${duration}ms ${easing} ${delay}ms`;

  return {
    ...getTransformStyles(transformCode),
    ...getTransitionStyles(transitionCode),
  };
}

function getDirectionCodeToName(direction: number) {
  switch (direction) {
    case 1:
      return 'top';
    case 2:
      return 'right';
    case 3:
      return 'bottom';
    case 4:
      return 'left';
    default:
      return '';
  }
}

/**
 * 세로, 혹은 가로로 길어지는 애니메이션 스타일을 가져온다.
 *
 * 시작은 0 으로 시작하되, 끝날 때는 본래 길이로 길어진다.
 * @param duration 진행되는 시간 (ms)
 * @param easing 애니메이션 진행 형태 (easing)
 * @param delay 시작 전 딜레이 (ms)
 * @param direction 방향. 0:제자리, 1:top, 2:right, 3:bottom, 4:left - 기본 0
 */
export function getGrowStartStyles(
  duration = 1000,
  easing = 'linear',
  delay = 0,
  direction = 0,
): CSSProperties {
  // const key = (direction === 1) ? 'height' : 'width';
  const pos = direction % 2 === 0 ? 'X' : 'Y';
  const transformCode = direction > 0 ? `scale${pos}(0)` : 'scale(0)';
  const transitionCode = `all ${duration}ms ${easing} ${delay}ms`;

  return {
    ...getTransformOriginStyles(getDirectionCodeToName(direction)),
    ...getTransformStyles(transformCode),
    ...getTransitionStyles(transitionCode),
  };
}

/**
 * CSS 트랜지션 애니매이션을 이용할 때 종료 위치를 지정하기 위한 스타일을 가져온다.
 * @param duration 진행 시간 (milliseconds) - 기본 1000
 * @param easing 움직이는 형태. - 기본 linear
 * @param delay 실제 동작전 까지 줄 딜레이 시간 (milliseconds)
 * @param direction 방향. 0:제자리, 1:top, 2:right, 3:bottom, 4:left - 기본 0
 */
export function getTransitionEndStyles(
  duration = 1000,
  easing = 'linear',
  delay = 0,
  direction = 0,
): CSSProperties {
  const transitionCode = `all ${duration}ms ${easing} ${delay}ms`;

  return {
    ...getTransformOriginStyles(getDirectionCodeToName(direction)),
    ...getTransformStyles(''),
    ...getTransitionStyles(transitionCode),
  };
}
