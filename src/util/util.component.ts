/* eslint-disable no-restricted-syntax, no-continue */

// export function getClassNamesByProps(props: { active?: boolean, className?: string }) {
//   const {
//     active, className
//   } = props;

//   if (active && className) {
//     return `active ${className}`;
//   }
//   if (active) {
//     return 'active';
//   }
//   if (className) {
//     return className;
//   }

//   return '';
// }

// function getFixedClassNames(cns?: string | string[]) {
//   if (cns instanceof Array) {
//     return ' ' + cns.join(' ');
//   } else if (typeof cns === 'string') {
//     return ' ' + cns;
//   }
//   return '';
// }

/**
 * 객체 내 조건에 따라 해당 키 값을 클래스명으로 만들어준다.
 * @param conditions 조건이 담긴 객체. 키가 클래스명, 값이 조건이 된다.
 * @param fixedClassNames 고정적으로 들어갈 클래스명
 */
export function getClassNamesBy(
  ...conditions: Array<
    | {
        [className: string]: boolean | undefined;
      }
    | string
    | undefined
  >
) {
  // fixedClassNames?: string | string[]
  // const arr: string[] = [];
  // const sAfterCN = getFixedClassNames(fixedClassNames);

  const arr = conditions.reduce<string[]>((acc, arg) => {
    if (typeof arg === 'string') {
      acc.push(arg);
    } else if (typeof arg === 'object') {
      Object.keys(arg).forEach((key) => {
        if (arg[key] === true) {
          acc.push(key);
        }
      });
    }
    return acc;
  }, [] as string[]);

  return arr.join(' ');

  // if (arr.length === 0) {
  //   return sAfterCN;
  // }
  // return arr.join(' ') + sAfterCN;
}
/**
 * 객체 내 조건에 따라 해당 키 값을 클래스명으로 만들어준다.
 * @param conditions 조건이 담긴 객체. 키가 클래스명, 값이 조건이 된다.
 */
export const cn = getClassNamesBy;

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
