import React from 'react';
import styled from 'styled-components';
import { mxBreakpoint } from '../../../styles/mixins';
import { cn } from '../../../util';
import { HospitalManagerLinkButton } from '../buttons/HospitalManagerLinkButton';
import { HeaderAppDownloadNavigation } from './HeaderAppDownloadNavigation';

interface Props {
  mobile?: boolean;
  className?: string;
  showAppDownloadMenu?: boolean;
  toggleDropDown?: (value?: boolean) => void;
}

const urlAppDownload = 'https://app.adjust.com/fb4t481?deeplink=sayup%3A%2F%';
const URL_HOSPITAL_ADMIN_APPLY =
  'https://hospital.ddocdoc.com/apply?utm_source=ddocdocweb&utm_medium=banner';

const Wrap = styled.div`
  position: relative;
  display: inline-block;

  &.mobile {
    display: block;
    padding: 32px 0;
    margin-top: 25px;
    text-align: center;

    a.fat {
      width: 156px;
      margin: 0;

      &:first-child {
        margin-right: 15px;
      }
    }

    ${mxBreakpoint.mobileSmall} {
      padding: 16px;
      margin-top: 0;
      a.fat {
        width: 100%;

        &:first-child {
          margin-bottom: 8px;
        }
      }
    }
  }
`;

export const ButtonNavigation: React.FC<Props> = ({
  mobile,
  className,
  showAppDownloadMenu,
  toggleDropDown,
}) => (
  <Wrap className={cn({ mobile }, className)}>
    <HospitalManagerLinkButton fat={mobile} href={URL_HOSPITAL_ADMIN_APPLY}>
      <b>똑닥</b> 병원 매니저
    </HospitalManagerLinkButton>
    <HeaderAppDownloadNavigation
      toggleDropDown={toggleDropDown}
      isButton={!mobile}
      fat={mobile}
      isShowDropdown={showAppDownloadMenu}
      href={urlAppDownload}
    >
      <b>앱</b> 다운로드
    </HeaderAppDownloadNavigation>
  </Wrap>
);
