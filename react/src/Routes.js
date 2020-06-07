import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard.js';
import Freezer from './components/dashboard/Freezer.js';

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
