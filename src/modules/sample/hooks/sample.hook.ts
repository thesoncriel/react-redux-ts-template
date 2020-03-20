import { useParams } from 'react-router';
import { cleanUpNil } from '../../../util';

/**
 * 훅: 쿼리 파라미터를 객체로 가져온다.
 *
 * 만약 필드 값이 비어있다면 그 필드는 제거하고 돌려준다.
 *
 * @see useParams
 */
export const useCleanParams = <T>() => {
  const params = useParams<T>();

  return cleanUpNil(params);
}