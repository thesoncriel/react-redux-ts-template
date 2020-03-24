import { ComponentType } from 'react';
import styled, {
  FlattenSimpleInterpolation,
  StyledComponent,
} from 'styled-components';

/**
 * 특정 컴포넌트에 스타일을 씌울 때 쓰인다.
 * @param comp 스타일을 적용 할 컴포넌트.
 * @param cssStyles 적용 될 스타일. styled-components 의 css 를 이용한다.
 */
export const hocStyled = <P>(
  comp: ComponentType<P>,
  cssStyles: FlattenSimpleInterpolation,
) => {
  const wrapComp: StyledComponent<ComponentType<P>, any, any, never> = styled(
    comp,
  )`
    ${cssStyles}
  `;

  return wrapComp;
};
