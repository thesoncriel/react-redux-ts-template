import React, { FC } from 'react';
import styled from 'styled-components';

interface Props {

}

const StyledSampleButton = styled.button`

`;

/**
 * describe
 * @param props
 */
export const SampleButton: FC<Props> = props => (
  <StyledSampleButton>
    {props.children}
  </StyledSampleButton>
);