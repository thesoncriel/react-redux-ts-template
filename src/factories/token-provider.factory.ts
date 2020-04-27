/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable no-underscore-dangle */
import { ISimpleStorage, storageFactory } from './storage.factory';

/**
 * 토큰을 제공한다.
 */
export interface ITokenProvider {
  /**
   * 토큰 값을 가져 온다.
   */
  get(): string;
  /**
   * 토큰 값을 설정 한다.
   * @param token 토큰값
   */
  set(token: string): void;
  /**
   * 현재 토큰값을 지운다.
   */
  clear(): void;
}

/**
 * 토큰을 로컬 스토리지에 보관하며 제공한다.
 */
class LocalStorageTokenProvider implements ITokenProvider {
  private _token = '';

  constructor(private storage: ISimpleStorage<string>) {
    this._token = this.storage.get();
  }

  get() {
    return this._token;
  }

  set(token: string): void {
    if (this._token !== token) {
      this._token = token;
      this.storage.set(token);
    }
  }

  clear(): void {
    this._token = '';
    this.storage.remove();
  }
}

export function tokenProviderFactory(key: string): ITokenProvider {
  return new LocalStorageTokenProvider(storageFactory<string>('local', key));
}
