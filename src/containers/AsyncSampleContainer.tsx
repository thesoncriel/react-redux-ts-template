import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AsyncSampleList } from '../common/components/AsyncSampleList';
import { actSampleLoad } from '../stores/sample/sample.actions';
import { AppState } from '../stores';

export const AsyncSampleContainer: React.FC = () => {
  const items = useSelector(({ sample }: AppState) => sample.items);
  const pending = useSelector(({ sample }: AppState) => sample.pending);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actSampleLoad());
  }, []);

  return <AsyncSampleList items={items} pending={pending} />;
};

export default AsyncSampleContainer;
