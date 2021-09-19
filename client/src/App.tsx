import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalStyle from './pages/global/GlobalStyles';
import IntroView from './pages/purple-shoes/Intro';

function App() {
  return (
   // TODO:
  <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <Route path="/" exact component={IntroView} />;
      </Switch>
    </BrowserRouter>
  );
}

export default App;
