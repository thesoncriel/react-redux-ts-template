import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selSampleItems } from '../selectors';
import { SampleList } from '../components/molecules';
import { effSampleListLoad } from '../effects/sample.effect';
import { SampleListLoadParams } from '../models';
import { useADispatch } from '../../../common/hooks';

interface Props {
  queries?: SampleListLoadParams;
}

/**
 * 컨테이너: 샘플 목록.
 * @param props
 */
export const SampleListContainer: FC<Props> = (
  {
    queries
  }
) => {
  const dispatch = useADispatch();
  const items = useSelector(selSampleItems);

  useEffect(() => dispatch(effSampleListLoad({ ...queries })), [dispatch, queries]);

  return (
    <SampleList items={items} />
  );
};