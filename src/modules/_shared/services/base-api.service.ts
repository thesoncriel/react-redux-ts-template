import appConfig from '../../../common/app.config';
import {
  apiFactory,
  bearerTokenProvider,
  httpHeaderProvideFactory,
  pipeAppHeader,
  pipeBearerTokenHeader,
  pipeFormMultipartHeader,
  pipeJsonHeader,
} from '../../../factories';

/**
 * 기본적인 요청 헤더를 만든다.
 */
function createBaseHeader() {
  return httpHeaderProvideFactory()(pipeJsonHeader, pipeAppHeader);
}

/**
 * 베어러 토큰이 필요한 헤더를 만든다.
 */
function createAuthTokenHeader() {
  return httpHeaderProvideFactory(bearerTokenProvider)(
    pipeJsonHeader,
    pipeAppHeader,
    pipeBearerTokenHeader,
  );
}

/**
 * 업로드 요청 헤더를 만든다.
 */
function createAuthUploadHeader() {
  return httpHeaderProvideFactory(bearerTokenProvider)(
    pipeFormMultipartHeader,
    pipeAppHeader,
    pipeBearerTokenHeader,
  );
}

/**
 * 프로젝트에서 쓰이는 기본 호출 서비스.
 */
export const baseApi = apiFactory(appConfig.apiUrl, createBaseHeader);
/**
 * 프로젝트에서 쓰이는 보안토큰이 들어간 호출 서비스.
 */
export const authTokenApi = apiFactory(appConfig.apiUrl, createAuthTokenHeader);
/**
 * 프로젝트에서 쓰이는 업로드 호출 서비스.
 */
export const uploadApi = apiFactory(appConfig.apiUrl, createAuthUploadHeader);
/**
 * 프로젝트에서 쓰이는 정적 파일 호출 서비스.
 * 현재 프로젝트 기준, public 폴더내의 파일을 가리킨다.
 */
export const publicApi = apiFactory('');
/**
 * 특정 CDN 서버의 파일을 호출하는 서비스.
 */
export const cdnApi = apiFactory(appConfig.cdnUrl);
/**
 * 공개된 외부 api 를 호출하는 서비스.
 */
export const publicThirdPartyApi = apiFactory('');
