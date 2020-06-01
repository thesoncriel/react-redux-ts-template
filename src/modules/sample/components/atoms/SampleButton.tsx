import React, { FC } from 'react';
import styled from 'styled-components';
import { ButtonComponentProps } from '../../../../common/models';

const StyledSampleButton = styled.button`
  padding: 1em;
  border: 1px solid ${props => props.theme.color.primaryDark};
  border-radius: 3px;
  transition: 0.1s background-color linear;
  background-color: ${props => props.theme.color.primary};
  color: #fff;

  &:hover {
    background-color: ${props => props.theme.color.primaryLight};
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
