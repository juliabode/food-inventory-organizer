import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard.js';
import Freezer from './myComponents/Freezer.js';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from='/'
        to='/dashboard'
      />
      <Route path='/dashboard'>
        <Dashboard />
      </Route>
      <Route path='/freezer'>
        <Freezer />
      </Route>
    </Switch>
  );
};

export default Routes;
