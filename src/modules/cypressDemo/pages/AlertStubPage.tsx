import React, { FC } from 'react';
import styled from 'styled-components';
import { useQueryParams } from '../../../common/hooks';
import { PageContainer } from '../../_shared';

interface AlertStubPageQueries {
  id?: string;
}

const Wrap = styled.section`
  max-width: 1024px;
  margin: 0 auto;
`;

/**
 * 페이지: 설명
 */
export const AlertStubPage: FC = () => {
  const queries = useQueryParams<AlertStubPageQueries>();

  const handleClick = () => {
    alert('장바구니에 담겼습니다.');
  };

  return (
    <Wrap>
      <button id="btn_cart" onClick={handleClick}>
        장바구니 담기
      </button>
    </Wrap>
  );
};
