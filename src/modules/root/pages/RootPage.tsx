import React, { FC } from 'react';
import { PageContainer } from '../../_shared';
import { Link } from 'react-router-dom';

export const RootPage: FC = () => {
  return (
    <PageContainer title="Welcome~! :)">
      <p>Welcome ~!!</p>
      <ul>
        <li>
          <Link to="/sample">샘플 페이지 바로가기</Link>
        </li>
      </ul>
    </PageContainer>
  );
};
