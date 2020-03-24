import { RouteModel } from '../../common/model';
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
