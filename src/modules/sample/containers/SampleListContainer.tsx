import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selSampleItems } from '../selectors';
import { SampleList } from '../components/molecules';
import { effSampleListLoad } from '../effects/sample.effect';
import { useAsyncDispatch } from '../../../util';
import { SampleListLoadParams } from '../models';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
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
  const dispatch = useAsyncDispatch();
  const items = useSelector(selSampleItems);

  useEffect(() => dispatch(effSampleListLoad({ ...queries })), [dispatch, queries]);

  return (
    <SampleList items={items} />
  );
};