import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import GeoStructure from '../pages/GeoStructure';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={GeoStructure} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
