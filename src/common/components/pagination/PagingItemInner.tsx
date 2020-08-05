import React, { ComponentType } from 'react';

interface Props {
  /**
   * 아이콘 컴포넌트
   */
  icon?: ComponentType;
  /**
   * '이전' 형태로 렌더링
   */
  prev?: boolean;
  /**
   * '다음' 형태로 렌더링
   */
  next?: boolean;
}

/**
 * 페이징 아이템내에 들어가는 공통 요소를 렌더링 한다.
 * @param param0
 */
export const PagingItemInner: React.FC<Props> = ({
  icon: Icon,
  prev,
  next,
  children,
}) => (
  <>
    {Icon ? <Icon /> : children}
    {(prev || next) && (
      <span className="sr-only">{prev ? '이전' : '다음'}</span>
    )}
  </>
);
