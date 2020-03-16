import React from 'react';
import styled from 'styled-components';
import { SampleResItem } from '../../models/sample.model';

interface Props {
  items: SampleResItem[];
  pending: boolean;
}

const Wrap = styled.ul`
  margin: 1em 0;
`;

export const AsyncSampleList: React.FC<Props> = ({ items, pending }) => {
  return (
    <Wrap>
      {items.map((item) => (
        <li key={item.name}>{item.name}</li>
      ))}
      {pending && '로딩중...'}
    </Wrap>
  );
};
