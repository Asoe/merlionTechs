import './sales-delivered.scss';

import React from 'react';
import { Card,CardContent,Paper,CardHeader} from '@material-ui/core/';
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import {  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';

export const RenderDeliveredSales = (props: IDeliveredSalesProp) => {
  const { deliveredSalesList } = props;  
  return (
      
    <Paper>
        <Card className ="card">
            <CardHeader className ="cardHeader" title="Delivered Sales for day"/>
                
            <CardContent>
              {deliveredSalesList.length===0?(
                 <Alert color="info" className="alert"> None sales delivered </Alert>
              ):(
               
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
              )}
            
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

