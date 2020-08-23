import './top-product-profits.scss';

import React from 'react';
import {Card,CardContent,Paper,CardHeader,TableContainer,Table,TableHead,TableRow,TableCell,TableBody} from '@material-ui/core/';
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';



export const RenderTopProductProfits = (props: ITopProductProfitsProp) => {
  const { topProductProfitList } = props;  
  return (
      
    <Paper>
        <Card className ="card">
            <CardHeader className ="cardHeader" title="Top products profits"/>
                
            <CardContent>
              {topProductProfitList.length===0?(
                   <Alert color="info" className="alert"> None sales </Alert>
              ):(
                <TableContainer component={Paper}>
                  <Table className="table" aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Position</TableCell>
                          <TableCell align="center">Product</TableCell>
                          <TableCell align="center">Profits</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {topProductProfitList.map((sales,i) =>(
                      
                          <TableRow key={sales.product.id}>
                          <TableCell align="center">{i+1}</TableCell>         
                          <TableCell align="center">{sales.product.name}</TableCell>
                          <TableCell align="center">{sales.totalPrice}</TableCell>
                          
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



const mapStateToProps = ({ topProductProfits }: IRootState) => ({ 
  topProductProfitList: topProductProfits.entities,  
});

type ITopProductProfitsProp = ReturnType<typeof mapStateToProps>;


export default connect(mapStateToProps)(RenderTopProductProfits);

