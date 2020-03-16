import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import RouteContainer from './routes/index';

const App: React.FC = () => (
  <BrowserRouter>
    <GlobalStyle />
    <RouteContainer />
  </BrowserRouter>
);

export default App;
