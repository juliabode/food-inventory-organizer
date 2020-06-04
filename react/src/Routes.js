import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard.js';
import Freezer from './myComponents/Freezer.js';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Dashboard />
      </Route>
      <Route path='/freezer'>
        <Freezer />
      </Route>
    </Switch>
  );
};

export default Routes;
