import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { AsyncDispatch } from '../../util';
import { useLocation, useParams } from 'react-router';
import { HashMap } from '../models';

/**
 * @description
 * 훅: dispatch 를 비동기로 수행하기 위한 기능.
 *
 * createEffect 를 통해 만들어진 사이드 이펙트 처리 함수를 전달 할 때는 이 훅을 사용한다.
 *
 * (물론 동기적인 액션에 이것을 써도 상관 없다)
 *
 * 내부적으로 react-redux 내의 useDispatch 를 수행한다.
 *
 * @see useDispatch
 */
export function useADispatch() {
  return useDispatch<AsyncDispatch<AnyAction>>();
}

/**
 * @description
 * 훅: URL 주소 내 쿼리 파라미터 정보를 객체로 가져온다.
 *
 * 만약 쿼리 파라미터 정보가 없다면 빈 객체(Empty Object)를 반환한다.
 *
 * @param def (optional) 쿼리 파라미터에 제시된 def 객체 내 필드 값이 비어있다면 def 객체의 필드로 대체 한다.
 */
export function useQuery<T = any>(def?: Partial<T>): T {
  const search = useLocation().search;

  if (!search) {
    if (def) {
      return { ...def } as T;
    }
    return {} as T;
  }

  const sSearch = search.substring(1, search.length);
  const mQuery: any = sSearch.split('&').reduce((ret: any, query) => {
    const [key, val] = query.split('=');

    ret[key] = decodeURIComponent(val);

    return ret;
  }, {} as any);

  if (def) {
    return {
      ...def,
      ...mQuery,
    };
  }

  return mQuery;
}

/**
 * 훅: 웹브라우저의 URL 파라미터 및 쿼리 파라미터를 합쳐서 하나의 객체로 만들어 가져온다.
 *
 * 만약 필드 값이 비어있다면 그 필드는 제거하고 돌려준다.
 *
 * 주의1: 쿼리 및 URL 파라미터의 key name 이 중복되지 않는 조건에서 사용해야한다.
 *
 * 주위2: 파라미터 값이 비어 있다면 그에 대응되는 필드는 자동적으로 제거한다. 그러므로 기본 필드룰 주고싶다면 def 옵션을 사용하라.
 *
 * @param def (optional) 쿼리 파라미터에 제시된 def 객체 내 필드 값이 비어있다면 def 객체의 필드로 대체 한다.
 *
 * @see useParams
 * @see useQuery
 */
export function useQueryParams<T = HashMap<string>, R = T>(
  sel?: (params: T) => R,
): R {
  const paramsOri = useParams();
  const query = useQuery();

  const ret = {
    ...query,
    ...paramsOri,
  };

  if (sel) {
    return sel(ret as T);
  }

  return ret as R;
}

// export function useQuery<T = any>(): T {
//   const search = useLocation().search;
//   const [
//     queryParams,
//     setQueryParams,
//   ] = useState<T>({} as T);
//
//   useEffect(() => {
//     if (!search) {
//       setQueryParams({} as T);
//
//       return;
//     }
//
//     const sSearch = search.substring(1, search.length);
//     const mQuery = sSearch
//       .split('?')
//       .reduce((ret, query) => {
//         const [
//           key,
//           val,
//         ] = query.split('=');
//
//         ret[key] = decodeURIComponent(val);
//
//         return ret;
//       }, {} as any);
//
//     setQueryParams(mQuery);
//   }, [search]);
//
//   return queryParams;
// }
