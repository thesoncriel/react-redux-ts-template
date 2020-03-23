import React, { FC } from 'react';
import Slider from 'react-slick';
import { Jumbotron } from '../molecules';
import { serializeParams } from '../../../../util';
import { JumbotronListProps } from './JumbotronList';

/**
 * 모바일 모드일 때 슬라이더로 보여주는 점보트론 컴포넌트.
 * @param props
 */
export const JumbotronSlider: FC<JumbotronListProps> = props => (
  <Slider>
    {props.items.map((datum, idx) =>
      <Jumbotron key={idx} name={datum.name} link={serializeParams(datum, true)}>{datum.name}</Jumbotron>
    )}
  </Slider>
);