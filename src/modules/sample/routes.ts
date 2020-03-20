import { RouteModel } from '../../common/model';
import { SamplePage } from './pages';


export const sampleRoute: RouteModel[] = [
  {
    name: '샘플 목록',
    path: '/sample',
    component: SamplePage,
  }
];
