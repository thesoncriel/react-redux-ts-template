/**
 * 객체 내 조건에 따라 해당 키 값을 클래스명으로 만들어준다.
 *
 * 익히 알려진 classnames 라이브러리를 fork 하여 TypeScript 기반으로 다시 작성 한 것이다.
 *
 * 실사용은 cn 으로 사용하길 권장한다. (짧아서 쓰기 좋다.)
 * @param conditions 조건이 담긴 값. 객체일 경우 키가 클래스명, 값이 조건이 된다.
 * @see https://github.com/JedWatson/classnames
 */
export function classnames(
  ...conditions: Array<
    | {
      [className: string]: boolean | undefined;
    }
    | string
    | undefined
  >
) {
  let arg: string | undefined | {
    [className: string]: boolean | undefined;
  };
  let keys: string[];
  let keyLen: number;
  let key: string;
  const arr: string[] = [];
  const len = conditions.length;

  for (let i = 0; i < len; i++) {
    arg = conditions[i];
    if (typeof arg === 'string') {
      arr.push(arg);
    } else if (typeof arg === 'object') {
      keys = Object.keys(arg);
      keyLen = keys.length;

      for (let j = 0; j < keyLen; j++) {
        key = keys[j];
        if (arg[key] === true) {
          arr.push(key);
        }
      }
    }
  }

  return arr.join(' ');

  // scope chain 문제로 위의 코드로 코드 변경.
  // const arr = conditions.reduce<string[]>((acc, arg) => {
  //   if (typeof arg === 'string') {
  //     acc.push(arg);
  //   } else if (typeof arg === 'object') {
  //     Object.keys(arg).forEach((key) => {
  //       if (arg[key] === true) {
  //         acc.push(key);
  //       }
  //     });
  //   }
  //   return acc;
  // }, [] as string[]);

  // return arr.join(' ');
}
/**
 * 객체 내 조건에 따라 해당 키 값을 클래스명으로 만들어준다.
 *
 * @example
 * import React, { FC } from 'react';
 * import styled from 'styled-components';
 * import { cn } '../util';
 *
 * interface Props {
 *   disabled?: boolean;
 *   active?: boolean;
 * }
 *
 * const Input = styled.input`
 *   &.disabled {
 *     color: gray;
 *   }
 *   &.active {
 *     border-color: light-blue;
 *   }
 * `;
 *
 * export const Comp: FC = ({ disabled, active }) => (
 *   <Input className={cn({ disabled, active })} />
 * );
 *
 * @param conditions 조건이 담긴 객체. 키가 클래스명, 값이 조건이 된다.
 * @alias classnames
 */
export const cn = classnames;

// function addDefProps<T>(body: T, defProps?: Partial<T>) {
//   if (defProps) {
//     return {
//       ...body,
//       ...defProps,
//     };
//   }

//   return body;
// }

/**
 * URL 뒷쪽에 ?key=val 형식으로 이뤄진 쿼리 파라미터를 key-value 형식의 객체로 내보낸다.
 *
 * Generic 으로 Type 을 선언하지 않으면 기본적으로 HashMap 으로 타입이 지정된다.
 * @param search 쿼리파라미터를 분석하고싶은 문자열
 */
// export function parseQueryParams<T = HashMap<string>>(
//   search: string,
//   defProps?: Partial<T>,
// ) {
//   const pairs = search.substring(1).split('&');
//   const obj: any = {};
//   let pair: string[];
//   let i;

//   for (i in pairs) {
//     if (pairs[i] === '') {
//       continue;
//     }

//     pair = pairs[i].split('=');
//     obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
//   }

//   return addDefProps(obj as T, defProps);
// }

// export function getQueryParams<T = HashMap<string>>(
//   props: RouteComponentProps,
// ) {
//   const pairs = props.location.search.substring(1).split('&');
//   const obj: any = {};
//   let pair: string[];
//   let i;

//   for (i in pairs) {
//     if (pairs[i] === '') {
//       continue;
//     }

//     pair = pairs[i].split('=');
//     obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
//   }

//   return obj as T;
// }
