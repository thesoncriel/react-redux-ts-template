import React, { FC } from 'react';
import styled from 'styled-components';

interface Props {
  /**
   * 나눌 단 개수. 기본 3.
   */
  columns?: number;
}

const StyledColumnLayout = styled.div<Props>`
  display: flex;
  width: 100%;
  
  & > * {
    flex-basis: ${(props: Props) => (100 / (props.columns || 3)) * 100}%;
  }
`;

/**
 * 단을 균등하게 나눠주는 레이아웃 컴포넌트.
 * @param props
 */
export const ColumnLayout: FC<Props> = props => (
  <StyledColumnLayout columns={props.columns}>
    {props.children}
  </StyledColumnLayout>
);