import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { testRoute } from './test.route';

const RouteContainer = () => (
  <Switch>
    {testRoute.map((route, idx) => (
      <Route
        key={idx}
        exact={route.exact}
        path={route.path}
        component={route.component}
      />
    ))}
  </Switch>
);

export default RouteContainer;
