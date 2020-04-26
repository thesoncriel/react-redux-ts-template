import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DeviceDetectContextProvider } from './common/contexts';
import RouteContainer from './entries/RouteContainer';
import GlobalStyle from './styles/GlobalStyle';

const App: React.FC = () => (
  <BrowserRouter>
    <GlobalStyle />
    <DeviceDetectContextProvider>
      <RouteContainer />
    </DeviceDetectContextProvider>
  </BrowserRouter>
);

export default App;
