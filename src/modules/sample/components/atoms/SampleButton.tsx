import React, { FC } from 'react';
import styled from 'styled-components';
import { ButtonComponentProps } from '../../../../common/model';

const StyledSampleButton = styled.button`
  padding: 1em;
  border: 1px solid #888;
  border-radius: 3px;
  transition: .1s background-color linear;
  background-color: #e0e0e0;
  
  &:hover {
    background-color: #fff;
  }
`;

/**
 * 샘플 버튼.
 * @param props
 */
export const SampleButton: FC<ButtonComponentProps> = props => (
  <StyledSampleButton {...props} type="button">
    {props.children}
  </StyledSampleButton>
);