import './testProducto.scss';

import React from 'react';
import { Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
export type ITestProductoProp = StateProps;

export const TestProducto = (props: ITestProductoProp) => {
  const { account } = props;
  
  return (
    <div>
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
