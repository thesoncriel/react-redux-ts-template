import React, { FC } from 'react';
import { LayoutContainer } from '../../_shared';
import { sampleCtx as ctx } from '../contexts';
import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  border: 1px solid #000;
`;

const SampleInputComponent: FC = () => {
  const inter = ctx.useInteractor();
  const { volume } = ctx.useCtxSelectorAll();

  const handleChange = (e: any) => {
    inter.changeValume(e.target.value);
  };

  return (
    <LayoutContainer>
      <Input value={volume} onChange={handleChange} />
      <div>volume: {volume}</div>
    </LayoutContainer>
  );
};

/**
 * 컨테이너: 샘플 입력부
 */
export const SampleInputContainer = ctx.withCtx(SampleInputComponent);
