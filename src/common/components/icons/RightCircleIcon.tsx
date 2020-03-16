import React from 'react';
import styled from 'styled-components';
import { COLOR_BLACK } from '../../../styles/variables';
import { cn } from '../../../util';
import { Icon } from '../Icon';

interface Props {
  /**
   * 흰색 여부. 기본 false.
   */
  white?: boolean;
  /**
   * 스타일 클래스
   */
  className?: string;
}

const Wrap = styled.span`
  display: inline-block;
  width: 24px;
  height: 24px;
  padding-top: 8px;
  padding-left: 8px;
  border-radius: 13px;
  background: ${COLOR_BLACK};

  & > i {
    display: block;
  }

  &.white {
    background: #fff;
  }
`;

const COMMON_NAME = 'caret-right-sm-';

/**
 * 홈페이지 상단의 외부 링크에 쓰이는 동그란 아이콘.
 * @param param0
 */
export const RightCircleIcon: React.FC<Props> = ({ white, className }) => (
  <Wrap className={cn({ white }, className)}>
    <Icon>{COMMON_NAME + (white ? 'black' : 'white')}</Icon>
  </Wrap>
);
