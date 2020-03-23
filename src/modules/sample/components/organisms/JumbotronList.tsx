import React, { FC } from 'react';
import { Jumbotron } from '../molecules';
import { serializeParams } from '../../../../util';
import { ColumnLayout } from '../atoms';
import { SampleQueryParams } from '../../models';

/**
 * 점보트론 목록을 출력하는 컴포넌트의 프로퍼티.
 */
export interface JumbotronListProps {
  /**
   * 출력될 데이터 목록
   */
  items: SampleQueryParams[];
}

/**
 * 점보트론 컴포넌트를 열맞춰 출력함.
 * @param props
 */
export const JumbotronList: FC<JumbotronListProps> = props => (
  <ColumnLayout>
    {props.items.map((datum, idx) =>
      <Jumbotron key={idx} name={datum.name} link={serializeParams(datum, true)}>{datum.name}</Jumbotron>
    )}
  </ColumnLayout>
);