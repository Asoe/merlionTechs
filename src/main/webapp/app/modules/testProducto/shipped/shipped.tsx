import React,{useState, useEffect } from 'react';
import { Link,RouteComponentProps } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { Paper,Tabs,Tab,TableContainer,Table,TableHead,TableRow,TableCell,TableBody,makeStyles,Button } from '@material-ui/core';
import{getEntities,updateEntity,} from '../../../entities/sales/sales.reducer';
import { ISales } from 'app/shared/model/sales.model';
import {State} from 'app/shared/model/enumerations/state.model'
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

// export type IShippedProp = StateProps;
export interface IShippedProp extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}
const optionSelected=1
const stateDescription=State.SHIPPED
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });


function handlerChange(event: object, value: any):void{
  
}

export const Shipped = (props: IShippedProp) => {
  useEffect(() => {
    props.getEntities();
  }, []);
  
  const changeState = (salesEntity:ISales) => {
    salesEntity.state=State.DELIVERED
    props.updateEntity(salesEntity)      
  }
  const { salesList, match, loading } = props;
 
  const classes = useStyles(); 
  return (
    <div>
      <Paper className="menu">
        <Tabs
          value={optionSelected}
          onChange={handlerChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="ENCARGADO" href='/testProducto/incharge' />
          <Tab label="ENVIADO" href='/testProducto/shipped' />
          <Tab label="ENTREGADO" href='/testProducto/delivered'/>
        </Tabs>
    
    </Paper>
    <div>      
    <TableContainer component={Paper}>
        {salesList && salesList.length > 0 ? (
          
          <Table  className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow>
              <TableCell align="center">Nro venta</TableCell>             
              <TableCell align="center">Producto</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
              {salesList.filter((sales)=>sales.state===stateDescription).filter((sales)=>sales.product).map((sales, i) => (                
                  <TableRow key={`entity-${i}`}>
                  <TableCell align="center">{sales.id}</TableCell>                  
                  <TableCell align="center">{sales.product.name}</TableCell>
                  <TableCell align="center">
                    <Button color="primary" onClick={()=>{changeState(sales)}}>Entregar</Button>   
                  </TableCell>
                  </TableRow>          
              ))}
            </TableBody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">Sin ventas a enviar
            </div>
          )
        )}
      </TableContainer>
    </div>        
    </div>
    
  );
};


const mapStateToProps = ({ sales }: IRootState) => ({
  salesList: sales.entities,
  loading: sales.loading,
});

const mapDispatchToProps = {
  getEntities,
  updateEntity,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Shipped);