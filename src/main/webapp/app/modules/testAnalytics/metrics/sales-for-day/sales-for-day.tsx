import './sales-for-day.scss';

import React from 'react';
import {Card,CardContent,Paper,CardHeader} from '@material-ui/core/';
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import {  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';
import { IRootState } from 'app/shared/reducers';

export const SalesForDay = (props:ISalesForDayProp) => {   

  const { salesForDayList } = props;  
  return (
      
    <Paper>
        <Card className ="card">
            <CardHeader className ="cardHeader" title="Sales for day"/>
                
            <CardContent>
                {salesForDayList.length===0?(
                   <Alert color="info" className="alert"> None sales </Alert>      
                ):(
                    <BarChart
                    width={450}
                    height={300}
                    data={salesForDayList}            
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



const mapStateToProps = ({ salesForDay }: IRootState) => ({ 
    salesForDayList: salesForDay.entities,  
});


type ISalesForDayProp = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps,null)(SalesForDay);

