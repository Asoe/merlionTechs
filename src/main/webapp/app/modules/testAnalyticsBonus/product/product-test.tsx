import './product-test.scss';

import React, { PureComponent, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Card, CardContent, Paper, CardHeader, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@material-ui/core/';
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { getEntitiesProductTest } from './product-test.reducer';

export interface IProductTestProp extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }
export const ProductsTest = (props: IProductTestProp) => {

  useEffect(() => {
    props.getEntitiesProductTest(props.userId);
  }, []);

  const { productList, userId, errorMessage, match } = props;

  const handleView = id => (props.history.push(`/productTest/product/details/${id}`));

  const handleEdit = id => (props.history.push(`/productTest/product/edit/${id}`));

  return (

    <Paper>
      <Card className="card">
        <CardHeader className="cardHeader" title="List products" >
        </CardHeader>
        <CardContent>
          {errorMessage ? (
            <Alert color="info">
              User {userId} has not permissions for to list product
            </Alert>

          ) : (
              <TableContainer component={Paper}>
                <Table className="table" aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">ID</TableCell>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center">Price</TableCell>
                      <TableCell align="center"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productList.map((product, i) => (

                      <TableRow key={product.id}>
                        <TableCell align="center">{product.id}</TableCell>
                        <TableCell align="center">{product.name}</TableCell>
                        <TableCell align="center">{product.price}</TableCell>
                        <TableCell align="center">
                          <div className="btn-group flex-btn-group-container">
                            <Button
                              style={{ backgroundColor: "#266ba0", color: "#FFFFFF" }}
                              onClick={() => handleView(product.id)}
                              variant="contained"
                              size="small">View</Button>
                            <Button
                              style={{ backgroundColor: "#266ba0", color: "#FFFFFF" }}
                              onClick={() => handleEdit(product.id)}
                              variant="contained"
                              size="small">Edit</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
        </CardContent>
      </Card>
    </Paper>


  );
};


const mapStateToProps = ({ product, testAnalytics }: IRootState) => ({
  productList: product.entities,
  errorMessage: product.errorMessage,
  userId: testAnalytics.userId,
});

const mapDispatchToProps = {
  getEntitiesProductTest,
};


type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductsTest);

