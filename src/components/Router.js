import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SetPicker from './SetPicker';
import App from './App';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SetPicker} />
      {/* when the route exactly matches / render out set picker */}
      <Route path="/set/:setId" component={App} />
    </Switch>
  </BrowserRouter>
);

export default Router;

// props in the url for a specific set stores the setId in params