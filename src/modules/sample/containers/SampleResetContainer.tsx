import React, { FC } from 'react';
import { hocSampleClickTracker } from '../hoc';
import { SampleButton } from '../components';
import { useHistory } from 'react-router';
import { hocThrottledClick } from '../../../common/hoc';

const TrackedButton = hocThrottledClick(
  hocSampleClickTracker('resetButton', SampleButton),
);

/**
 * 컨테이너: 샘플 목록을 리셋시키는 기능을 가진 컨테이너.
 * @param props
 */
export const SampleResetContainer: FC = () => {
  const history = useHistory();

  const handleClick = () => history.push('/sample');

  return <TrackedButton onClick={handleClick}>되돌리기</TrackedButton>;
};
