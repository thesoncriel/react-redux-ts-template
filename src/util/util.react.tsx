/* eslint-disable react/display-name */
import React, {
  ComponentType,
  FC,
  MouseEventHandler,
  ReactNode,
  useRef,
} from 'react';
import { CSSProperties } from 'styled-components';
import { throttle } from './util.etc';

type SimpleEventHandler = () => void;

/**
 * 버튼 컴포넌트의 클릭 이벤트에 대하여 debounce 를 적용할 때 쓰인다.
 * @param ButtonComp 대상 컴포넌트.
 * @param time debounce 할 시간 (ms). 기본 250
 */
export function hocThrottledClick<
  P extends { onClick?: MouseEventHandler<any> | SimpleEventHandler }
>(ButtonComp: ComponentType<P>, time = 350): FC<P> {
  return (props) => {
    const handleClick = useRef(
      throttle((args) => {
        if (props.onClick) {
          props.onClick(args);
        }
      }, time),
    );

    return (
      <ButtonComp {...props} onClick={handleClick}>
        {props.children}
      </ButtonComp>
    );
  };
}

/**
 * 테이블 셀에서 노드 내부에 값이 없을 경우 기본값을 대신 출력하는 기능을 추가 한다.
 * @param CellComp 기본값이 적용될 컴포넌트
 * @param def 출력될 기본값. 미 지정시 기본값은 바 (-)
 */
export function hocDefaultChildren<P>(
  CellComp: ComponentType<P>,
  def: string | ReactNode = '-',
) {
  return (props: P & Readonly<{ children?: ReactNode }>) => {
    return <CellComp {...props}>{props.children || def}</CellComp>;
  };
}

/**
 * 테이블 셀을 가운데 정렬을 기본으로 가지도록 만든다.
 * @param CellComp 컴포넌트
 * @param def
 */
export function hocAlignCell<
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
