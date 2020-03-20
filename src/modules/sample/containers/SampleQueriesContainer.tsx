import React, { FC } from 'react';
import { useAsyncDispatch } from '../../../util';
import { ColumnLayout } from '../components/atoms';
import { Jumbotron } from '../components/molecules';

/**
 * 컨테이너: describe
 * @param props
 */
export const SampleQueriesContainer: FC = props => {
  const dispatch = useAsyncDispatch();
  // const state = useSelector(selSamples);


  return (
    <ColumnLayout>
      <Jumbotron link="?name=포메라니안">포메라니안</Jumbotron>
      <Jumbotron link="?name=웰시코기">웰시코기</Jumbotron>
      <Jumbotron link="?name=너구리">너구리</Jumbotron>
    </ColumnLayout>
  );
};