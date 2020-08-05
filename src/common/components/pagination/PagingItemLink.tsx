import React, { ComponentType } from 'react';
import styled, { css } from 'styled-components';
import { cn, serializeParams } from '../../../util';
import { PaginationLinkMakeModel } from '../../models';
import { PagingItemInner } from './PagingItemInner';
import { Link } from 'react-router-dom';

export const COLOR_BLACK = '#2c3744';
export const COLOR_WHITE_OVER = '#f5f7f9';

interface Props {
  /**
   * 컴포넌트에 적용 할 CSS 클래스명
   */
  className?: string;
  /**
   * 페이징 컴포넌트에 표현될 아이콘
   */
  icon?: ComponentType;
  /**
   * 활성화 여부
   */
  active?: boolean;
  /**
   * 이동될 페이지 번호
   */
  page: number;
  /**
   * 페이징 시 최대로 가져올 자료 개수
   */
  limit: number;
  /**
   * 페이징 시 건너뛸 자료 개수
   */
  skip: number;
  /**
   * '이전' 텍스트를 넣는다. UI상엔 보이지 않는다.
   */
  prev?: boolean;
  /**
   * '다음' 텍스트를 넣는다. UI상엔 보이지 않는다.
   */
  next?: boolean;
  /**
   * 줄임표(...) 표현 여부
   */
  ellipsis?: boolean;
  /**
   * 링크 경로를 자동으로 만들 때 쓰이는 파라미터.
   *
   * 내부 필드를 검색하여 비어 있거나 null, undefined 일 경우 무시하며 limit, skip 은 별도로 받고 있으므로 이 필드들 또한 무시 한다.
   *
   * 만약 onHref 를 쓸 경우 무시된다.
   */
  params?: Record<string, any>;
  /**
   * 페이징 생성 시 원하는 링크경로를 조합 할 때 쓰인다.
   *
   * 없을 경우 기본적인 페이징 (예: 경로?skip=1&limit=10)을 자동으로 적용 시킨다.
   */
  onHref?: (args: PaginationLinkMakeModel) => string;
}

const anchorStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const Span = styled.span`
  ${anchorStyle}
`;

const Anchor = styled(Link)`
  ${anchorStyle}
`;

export const PagingItemLink: React.FC<Props> = props => {
  const {
    active,
    className,
    children,
    onHref,
    page,
    skip,
    limit,
    prev,
    next,
    ellipsis,
    params,
  } = props;

  const prevNext = prev || next;

  if (ellipsis) {
    return (
      <Span className={cn('link ellipsis', className)}>
        <PagingItemInner {...props}>{'…'}</PagingItemInner>
      </Span>
    );
  }

  return active ? (
    <Span className={cn('link', className, { active: !prevNext, prev, next })}>
      <PagingItemInner {...props}>{children}</PagingItemInner>
    </Span>
  ) : (
    <Anchor
      to={
        onHref
          ? onHref({ page, skip, limit })
          : serializeParams({ ...params, skip, limit }, true)
      }
      className={cn('link', className, { prev, next })}
    >
      <PagingItemInner {...props}>{children}</PagingItemInner>
    </Anchor>
  );
};
