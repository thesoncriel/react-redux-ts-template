import { TestPage, QueryTestPage, TestListPage, IndexPage } from '../pages';

export interface RouteModel {
  name: string;
  exact?: boolean;
  href?: string;
  path: string;
  component: React.ComponentClass | React.FC | any;
}

export const testRoute: RouteModel[] = [
  {
    name: '홈',
    exact: true,
    path: '/',
    component: IndexPage,
  },
  {
    name: '홈',
    exact: true,
    path: '/test',
    component: TestPage,
  },
  {
    name: '홈',
    exact: true,
    path: '/test/list',
    component: TestListPage,
  },
  {
    name: '파라미터·입력 테스트',
    href: '/test/parameters/ddocdoc?id=bbros',
    path: '/test/parameters/:uuid',
    component: QueryTestPage,
  },
];
