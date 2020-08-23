import axios from 'axios';
import {  ICrudGetAllAction} from 'react-jhipster';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import {ITopProductSales, defaultValueTopProductSales} from '../metric.models';


const URL={
  FETCH_TOP_PRODUCT_SALES:'api/metric/topProductSales',
}
export const ACTION_TYPES = {
  FETCH_TOP_PRODUCT_SALES: 'metric/FETCH_TOP_PRODUCT_SALES',
};

const initialStateTopProductSales = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITopProductSales>,
  entity: defaultValueTopProductSales,
  updating: false,
  updateSuccess: false,
};

export type TopProductSalesState = Readonly<typeof initialStateTopProductSales>;
// Reducer

export default (state: TopProductSalesState = initialStateTopProductSales, action): TopProductSalesState => {
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

// Actions

export const getTopProductSales: ICrudGetAllAction<ITopProductSales> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TOP_PRODUCT_SALES,
  payload: axios.get<ITopProductSales>(`${URL.FETCH_TOP_PRODUCT_SALES}?cacheBuster=${new Date().getTime()}`),
});



