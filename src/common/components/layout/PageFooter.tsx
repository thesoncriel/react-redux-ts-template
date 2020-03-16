import React from 'react';
import styled from 'styled-components';
import { Icon } from '../Icon';
import { mxBreakpoint } from '../../../styles/mixins';
import { COLOR_BLACK } from '../../../styles/variables';
import { CompanyInfo } from './CompanyInfo';
import { LayoutContainer } from './LayoutContainer';

const Footer = styled.footer`
  font-size: 14px;
  letter-spacing: 1px;
  color: #fff;
  background: ${COLOR_BLACK};

  ${mxBreakpoint.mobile} {
    font-size: 12px;
  }

  .container {
    padding-top: 30px;
    padding-bottom: 40px;
  }

  .link-group {
    display: flex;
    margin-bottom: 40px;

    .icon {
      flex-shrink: 1;
    }
    .right {
      flex-grow: 1;
      text-align: right;

      a {
        display: inline-flex;
        align-items: center;
        height: 32px;
        margin-left: 16px;
        font-size: 16px;

        ${mxBreakpoint.mobile} {
          font-size: 14px;
        }
        ${mxBreakpoint.mobileSmall} {
          font-size: 12px;
        }
      }
    }
  }

  h6 {
    margin-bottom: 8px;
    font-size: 20px;
    line-height: 1.8;

    ${mxBreakpoint.mobile} {
      font-size: 14px;
    }
  }

  small {
    line-height: 1.71;

    ${mxBreakpoint.mobileSmall} {
      font-size: 11px;
    }
  }
`;

export const PageFooter: React.FC<{}> = () => (
  <Footer>
    <LayoutContainer innerPadding className="container">
      <div className="link-group">
        <Icon>bi-alt</Icon>
        <div className="right">
          <a href="/termsofservice">이용약관</a>
          <a href="/privacypolicy">개인정보 취급방침</a>
        </div>
      </div>
      <h6>주식회사 비브로스</h6>
      <CompanyInfo />
      <small>
        Copyright © B-bros Corp. <span>All rights reserved.</span>
      </small>
    </LayoutContainer>
  </Footer>
);
