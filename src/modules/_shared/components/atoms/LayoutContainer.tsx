import React from 'react';
import styled from 'styled-components';
import { ClassNameProps } from '../../../../common/model';
import { cssCenterBlock } from '../../../../common/styles';

interface Props extends ClassNameProps {
  /**
   * position-relative 적용 여부. 기본 false.
   */
  relative?: boolean;
}

/**
 * 가운데 정렬을 하는 레이아웃 컨네이너.
 */
export const Div = styled.div<Props>`
  ${cssCenterBlock};
  position: ${props => props.relative ? 'relative' : 'static'};
`;

/**
 * 페이지 내 컨텐츠 표현 시 좌우 여백을 동일하게 잡아주는 컴포넌트.
 *
 * 반응형으로 동작되며 화면 크기에 따라 알맞은 여백을 자동으로 적용한다.
 * @param param0
 */
export const LayoutContainer: React.FC<Props> = props => (
  <Div {...props} />
);
