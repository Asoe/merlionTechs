import '../testProducto.scss';
import React, {  useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { Paper, Tabs, Tab, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, Theme, createStyles, Button } from '@material-ui/core';
import { getEntities, updateEntity, } from '../../../entities/sales/sales.reducer';
import { ISales } from 'app/shared/model/sales.model';
import { State } from 'app/shared/model/enumerations/state.model'

// export type IShippedProp = StateProps;
export interface IShippedProp extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }
const optionSelected = 1
const stateDescription = State.SHIPPED

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      color: "#266ba0",
      fontSize: 18,
      fontFamily: "Helvetica, sans-serif",
      fontWeight: "bold",
    },
    body: {
      color: "#266ba0",
      fontSize: 16,
      fontFamily: "Helvetica, sans-serif",
      fontWeight: "bold",
    },
  }),
)(TableCell);

export const Shipped = (props: IShippedProp) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const changeState = (salesEntity: ISales) => {
    salesEntity.state = State.DELIVERED
    props.updateEntity(salesEntity)
  }
  const { salesList, match, loading } = props;


  return (
    <div>
      <Paper >
        <Tabs classes={{ root: "fontMerlion" }}
          value={optionSelected}
          indicatorColor="primary"
          centered
        >
          <Tab label="ENCARGADO" href='/testProducto/incharge' />
          <Tab label="ENVIADO" href='/testProducto/shipped' />
          <Tab label="ENTREGADO" href='/testProducto/delivered' />
        </Tabs>

      </Paper>
      <div>
        <TableContainer component={Paper}>
          {salesList && salesList.length > 0 ? (

            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">NRO VENTA</StyledTableCell>
                  <StyledTableCell align="center">PRODUCTO</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {salesList.filter((sales) => sales.state === stateDescription).filter((sales) => sales.product).map((sales, i) => (
                  <TableRow key={`entity-${i}`}>
                    <StyledTableCell align="center">{sales.id}</StyledTableCell>
                    <StyledTableCell align="center">{sales.product.name}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Button id="button" variant="outlined" onClick={() => { changeState(sales) }}>Entregar</Button>
                    </StyledTableCell>
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