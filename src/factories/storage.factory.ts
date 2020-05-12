/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable max-classes-per-file */

import { HashMap } from '../common/model';
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
export interface ISimpleStorage<T extends string | object> {
  /**
   * 현재 스토리지가 사용하고 있는 키값.
   * get, set, remove 이용 시 지정된 키값을 자동으로 사용 한다.
   */
  readonly key: string;
  /**
   * 스토리지에서 값을 가져온다.
   */
  get(): T;
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
  implements ISimpleStorage<T> {
  constructor(readonly key: string) {
  }

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
  implements ISimpleStorage<T> {
  constructor(readonly key: string, private storage: Storage) { }

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

/**
 * 캐시용 스토리지를 만드는 빌더.
 * Memory, Local, Session 3가지로 만들 수 있다.
 * 사용 시 type, key 가 필요하며
 * 기본값은 각각 'sesson', '_' 이다.
 */
export const storageFactory = <T extends string | object>(
  type: string = StorageType.SESSION,
  key = '_',
) => {
  let ret: ISimpleStorage<T>;

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
