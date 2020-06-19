/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable max-classes-per-file */

import { HashMap, ExpirableStorageModel } from '../common/models';
import {
  isServer,
  isStorageAvailable,
  marshalJson,
  unmarshalJson,
} from '../util';

enum StorageType {
  MEMORY = 'memory',
  LOCAL = 'local',
  SESSION = 'session',
}

/**
 * 간단한 스토리지를 구성할 때 쓰이는 인터페이스.
 *
 * 사용 가능한 타입은 string 이나 객체형이다.
 */
export interface SimpleStorage<T extends string | object> {
  /**
   * 현재 스토리지가 사용하고 있는 키값.
   * get, set, remove 이용 시 지정된 키값을 자동으로 사용 한다.
   */
  readonly key: string;
  /**
   * 스토리지에서 값을 가져온다.
   */
  get(): T | null;
  /**
   * 스토리지에 값을 설정한다.
   * @param {T} value
   */
  set(value: T): void;
  /**
   * 스토리지에 설정된 값을 지운다.
   */
  remove(): void;
}

const memoryCache: HashMap<any> = {};
let memoryCacheKeys: string[] = [];
const MEMORY_CACHE_MAX = 100;

class MemorySimpleStorage<T extends string | object>
  implements SimpleStorage<T> {
  constructor(readonly key: string) {}

  get(): T {
    return (memoryCache[this.key] || null) as T;
  }

  set(value: T): void {
    const key = this.key;

    if (memoryCacheKeys.length >= MEMORY_CACHE_MAX) {
      const oldKey = memoryCacheKeys.shift();

      if (oldKey) {
        delete memoryCache[oldKey];
      }
    }
    // eslint-disable-next-line no-prototype-builtins
    if (!memoryCache.hasOwnProperty(key)) {
      memoryCacheKeys.push(key);
    }
    memoryCache[this.key] = value;
  }

  remove(): void {
    delete memoryCache[this.key];

    memoryCacheKeys = memoryCacheKeys.filter(key => key !== this.key);
  }
}

class SimpleStorageAdapter<T extends string | object>
  implements SimpleStorage<T> {
  constructor(readonly key: string, private storage: Storage) {}

  get(): T {
    return unmarshalJson(this.storage.getItem(this.key)) as T;
  }

  set(value: T): void {
    this.storage.setItem(this.key, marshalJson(value));
  }

  remove(): void {
    this.storage.removeItem(this.key);
  }
}

class ExpirableStorageAdapter<T extends string | object>
  implements SimpleStorage<T> {
  constructor(
    private storage: SimpleStorage<ExpirableStorageModel<T>>,
    public expiredTime = 0,
  ) {}

  get key() {
    return this.storage.key;
  }

  get(): T | null {
    const mData = this.storage.get();

    if (!mData) {
      return null;
    }

    if (mData.expiredTime <= 0 || mData.expiredTime > Date.now()) {
      return mData.data;
    }

    this.storage.remove();

    return null;
  }

  set(value: T): void {
    this.storage.set({
      expiredTime:
        this.expiredTime > 0 ? Date.now() + this.expiredTime * 1000 : 0,
      data: value,
    });
  }

  remove(): void {
    this.storage.remove();
  }
}

/**
 * 캐시용 스토리지를 만드는 빌더.
 * Memory, Local, Session 3가지로 만들 수 있다.
 * 사용 시 type, key 가 필요하다.
 *
 * 만약 서버 환경이거나 스토리지를 이용 할 수 없을 경우, type 은 memory 로 강제된다.
 *
 * @example
 * interface SampleModel {
 *   name: string;
 *   age: number;
 * }
 * const sto = storageFactory<SampleModel>('local', 'sampleKey');
 * const data: SampleModel = {
 *   name: '포메포메',
 *   age: 3,
 * };
 *
 * sto.set(data); // 스토리지에 데이터 설정
 *
 * const result = sto.get(); // 스토리지에서 데이터 가져오기
 *
 * sto.remove(); // 스토리지에서 데이터 삭제
 *
 * @param type 스토리지 타입. session, local, memory 중 하나. 기본 session.
 * @param key 스토리지에서 쓰이는 키. 기본값은 '_' (underbar).
 * @param expiredTime 유효시간 (seconds). 시간을 주지 않거나 0보다 작다면 자료 유효시간이 없다. 기본값은 0.
 */
export const storageFactory = <T extends string | object>(
  type: string = StorageType.SESSION,
  key = '_',
  expiredTime = 0,
): SimpleStorage<T> => {
  let ret: SimpleStorage<T>;

  if (expiredTime > 0) {
    return new ExpirableStorageAdapter<T>(
      storageFactory<ExpirableStorageModel<T>>(type, key),
      expiredTime,
    );
  }

  if (isServer() || !isStorageAvailable() || type === StorageType.MEMORY) {
    ret = new MemorySimpleStorage<T>(key);
  } else {
    try {
      ret = new SimpleStorageAdapter<T>(
        key,
        type === StorageType.LOCAL ? localStorage : sessionStorage,
      );
    } catch (error) {
      ret = new MemorySimpleStorage<T>(key);
    }
  }

  return ret;
};
