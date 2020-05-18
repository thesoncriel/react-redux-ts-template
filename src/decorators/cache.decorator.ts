import { storageFactory } from '../factories/storage.factory';
import { tap, isServer } from '../util';

/**
 * 테스트중 캐시 기능을 무력화 하고 싶을 때 true 로 바꿔서 쓸 것.
 */
const FORCE_NOT_CACHE = false;

type CacheDecorator = <T extends string | object, P = any>(
  fn: (url: string, params?: P) => Promise<T>
) => (url: string, params?: P) => Promise<T>;

function createKey<P = any>(url: string, params?: any) {
  if (params) {
    return url + '-' + JSON.stringify(params);
  }
  return url;
}

/**
 * 스토리지를 이용한 API 캐시를 적용한다.
 *
 * @param type local, session, memory 셋 중 하나. 기본 local.
 */
export function cache(type?: 'local' | 'session' | 'memory'): CacheDecorator {
  if (isServer() || FORCE_NOT_CACHE) {
    /**
     * 캐시가 적용된 함수.
     */
    return <T extends string | object, P = any>(
      fn: (url: string, params?: P) => Promise<T>
    ) => (url: string, params?: P) => fn(url, params);
  }

  /**
   * 캐시 디코레이터. API 함수를 내포하여 대신 수행한다.
   * @param fn API 함수
   */
  const cacheDecorator = <T extends string | object, P = any>(
    fn: (url: string, params?: P) => Promise<T>
  ) => {
    return (url: string, params?: P) => {
      const storage = storageFactory<T>(type, createKey<P>(url, params));
      const value = storage.get();

      if (value) {
        return Promise.resolve(value);
      }

      return fn(url, params)
        .then(tap(data => storage.set(data)));
    };
  };

  /**
   * 캐시가 적용된 함수.
   */
  return cacheDecorator;
}
