import './top-product-sales.scss';

import React, { PureComponent, useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import {Card,CardContent,Paper,CardHeader,TableContainer,Table,TableHead,TableRow,TableCell,TableBody} from '@material-ui/core/';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { getDeliveredSalesForDay } from '../metric.reducer'



export const RenderTopProductSales = (props: ITopProductSalesProp) => {
  const { topProductSalesList } = props;  
  return (
      
    <Paper>
        <Card className ="card">
            <CardHeader className ="cardHeader" title="Top products sales"/>
                
            <CardContent>
            <TableContainer component={Paper}>
      <Table className="table" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Position</TableCell>
            <TableCell align="center">Product</TableCell>
            <TableCell align="center">Sales</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {topProductSalesList.map((sales,i) =>(
        
            <TableRow key={sales.product.id}>
            <TableCell align="center">{i+1}</TableCell>         
            <TableCell align="center">{sales.product.name}</TableCell>
            <TableCell align="center">{sales.cantTotalSales}</TableCell>
            
            </TableRow>
        ))}
        </TableBody>
      </Table>
    </TableContainer>
            </CardContent>
        </Card>
    </Paper>
     
         
  );
};



const mapStateToProps = ({ topProductSales }: IRootState) => ({ 
    topProductSalesList: topProductSales.entities,  
});

type ITopProductSalesProp = ReturnType<typeof mapStateToProps>;


export default connect(mapStateToProps)(RenderTopProductSales);

