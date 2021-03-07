import { LoginTestPage } from './pages/LoginTestPage';
import { InputTestPage } from './pages/InputTestPage';
import { ConfirmStubPage } from './pages/ConfirmStubPage';
import { RouteModel } from './../../common/models';
import { AlertStubPage } from './pages/AlertStubPage';
import { LoginPostTestPage } from './pages/LoginPostTestPage';

export const cypressRoute: RouteModel[] = [
  {
    name: 'confirm stub',
    path: '/cypress/confirmStub',
    component: ConfirmStubPage,
  },
  {
    name: 'alert stub',
    path: '/goods/:id',
    component: AlertStubPage,
  },
  {
    name: 'input test',
    path: '/test/input',
    component: InputTestPage,
  },
  {
    name: 'login test',
    path: '/test/login',
    component: LoginTestPage,
  },
  {
    name: 'login post test',
    path: '/test/loginPost',
    component: LoginPostTestPage,
  },
];
