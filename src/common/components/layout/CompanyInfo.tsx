import React from 'react';
import styled from 'styled-components';
import { COLOR_TEXT_MUTE } from '../../../styles/variables';
import { mxBreakpoint } from '../../../styles/mixins';

const Wrap = styled.dl`
  margin-bottom: 32px;
  font-size: 14px;
  letter-spacing: 1px;
  line-height: 1.71;
  color: ${COLOR_TEXT_MUTE};

  ${mxBreakpoint.mobile} {
    font-size: 12px;
    line-height: 2;
  }

  address {
    display: inline;
  }

  dt,
  dd {
    display: inline;
    margin: 0;
  }
  dt {
    &::after {
      content: ': ';
    }
    &.tablet-break {
      &::before {
        ${mxBreakpoint.tablet} {
          content: ' ';
          display: block;
        }
      }
    }
    &.mobile-break {
      &::before {
        ${mxBreakpoint.mobile} {
          content: ' ';
          display: block;
        }
      }
    }
    &.mobile-xs-break {
      &::before {
        ${mxBreakpoint.mobileSmall} {
          content: ' ';
          display: block;
        }
      }
    }
  }
  dd {
    &::after {
      content: '|';
      display: inline-block;
      margin: 0 1.2em;
    }
    &:last-child {
      &::after {
        display: none;
      }
    }
  }
  a {
    transition: 0.2s color;

    &:hover {
      color: #fff;
    }
  }
`;

export const CompanyInfo: React.FC = () => (
  <Wrap>
    <dt className="d-none" hidden>
      주소
    </dt>
    <dd>
      <address>서울특별시 강남구 봉은사로22길 47(역삼동)</address>
    </dd>
    <dt className="mobile-break">대표이사</dt>
    <dd>송용범</dd>
    <dt className="mobile-xs-break">사업자번호</dt>
    <dd>114-87-13917</dd>
    <dt className="tablet-break mobile-break">대표전화</dt>
    <dd>
      <a href="tel:1899-6826">1899-6826</a>
    </dd>
    <dt className="mobile-xs-break">이메일</dt>
    <dd>
      <a href="mailto:ceosong@bbros.kr">ceosong@bbros.kr</a>
    </dd>
  </Wrap>
);
