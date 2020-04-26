import { RouteModel } from '../../common/model';
import { SampleInputPage, SamplePage } from './pages';


export const sampleRoute: RouteModel[] = [
  {
    name: '샘플 목록',
    path: '/sample',
    component: SamplePage,
  },
  {
    name: '샘플 입력 테스트',
    path: '/sample/input',
    component: SampleInputPage,
  }
];
