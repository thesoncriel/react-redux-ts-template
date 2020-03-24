/* eslint-disable react/display-name */
import React, {
  ComponentType,
  FC,
  memo,
  MouseEventHandler,
  useRef,
} from 'react';
import { throttle } from '../../util';

type SimpleEventHandler = () => void;

/**
 * 버튼 컴포넌트의 클릭 이벤트에 대하여 debounce 를 적용할 때 쓰인다.
 * @param ButtonComp 대상 컴포넌트.
 * @param time debounce 할 시간 (ms). 기본 250
 */
export function hocThrottledClick<
  P extends { onClick?: MouseEventHandler<any> | SimpleEventHandler }
>(ButtonComp: ComponentType<P>, time = 250): FC<P> {
  return memo(props => {
    const handleClick = useRef(
      throttle(args => {
        if (props.onClick) {
          props.onClick(args);
        }
      }, time),
    );

    return (
      <ButtonComp {...props} onClick={handleClick.current}>
        {props.children}
      </ButtonComp>
    );
  });
}
