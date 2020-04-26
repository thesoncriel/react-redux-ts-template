import React, { FC } from 'react';
import { PageContainer, LayoutContainer } from '../../_shared';
import { Link } from 'react-router-dom';

export const RootPage: FC = () => {
  return (
    <PageContainer title="Welcome~! :)">
      <LayoutContainer>
        <h2>Welcome ~!!</h2>
        <ul>
          <li>
            <Link to="/sample">샘플 페이지 바로가기</Link>
          </li>
          <li>
            <Link to="/sample/input">샘플 입력 바로가기</Link>
          </li>
        </ul>
      </LayoutContainer>
    </PageContainer>
  );
};
