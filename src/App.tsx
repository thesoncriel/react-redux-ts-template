import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DeviceDetectContextProvider } from './common/contexts';
import RouteContainer from './entries/RouteContainer';
import GlobalStyle from './styles/GlobalStyle';
import { hot } from 'react-hot-loader/root';
import appConfig from './common/app.config';

const App: React.FC = () => (
  <BrowserRouter>
    <GlobalStyle />
    <DeviceDetectContextProvider>
      <RouteContainer />
    </DeviceDetectContextProvider>
  </BrowserRouter>
);

export default appConfig.development ? hot(App) : App;

// export default hot(App);
