/* eslint-disable no-param-reassign */
import appConfig from '../common/app.config';
import { HashMap } from '../common/model';
import { isServer } from '../util';
import { ITokenProvider } from './token-provider.factory';

/**
 * 헤더 파이프.
 * 아래와 같은 데이터가 추가 된다.
 * Content-Type = 'application/x-www-form-urlencoded'
 * @param headerData 데이터를 추가 할 헤더
 */
export const pipeFormPostHeader = (headerData: HashMap<string>) => {
  headerData['Content-Type'] = 'application/x-www-form-urlencoded';

  return headerData;
};
/**
 * 헤더 파이프.
 * 아래와 같은 데이터가 추가 된다.
 * Content-Type = 'multipart/form-data'
 * @param headerData 데이터를 추가 할 헤더
 */
export const pipeFormMultipartHeader = (headerData: HashMap<string>) => {
  headerData['Content-Type'] = 'multipart/form-data';

  return headerData;
};
/**
 * 헤더 파이프.
 * 아래와 같은 데이터가 추가 된다.
 * Content-Type = 'application/json; charset=utf-8'
 * @param headerData 데이터를 추가 할 헤더
 */
export const pipeJsonHeader = (headerData: HashMap<string>) => {
  headerData['Content-Type'] = 'application/json; charset=utf-8';

  return headerData;
};

/**
 * 헤더 파이프.
 * 앱버전과 플랫폼 데이터가 추가 된다.
 * @param headerData 데이터를 추가 할 헤더
 */
export const pipeAppHeader = (headerData: HashMap<string>) => {
  headerData['dd-app-version'] = appConfig.version;
  headerData['dd-platform'] = 'ddocdoc_web';

  return headerData;
};
/**
 * 헤더 파이프.
 * Bearer 토큰이 필요할 때 사용된다.
 * 전달된 토큰 값이 유효하지 않다면 키값을 생성하지 않는다.
 * @param headerData 데이터를 추가 할 헤더
 * @param token 사용될 베어러 토큰.
 */
export const pipeBearerTokenHeader = (
  headerData: HashMap<string>,
  token?: string,
) => {
  if (token) {
    headerData.Authorization = `Bearer ${token}`;
  }

  return headerData;
};
/**
 * 헤더 파이프.
 * 대기현황판 전용 보안키가 필요할 때 사용한다.
 * 전달된 토큰 값이 유효하지 않다면 키값을 생성하지 않는다.
 * @param headerData 데이터를 추가 할 헤더
 * @param token 사용될 대기현황판 보안키
 */
export const pipeWtTokenHeader = (
  headerData: HashMap<string>,
  token?: string,
) => {
  if (token) {
    headerData['wt-server-key'] = token;
  }

  return headerData;
};

/**
 * HTTP 헤더를 제공한다.
 * tokenProvider 설정 후 pipe 로 필요한 헤더 요소를 함수로 구성하여
 * 다양한 HTTP 헤더를 만들 수 있다.
 * @param tokenProvider 토큰을 보관하는 제공자.
 */
export const httpHeaderProvideFactory = (tokenProvider?: ITokenProvider) => (
  ...pipes: Array<
    (defHeader: HashMap<string>, token?: string) => HashMap<string>
  >
) => {
  let token = '';

  if (tokenProvider) {
    token = tokenProvider.get();

    if (!token && !isServer()) {
      throw new Error(
        '로그인 상태가 만료 되었습니다.\n다시 로그인 하여 주시기 바랍니다.',
      );
    }
  }

  return pipes.reduce((prev, fn) => fn(prev, token), {}) as HashMap<string>;
};
