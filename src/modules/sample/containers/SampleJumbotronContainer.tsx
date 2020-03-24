import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { selSampleLinkList } from '../selectors';
import { AdaptiveJumbotronList } from '../components';

/**
 * 컨테이너: describe
 * @param props
 */
export const SampleJumbotronContainer: FC = () => {
  const linkList = useSelector(selSampleLinkList);

  return <AdaptiveJumbotronList items={linkList} />;
};
