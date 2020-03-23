import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { AsyncDispatch, cleanUpNil } from '../../util';
import { useLocation, useParams } from 'react-router';

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
 * 훅: 웹브라우저의 URL 파라미터를 객체로 가져온다.
 *
 * 만약 필드 값이 비어있다면 그 필드는 제거하고 돌려준다.
 *
 * @see useParams
 */
export const useCleanParams = <T>() => {
  const params = useParams<T>();

  return cleanUpNil(params);
}

/**
 * @description
 * 훅: URL 주소 내 쿼리 파라미터 정보를 객체로 가져온다.
 *
 * 만약 쿼리 파라미터 정보가 없다면 빈 객체(Empty Object)를 반환한다.
 */
export function useQuery<T = any>(): T {
  const search = useLocation().search;

  if (!search) {
    return {} as T;
  }

  const sSearch = search.substring(1, search.length);
  const mQuery: any = sSearch
    .split('&')
    .reduce((ret: any, query) => {
      const [
        key,
        val,
      ] = query.split('=');

      ret[key] = decodeURIComponent(val);

      return ret;
    }, {} as any);

  return mQuery;
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
