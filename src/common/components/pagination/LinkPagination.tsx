import React, { FC, useMemo } from 'react';
import styled from 'styled-components';
import { cn } from '../../../util';
import { PageChangeArgs, PaginationLinkMakeModel } from '../../model';
import { calcMaxPage, createPages } from './Pagination.services';
import { PagingItemLink } from './PagingItemLink';

interface Props extends PageChangeArgs {
  /**
   * 컴포넌트에 적용될 CSS 클래스
   */
  className?: string;
  /**
   * 전체 자료 개수
   */
  totalCount: number;
  /**
   * 링크 경로를 자동으로 만들 때 쓰이는 파라미터.
   *
   * 내부 필드를 검색하여 비어 있거나 null, undefined 일 경우 무시하며 limit, skip 은 별도로 받고 있으므로 이 필드들 또한 무시 한다.
   *
   * onHref 를 쓸 경우 무시된다.
   */
  params?: any;
  /**
   * 페이징 네이게이션에서 표현될 페이지 개수
   */
  navCount?: number;
  /**
   * 중앙 정렬 여부. 기본 false.
   */
  center?: boolean;
  /**
   * 숨김 여부. 기본 false.
   */
  hide?: boolean;
  /**
   * 페이징 생성 시 원하는 링크경로를 조합 할 때 쓰인다.
   *
   * 없을 경우 기본적인 페이징 (예: 경로?skip=1&limit=10)을 자동으로 적용 시킨다.
   */
  onHref?: (args: PaginationLinkMakeModel) => string;
}

const Wrap = styled.div`
  display: inline-flex;

  &.center {
    display: block;
    text-align: center;
  }
`;

/**
 * Next Router 를 이용하는 페이징 컴포넌트
 * @param param0
 */
export const LinkPagination: FC<Props> = ({
  skip,
  limit,
  totalCount,
  navCount,
  center,
  hide,
  className,
  params,
  onHref,
}) => {
  if (hide) {
    return null;
  }

  const maxPage = useMemo(() => calcMaxPage(totalCount, limit), [
    totalCount,
    limit,
  ]);
  const page = useMemo(() => Math.floor(skip / limit) + 1, [skip, limit]);
  const pages = useMemo(
    () => createPages({ page, navCount: navCount || 5, maxPage }),
    [page, navCount, maxPage],
  );

  const iPrevPage = page - 1 < 1 ? 1 : page - 1;
  const iNextPage = page + 1 >= maxPage ? maxPage : page + 1;
  const iPrevSkip = (iPrevPage - 1) * limit;
  const iNextSkip = (iNextPage - 1) * limit;

  return (
    <Wrap className={cn(className, { center })}>
      <PagingItemLink
        onHref={onHref}
        limit={limit}
        page={iPrevPage}
        skip={iPrevSkip}
        active={page === 1}
        params={params}
        icon="caret-prev-sm"
        prev
      />
      {pages.map(num => (
        <PagingItemLink
          key={num}
          active={page === num}
          skip={(num - 1) * limit}
          page={num}
          limit={limit}
          params={params}
          onHref={onHref}
        >
          {num}
        </PagingItemLink>
      ))}
      <PagingItemLink
        onHref={onHref}
        limit={limit}
        page={iNextPage}
        skip={iNextSkip}
        params={params}
        active={page === maxPage}
        icon="caret-next-sm"
        next
      />
    </Wrap>
  );
};
