import './testAnalytics.scss';

import React, { PureComponent, useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import {Grid,Paper} from '@material-ui/core/';
import Alert from '@material-ui/lab/Alert';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { getDeliveredSalesForDay ,getTopProductSales,getTopProductProfits} from './metrics/metric.reducer'
import {RenderDeliveredSales} from './metrics/sales-delivered/sales-delivered'
import { RenderTopProductSales } from './metrics/top-product-sales/top-product-sales';
import { RenderTopProductProfits} from './metrics/top-product-profits/top-product-profits';
export interface ITestAnalyticsProp extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}
export const TestAnalytics = (props: ITestAnalyticsProp) => {
  
  if(props.account && props.account.login){
    useEffect(() => {
      props.getDeliveredSalesForDay();
      props.getTopProductSales();
      props.getTopProductProfits();
    }, []);
  } 
  const { deliveredSalesList, account,topProductSalesList,topProductProfitsList} = props;
  
  return (
    <Paper>
      <h2 className="fontMerlion">
           TestAnalytics Metrics
      </h2>
       
        {account && account.login ? (
          <div>
          <Grid className="gridFirst"justify="center"  alignItems="center" container spacing={2}>
            <Grid className="paper" justify="center" alignItems="center" container item xs >
              <Paper ><RenderDeliveredSales deliveredSalesList={deliveredSalesList}/></Paper>
            </Grid>
            
            <Grid justify="center" alignItems="center" container item xs>
            <Paper  ><RenderTopProductSales topProductSalesList={topProductSalesList}/></Paper>
            </Grid>
          </Grid> 
           <Grid className="gridLast" direction="row" justify="center"  alignItems="center" container spacing={2}>    
            <Grid justify="center" alignItems="center"  container item xs>
            <Paper  ><RenderTopProductProfits topProductProfitList={topProductProfitsList}/></Paper>
            </Grid>
            <Grid className="paper" justify="center" alignItems="center" container item xs >
              <Paper ><RenderDeliveredSales deliveredSalesList={deliveredSalesList}/></Paper>
            </Grid>
          </Grid>
          </div>               
           
      ):(<div>
        <Alert color="info">
          <Translate contentKey="global.messages.info.authenticated.prefix">If you want to </Translate>
          <Link to="/login" className="alert-link">
            <Translate contentKey="global.messages.info.authenticated.link"> sign in</Translate>
          </Link>
          <Translate contentKey="global.messages.info.authenticated.suffix">
            , you can try the default accounts:
            <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
            <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).
          </Translate>
        </Alert>

        <Alert color="info">
          <Translate contentKey="global.messages.info.register.noaccount">You do not have an account yet?</Translate>&nbsp;
          <Link to="/account/register" className="alert-link">
            <Translate contentKey="global.messages.info.register.link">Register a new account</Translate>
          </Link>
        </Alert>
      </div>)}      
    </Paper> 
  );
};


const mapStateToProps = ({ deliveredSalesForDay,authentication,topProductSales,topProductProfits }: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated,
  deliveredSalesList: deliveredSalesForDay.entities,  
  topProductSalesList:topProductSales.entities,
  topProductProfitsList:topProductProfits.entities
});

const mapDispatchToProps = {
  getDeliveredSalesForDay,
  getTopProductSales,
  getTopProductProfits,
};


type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export default connect(mapStateToProps, mapDispatchToProps,)(TestAnalytics);

