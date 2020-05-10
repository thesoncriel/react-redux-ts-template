import React, { ComponentType, memo, MouseEventHandler } from 'react';
import { useADispatch } from '../../../common/hooks';

/**
 * HOC: 샘플 클릭 트래커.
 *
 * 클릭시 별도 구현된 트래킹 로그를 남긴다.
 * @param trackingName 트래킹 명칭
 * @param TargetComp 클릭 트래킹 적용 할 컴포넌트.
 *
 * @see trackingMiddleware
 */
export function hocSampleClickTracker<P>(
  trackingName: string,
  TargetComp: ComponentType<P>,
) {
  const Comp: ComponentType<P> = props => {
    const dispatch = useADispatch();

    const handleClick: MouseEventHandler = event => {
      const { onClick } = props as any;

      dispatch({
        type: 'TRACKING',
        payload: trackingName,
      });
      if (onClick) {
        onClick(event);
      }
    };

    return <TargetComp {...props} onClick={handleClick} />;
  };

  return memo(Comp);
}
