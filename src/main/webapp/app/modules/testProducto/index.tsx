import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import InCharge from './in-charge/in-charge';
import Shipped from './shipped/shipped';
import Delivered from './delivered/delivered';
import { TestProducto } from './testProducto';

const Routes = ({ match }) => (
    <div>
    <ErrorBoundaryRoute exact path={`${match.url}`} component={TestProducto} />
      <ErrorBoundaryRoute exact path={`${match.url}/incharge`} component={InCharge} />
      <ErrorBoundaryRoute exact path={`${match.url}/shipped`} component={Shipped} />
      <ErrorBoundaryRoute exact path={`${match.url}/delivered`} component={Delivered} />      
    </div>
   
  
);

export default Routes;