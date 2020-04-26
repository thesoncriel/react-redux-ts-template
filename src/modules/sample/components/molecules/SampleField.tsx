import React, { FC } from 'react';
import styled from 'styled-components';
import { SampleInput, SampleInputProps } from '../atoms';

interface SampleFieldProps extends SampleInputProps {
  /**
   * 하단에 출력할 메시지
   */
  message?: string;
}

const Div = styled.div`

`;

/**
 * 컴포넌트: 샘플 필드
 */
export const SampleField: FC<SampleFieldProps> = props => {
  return (
    <Div>
      <SampleInput {...props} />
    </Div>
  );
};
