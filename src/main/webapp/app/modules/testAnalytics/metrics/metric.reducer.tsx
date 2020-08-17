import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISales } from 'app/shared/model/sales.model';
import {IDeliveredSalesForDay,defaultValueDeliveredSalesForDay,ISalesForDay,
  defaultValueSalesForDay,  ITopProductSales, defaultValueTopProductSales,defaultValueTopProductProfits,ITopProductProfits} from './metric.models';


const URL={
  FETCH_SALES_DELIVERED_FOR_DAY:'api/metric/salesDeliveredForDay',
  FETCH_SALES_FOR_DAY:'api/metric/saleForDay',
  FETCH_TOP_PRODUCT_SALES:'api/metric/topProductSales',
  FETCH_TOP_PRODUCT_PROFITS:'api/metric/topProductProfits'
}
export const ACTION_TYPES = {
  FETCH_SALES_DELIVERED_FOR_DAY: 'metric/FETCH_SALES_DELIVERED_FOR_DAY',
  FETCH_SALES_FOR_DAY: 'metric/FETCH_SALES_FOR_DAY',
  FETCH_TOP_PRODUCT_SALES: 'metric/FETCH_TOP_PRODUCT_SALES',
  FETCH_TOP_PRODUCT_PROFITS:'metric/FETCH_TOP_PRODUCT_PROFITS'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDeliveredSalesForDay>,
  entity: defaultValueDeliveredSalesForDay,
  updating: false,
  updateSuccess: false,
};

const initialStateTopProductSales = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITopProductSales>,
  entity: defaultValueTopProductSales,
  updating: false,
  updateSuccess: false,
};

const initialStateTopProductProfits = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITopProductProfits>,
  entity: defaultValueTopProductProfits,
  updating: false,
  updateSuccess: false,
};



export type DeliveredSalesForDayState = Readonly<typeof initialState>;
export type TopProductSalesState = Readonly<typeof initialStateTopProductSales>;
export type TopProductProfitsState = Readonly<typeof initialStateTopProductProfits>;
// Reducer

export default (state: DeliveredSalesForDayState = initialState, action): DeliveredSalesForDayState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SALES_DELIVERED_FOR_DAY):    
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };    
    case FAILURE(ACTION_TYPES.FETCH_SALES_DELIVERED_FOR_DAY):     
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SALES_DELIVERED_FOR_DAY):   
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };  
    
    default:
      return state;
  }
};

export const topProductSales=(state: TopProductSalesState = initialStateTopProductSales, action): TopProductSalesState => {
  switch (action.type) {
      case REQUEST(ACTION_TYPES.FETCH_TOP_PRODUCT_SALES):      
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };    
   
    case FAILURE(ACTION_TYPES.FETCH_TOP_PRODUCT_SALES):      
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
   
    case SUCCESS(ACTION_TYPES.FETCH_TOP_PRODUCT_SALES):     
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };  
    
    default:
      return state;
  }
};

export const topProductProfits=(state: TopProductProfitsState = initialStateTopProductProfits, action): TopProductProfitsState => {
  switch (action.type) {      
      case REQUEST(ACTION_TYPES.FETCH_TOP_PRODUCT_PROFITS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };        
    case FAILURE(ACTION_TYPES.FETCH_TOP_PRODUCT_PROFITS):  
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };   
    case SUCCESS(ACTION_TYPES.FETCH_TOP_PRODUCT_PROFITS):  
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };  
    
    default:
      return state;
  }
};
// Actions

export const getDeliveredSalesForDay: ICrudGetAllAction<IDeliveredSalesForDay> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SALES_DELIVERED_FOR_DAY,
  payload: axios.get<IDeliveredSalesForDay>(`${URL.FETCH_SALES_DELIVERED_FOR_DAY}`),
});

export const getSalesForDay: ICrudGetAllAction<ISalesForDay> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SALES_DELIVERED_FOR_DAY,
  payload: axios.get<ISalesForDay>(`${URL.FETCH_SALES_FOR_DAY}`),
});


export const getTopProductSales: ICrudGetAllAction<ITopProductSales> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TOP_PRODUCT_SALES,
  payload: axios.get<ITopProductSales>(`${URL.FETCH_TOP_PRODUCT_SALES}`),
});


export const getTopProductProfits: ICrudGetAllAction<ITopProductProfits> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TOP_PRODUCT_PROFITS,
  payload: axios.get<ITopProductProfits>(`${URL.FETCH_TOP_PRODUCT_PROFITS}`),
});

