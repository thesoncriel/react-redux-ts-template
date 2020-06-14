import React, { ComponentType, ReactNode, FC } from 'react';

/**
 * 특정 컴포넌트에서 노드 내부에 값이 없을 경우 기본값을 대신 출력하는 기능을 추가 한다.
 * @param TargetComp 기본값이 적용될 컴포넌트
 * @param def 출력될 기본값. 미 지정시 기본값은 바 (-)
 */
export function withDefaultChildren<P>(
  TargetComp: ComponentType<P>,
  def: string | ReactNode = '-',
) {
  const Comp: FC<P> = (props: P & Readonly<{ children?: ReactNode }>) => {
    return <TargetComp {...props}>{props.children || def}</TargetComp>;
  };
  return Comp;
}