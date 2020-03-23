import React, { FC } from 'react';
import styled from 'styled-components';
import { SampleItemModel } from '../../models';
import { SampleItem } from '../atoms';
import { cssDashedBorder } from '../../styles';

export interface SampleListProps {
  /**
   * 출력할 샘플 아이템 목록 자료.
   */
  items: SampleItemModel[];
}

const StyledSampleList = styled.div`
  padding: 10px;
  ${cssDashedBorder}
`;

/**
 * 샘플 목록을 출력한다.
 * @param props
 */
export const SampleList: FC<SampleListProps> = (
  {items}
) => (
  <StyledSampleList>
    {items.map((item, idx) => <SampleItem key={idx} item={item} />)}
    {items.length === 0 && '내용 없음'}
  </StyledSampleList>
);