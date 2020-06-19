import React, { FC } from 'react';
import styled from 'styled-components';
import { ClassNameProps } from '../../../../common';

interface Props extends ClassNameProps {
  id?: string;
}

const Div = styled.div<Props>`
  margin: 10px;
`;

/**
 * 컴포넌트: 오호호
 */
export const RefWrap: FC<Props> = ({ children, className, ...props }) => {
  console.log(props);
  return <Div className={className}>{children}</Div>;
};

const StyledWrap = styled(RefWrap)`
  background: skyblue;
`;

export const ResultWrap: FC = ({ children }) => {
  return <StyledWrap>{children}</StyledWrap>;
};
