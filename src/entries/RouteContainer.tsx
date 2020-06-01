import React, { FC } from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { RouteModel } from '../common/models';
import { AsyncGuardComponent } from '../common/components/AsyncGuardComponent';
import { routes } from './routes';

const RouteFail: FC = () => <Redirect to="/" />;

const fnRouteRender = (route: RouteModel) => (props: RouteComponentProps) => {
  if (route.redirect) {
    return <Redirect to={route.redirect} />;
  }
  if (route.guard) {
    return (
      <AsyncGuardComponent
        {...props}
        loader={route.guard}
        succComponent={route.component}
        failComponent={RouteFail}
      />
    );
  }

  return <route.component {...props} />;
};

/**
 * 라우팅 내용을 모두 담고 있는 컴포넌트.
 * @constructor
 */
const RouteContainer: FC = () => (
  <Switch>
    {routes.map((route, idx) => (
      <Route
        key={idx}
        exact={route.exact}
        path={route.path}
        component={fnRouteRender(route)}
      />
    ))}
  </Switch>
);

export default RouteContainer;
