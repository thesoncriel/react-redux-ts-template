import { tokenProviderFactory } from '../../../factories';

/**
 * 사용자용 베어러 토큰이 필요한 곳에 쓰인다.
 */
export const bearerTokenProvider = tokenProviderFactory('__token');
