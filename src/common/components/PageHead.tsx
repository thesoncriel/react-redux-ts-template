import { FC, useEffect, useState } from 'react';

/**
 * 설정 가능한 페이지 내 head 요소 모델.
 */
export interface PageHeadProps {
  /**
   * 페이지의 제목을 설정한다.
   *
   * 설정 시 웹브라우저 탭에 제목이 출력된다.
   */
  title?: string;
}

/**
 * 페이지 내 head 요소를 제어한다.
 * @param title 페이지 제목
 * @constructor
 */
export const PageHead: FC<PageHeadProps> = ({ title: propTitle }) => {
  const [
    title
  ] = useState(() => document.title);

  document.title = propTitle ? propTitle : title;

  useEffect(() => () => {
    document.title = title;
  }, [title]);

  return null;
};
