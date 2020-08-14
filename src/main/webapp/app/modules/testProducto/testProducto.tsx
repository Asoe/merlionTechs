import './testProducto.scss';

import React from 'react';
import { Route, Redirect} from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';

import { IRootState } from 'app/shared/reducers';
import { Paper,Tabs,Tab } from '@material-ui/core';
export type ITestProductoProp = StateProps;

export const TestProducto = (props: ITestProductoProp) => {
  const { account } = props;
  
  return (
    <div>
      <h1>hello</h1>
      <Route     
        render={({ location }) =>(        
            <Redirect
              to={{
                pathname: "/testProducto/incharge",
                state: { from: location }
              }}
            />
        )
        }
    />

    </div>
    
  );
};



const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(TestProducto);
