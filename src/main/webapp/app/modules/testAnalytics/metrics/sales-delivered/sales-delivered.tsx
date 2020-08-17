import './sales-delivered.scss';

import React, { PureComponent, useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import {Card,CardContent,Paper,CardHeader,Divider} from '@material-ui/core/';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import {  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';
import { IRootState } from 'app/shared/reducers';
import { getDeliveredSalesForDay } from '../metric.reducer'



export const RenderDeliveredSales = (props: IDeliveredSalesProp) => {
  const { deliveredSalesList } = props;  
  return (
      
    <Paper>
        <Card className ="card">
            <CardHeader className ="cardHeader" title="Delivered Sales for day"/>
                
            <CardContent>
            <BarChart
            width={450}
            height={300}
            data={deliveredSalesList}            
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis dataKey="sales"/>
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#266ba0" />        
        </BarChart>
            </CardContent>
        </Card>
    </Paper>
     
         
  );
};



const mapStateToProps = ({ deliveredSalesForDay }: IRootState) => ({ 
  deliveredSalesList: deliveredSalesForDay.entities,  
});

type IDeliveredSalesProp = ReturnType<typeof mapStateToProps>;


export default connect(mapStateToProps)(RenderDeliveredSales);

