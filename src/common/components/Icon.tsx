import React from 'react';
import { CSSProperties } from 'styled-components';
import { ClassNameProps } from '../models';

interface Props extends ClassNameProps {
  /**
   * 적용될 인라인 스타일
   */
  style?: CSSProperties;
}

/**
 * 아이콘을 출력한다.
 *
 * children 으로 아이콘 명칭을 주면 출력 된다.
 *
 * 아이콘 명칭은 static/sprite/sprite-test.html 을 참고하되 앞쪽의 icon- 를 제외하면 된다.
 * @param param0
 */
export const Icon: React.FC<Props> = ({ className, style, children }) => (
  <i
    className={`icon icon-${children + (className ? ' ' + className : '')}`}
    style={style}
  />
);
