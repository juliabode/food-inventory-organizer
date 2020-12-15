import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/pages/Dashboard.js';
import FreezerPage from './components/pages/FreezerPage.js';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Dashboard />
      </Route>
      <Route path="/freezer">
        <FreezerPage />
      </Route>
    </Switch>
  );
};

export default Routes;
