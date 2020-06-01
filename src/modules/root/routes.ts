import { RouteModel } from '../../common/models';
import { RootPage } from './pages/RootPage';

export const rootRoutes: RouteModel[] = [
  {
    name: 'root',
    exact: true,
    path: '/',
    // redirect: '/sample',
    component: RootPage,
  },
];
