import React, { FC } from 'react';
import styled from 'styled-components';
import { SampleItemModel } from '../../models';

interface Props {
  /**
   * 출력할 단일 아이템 자료.
   */
  item: SampleItemModel;
}

const StyledSampleItem = styled.li`
  padding: 0.5em;
  border-bottom: 1px solid #888;
`;

/**
 * 샘플 아이템 내용을 출력한다.
 * @param props
 */
export const SampleItem: FC<Props> = (
  {
    item
  }) => (
  <StyledSampleItem>
    {item.name} : {item.age}
  </StyledSampleItem>
);