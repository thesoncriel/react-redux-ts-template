import { sampleRoute } from '../modules/sample/routes';
import { rootRoutes } from '../modules/root/routes';
import { cypressRoute } from '../modules/cypressDemo/routes';

/**
 * 프로젝트 내 모든 라우트 정보를 모은것.
 */
export const routes = [...rootRoutes, ...sampleRoute, ...cypressRoute];
