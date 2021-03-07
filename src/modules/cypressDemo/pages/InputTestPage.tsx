import React, { FC, useState } from 'react';
import styled from 'styled-components';

const Wrap = styled.section`
  max-width: 800px;
  margin: 0 auto;
`;

export const InputTestPage: FC = () => {
  const [value, setValue] = useState('');
  return (
    <Wrap>
      <input
        type="text"
        id="txt_test"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </Wrap>
  );
};
