import React from 'react';
import styled from 'styled-components';
import { cn } from '../../../util';

interface Props {
  vertical?: boolean;
  className?: string;
}

const Wrap = styled.nav`
  display: inline-block;
  font-size: 14px;
  letter-spacing: 2px;

  li {
    display: inline-block;
  }
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 60px;
    transition: 0.2s color;

    &:hover {
      color: #888;
    }
  }

  &.vertical {
    display: block;
    width: 100%;

    li {
      display: block;
    }
    a {
      width: 100%;
      height: auto;
      padding: 15px 0;
    }
  }
`;

export const TopNavigation: React.FC<Props> = ({ vertical, className }) => (
  <Wrap className={cn({ vertical }, className)}>
    <ul>
      <li>
        <a href="https://www.bbros.co.kr">회사소개</a>
      </li>
      {/* <li><a href="https://event.ddocdoc.com">이벤트</a></li> */}
      <li>
        <a>건강정보</a>
      </li>
      <li>
        <a href="https://www.bbros.co.kr/notice">공지사항</a>
      </li>
    </ul>
  </Wrap>
);
