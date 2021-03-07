import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { PageContainer } from '../../_shared';

interface ConfirmStubPageQueries {
  id?: string;
}

const Section = styled.section`
  max-width: 1024px;
  margin: 0 auto;
`;

const Button = styled.button`
  padding: 1em;
  border: 1px solid #888;
  border-radius: 5px;
`;

/**
 * 페이지: 설명
 */
export const ConfirmStubPage: FC = () => {
  const [followed, setFollowed] = useState(false);

  const handleClick = () => {
    if (window.confirm('are you sure?')) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  };

  return (
    <Section>
      <h1>cypress - confirm stub demo</h1>
      <Button id="btn" type="button" onClick={handleClick}>
        Follow!
      </Button>
      <div>followed: {followed ? 'yes!' : 'nope...'}</div>
    </Section>
  );
};
