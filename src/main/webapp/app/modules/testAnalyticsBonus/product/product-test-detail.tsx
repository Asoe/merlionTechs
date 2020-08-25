import './product-test.scss';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import {Card,CardContent,Paper,CardHeader,} from '@material-ui/core/';
import Alert from '@material-ui/lab/Alert';
import { IRootState } from 'app/shared/reducers';
import { getEntityProductTest } from './product-test.reducer';


export interface IProductDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProductTestDetail = (props: IProductDetailProps) => {
  useEffect(() => {
    props.getEntityProductTest(props.userId,props.match.params.id);
  }, []);

  const { productEntity,userId,errorMessage } = props;
  return (
    <Paper>
    <Card className ="card">
        <CardHeader className ="cardHeader" title="Products details"/>                
          <CardContent>
          {errorMessage?(
            <Alert color="info">
              User {userId} has not permissions for to show product details
            </Alert>

          ):(
              <>              
                <h2 className="fontMerlion">Product</h2>                            
                <h4 className="fontMerlion"> Id: <b>{productEntity.id}</b></h4><p></p>
                <h4 className="fontMerlion"> Name: {productEntity.name}</h4>
                <h4 className="fontMerlion"> Price: {productEntity.price}  </h4>   
                &nbsp; 
            </>
          )}           
            </CardContent>
    </Card>
</Paper>
    
  );
};

const mapStateToProps = ({ product,testAnalytics }: IRootState) => ({
  productEntity: product.entity,
  errorMessage: product.errorMessage,
  userId: testAnalytics.userId,
});

const mapDispatchToProps = { getEntityProductTest };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductTestDetail);
