import React, { FC, useEffect } from 'react';
import { LayoutContainer } from '../../_shared';
import { sampleCtx as ctx } from '../contexts';
import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  border: 1px solid #000;
`;

const SampleInputComponent: FC = () => {
  const inter = ctx.useInteractor();
  const { volume, items, loading } = ctx.useCtxSelectorAll();

  const handleChange = (e: any) => {
    inter.changeValume(e.target.value);
  };
  const handleClick = () => {
    void inter.loadList();
  };

  useEffect(() => {
    inter.changeValume('과연 바뀔까?!');
    console.log('did mount!');

    return () => {
      console.log('will unmount!');
    };
  }, [inter]);

  return (
    <LayoutContainer>
      <Input value={volume} onChange={handleChange} />
      <div>volume: {volume}</div>
      {loading ? (
        '로딩중...'
      ) : (
        <button type="button" onClick={handleClick}>
          자동 추가
        </button>
      )}

      <ul>
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </LayoutContainer>
  );
};

/**
 * 컨테이너: 샘플 입력부
 */
export const SampleInputContainer = ctx.withCtx(SampleInputComponent);
