/**
 * 앱 환경 변수 설정 모음
 */
export interface AppConfig {
  /**
   * 실제 서버(AWS)에 적용되는지의 여부
   */
  production: boolean;
  /**
   * 테스트 서버 여부
   */
  stage: boolean;
  /**
   * 개발 서버 여부
   */
  development: boolean;
  /**
   * 앱 버전
   */
  version: string;
  /**
   * Google Analytics 트래킹 ID
   */
  gaTrackingId: string;
  /**
   * 페이스북 App ID
   */
  facebookAppId: string;
  /**
   * 네이버 로그인을 사용하기 위한 ID.
   */
  naverAppId: string;
  /**
   * 네이버 지도를 사용하기 위한 ID.
   */
  ncloudId: string;
  /**
   * 카카오 API를 사용하기위한 ID.
   */
  kakaoAppId: string;
  /**
   * 백엔드 API 도메인
   */
  apiUrl: string;
  /**
   * 해당 서비스가 이용하는 CDN 서버 주소.
   */
  cdnUrl: string;
  /**
   * 정적 파일 주소.
   * 로컬 테스트시엔 static 내용을, 운영서버일 경우 CDN 주소의 것을 이용한다.
   *
   * 대응 가능한 파일은 제한적이며, 추가 하여 사용 하려면 아래와 같은 gulp script 파일을 수정 하여야 한다.
   * - /gulp/s3-upload/index.js
   *   - rootUpload 및 fontUpload 부분 참조.
   *
   * 기본적으로 대응 가능한 파일은 다음과 같다.
   * - /static
   *   - /font 폴더 내 모든 파일
   *   - /favicon.ico
   *   - /favicon.png
   */
  staticUrl: string;
  /**
   * 버전별로 달라지는 정적 파일 주소.
   * 로컬 테스트시엔 static 내용을, 운영서버일 경우 CDN 주소에 앱버전을 붙인 경로로 제공 해준다.
   * - 개발: /
   * - 운영: cdn주소/버전/
   *
   * 기본적으로 대응 가능한 파일은 다음과 같다.
   * - /static
   *   - /images 내 모든 파일
   *   - /data 내 모든 파일
   *   - /sprite 내 모든 파일 (test 가 이름에 붙은 파일 제외)
   */
  staticVerUrl: string;
}

function getAppConfig(): AppConfig {
  const localStatic = 'http://localhost:3000';
  const production = process.env.REACT_APP_PRODUCTION === 'true';
  const stage = process.env.REACT_APP_STAGE === 'true';
  const development = process.env.REACT_APP_DEV === 'true';
  const cdnUrl = process.env.cdnUrl || localStatic;
  const version = process.env.version || '';
  const staticUrl = production ? cdnUrl : localStatic;
  const staticVerUrl = production ? cdnUrl + '/' + version : localStatic;

  return {
    production,
    stage,
    development,
    version,
    gaTrackingId: process.env.gaTrackingId || '',
    facebookAppId: process.env.facebookAppId || '',
    naverAppId: process.env.naverAppId || '',
    ncloudId: process.env.ncloudId || '',
    kakaoAppId: process.env.kakaoAppId || '',
    apiUrl: process.env.apiUrl || '',
    cdnUrl,
    staticUrl,
    staticVerUrl,
  };
}

export default getAppConfig();
