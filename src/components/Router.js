import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SetPicker from './SetPicker';
import App from './App';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SetPicker} />
      <Route path="/set/:setId" component={App} />
    </Switch>
  </BrowserRouter>
);

export default Router;