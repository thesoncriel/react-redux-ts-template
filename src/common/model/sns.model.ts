/**
 * SNS 형태
 */
export enum SNSTypes {
  /**
   * 특별히 정해져 있지 않은 공통 내용
   */
  // COMMON = 'common',
  /**
   * 페이스북 관련
   */
  FACEBOOK = 'facebook',
  /**
   * 트위터 관련
   */
  TWITTER = 'twitter',
  /**
   * 카카오톡 관련
   */
  KAKAO = 'kakao',
  /**
   * 해당 경로를 직접 공유 함
   */
  LINK = 'link',
}

/**
 * 사용되는 SNS 목록
 */
export const SNS_TYPE_LIST: SNSTypes[] = [
  SNSTypes.FACEBOOK,
  SNSTypes.TWITTER,
  SNSTypes.KAKAO,
  SNSTypes.LINK,
];

/**
 * SNS에 URL 을 공유할 때 쓰이는 인자값.
 */
export interface SnsShareArgs {
  /**
   * 제목
   */
  title?: string;
  /**
   * 공유 할 경로.
   */
  url: string;
}

/**
 * SNS에 URL을 공유할 때 전달될 페이로드 자료.
 */
export interface SnsSharePayload extends SnsShareArgs {
  /**
   * 전달 매체 형태.
   */
  type: SNSTypes;
}
