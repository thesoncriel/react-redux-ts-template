import React, { FC } from 'react';
import { PageHead, PageHeadProps } from '../../../common/components';
import { PageFooter, PageHeader, PageMain } from '../components';

/**
 * 페이지 컨테이너의 프로퍼티를 정의 한 것.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PageContainerProps extends PageHeadProps {
}

/**
 * 컨테이너: 페이지의 전체적인 레이아웃을 잡아주는 컴포넌트.
 * @param props
 */
export const PageContainer: FC<PageContainerProps> = (props) => (
  <>
    <PageHead title={props.title} />
    <PageHeader>React Template</PageHeader>
    <PageMain>
      {props.children}
    </PageMain>
    <PageFooter />
  </>
);
