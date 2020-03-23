import React, { ComponentType, FC, MouseEventHandler } from 'react';
import { useADispatch } from '../../../common/hooks';

type SimpleEventHandler = () => void;

export function hocSampleClickTracker<P>(trackingName: string, TargetComp: ComponentType<P>) {
  const Comp: ComponentType<P & {onClick?: MouseEventHandler<any> | SimpleEventHandler}> = props => {
    const dispatch = useADispatch();

    const handleClick = (event: MouseEvent) => {
      const {
        onClick
      } = props as any;

      dispatch({
        type: 'TRACKING',
        payload: trackingName,
      });
      if (onClick) {
        onClick(event);
      }
    };

    return (
      <TargetComp {...props} onClick={handleClick} />
    );
  };

  return Comp;
}