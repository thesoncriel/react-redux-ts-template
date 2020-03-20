import React, { FC } from 'react';
import styled from 'styled-components';
import { SampleList, SampleListProps } from '../molecules';

interface Props extends SampleListProps {
  /**
   * 패널 제목.
   */
  title: string;
}

const StyledSampleStatusPanel = styled.div`
  padding: 10px;
  background: #f0f0f0;
`;

const Heading = styled.h4`
  text-align: center;
  background: #ccc;
`;

/**
 * 샘플 데이터 상태를 출력하는 패널.
 * @param props
 */
export const SampleStatusPanel: FC<Props> = (
  {
    title,
    items,
  }
) => (
  <StyledSampleStatusPanel>
    <Heading>{title}</Heading>
    <SampleList items={items} />
  </StyledSampleStatusPanel>
);