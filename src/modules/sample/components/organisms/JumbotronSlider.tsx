import React, { createRef, FC } from 'react';
import Slider from 'react-slick';
import { serializeParams } from '../../../../util';
import { Jumbotron } from '../molecules';
import { JumbotronListProps } from './JumbotronList';

/**
 * 모바일 모드일 때 슬라이더로 보여주는 점보트론 컴포넌트.
 * @param props
 */
export const JumbotronSlider: FC<JumbotronListProps> = props => {
  const refSlider = createRef<Slider>();

  const handleSwipe = () => {
    if (refSlider.current) {
      (refSlider.current as any).innerSlider.clickable = true;
    }
  };

  return (
    <Slider swipeToSlide onSwipe={handleSwipe} ref={refSlider}>
      {props.items.map((datum, idx) => (
        <Jumbotron
          key={idx}
          name={datum.name}
          link={serializeParams(datum, true)}
        >
          {datum.name}
        </Jumbotron>
      ))}
      <a href="https://skbt.co.kr">마이홈!!</a>
    </Slider>
  );
};
