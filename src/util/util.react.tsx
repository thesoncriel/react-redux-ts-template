/* eslint-disable react/display-name */
import React, { ComponentType, ReactNode } from 'react';
import { CSSProperties } from 'styled-components';

/**
 * 테이블 셀을 가운데 정렬을 기본으로 가지도록 만든다.
 * @param CellComp 컴포넌트
 * @param def
 */
export function withAlignCell<
  P extends { align?: 'inherit' | 'left' | 'center' | 'right' | 'justify' }
>(
  CellComp: ComponentType<P>,
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify' = 'center',
) {
  return (props: P & Readonly<{ children?: ReactNode }>) => {
    return (
      <CellComp {...props} align={props.align || align}>
        {props.children}
      </CellComp>
    );
  };
}

/**
 * 리엑트 자식 컴포넌트에 인라인 스타일을 적용한다.
 * @param children 자식 컴포넌트
 * @param styles 적용 할 스타일 객체
 */
export function applyStyles(children: any, styles: CSSProperties) {
  if (typeof children === 'string') {
    return (
      <span style={{ display: 'inline-block', ...styles }}>{children}</span>
    );
  }

  if (React.Children.count(children) > 1) {
    const childs: any[] = [];
    React.Children.forEach(children, (c, key) => {
      childs.push(
        React.cloneElement(c, {
          key,
          style: {
            ...c.props.style,
            ...styles,
          },
        }),
      );
    });
    return <div style={styles}>{childs}</div>;
  }

  return React.cloneElement(children, {
    style: {
      ...children.props.style,
      ...styles,
    },
  });
}
