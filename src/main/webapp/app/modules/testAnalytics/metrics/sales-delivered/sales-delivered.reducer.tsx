import axios from 'axios';
import { ICrudGetAllAction} from 'react-jhipster';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import {IDeliveredSalesForDay,defaultValueDeliveredSalesForDay} from '../metric.models';


const URL={
  FETCH_SALES_DELIVERED_FOR_DAY:'api/metric/salesDeliveredForDay', 
}
export const ACTION_TYPES = {
  FETCH_SALES_DELIVERED_FOR_DAY: 'metric/FETCH_SALES_DELIVERED_FOR_DAY', 
};

const initialDeliveredState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDeliveredSalesForDay>,
  entity: defaultValueDeliveredSalesForDay,
  updating: false,
  updateSuccess: false,
};

export type DeliveredSalesForDayState = Readonly<typeof initialDeliveredState>;

// Reducer

export default (state: DeliveredSalesForDayState = initialDeliveredState, action): DeliveredSalesForDayState => {
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


// Actions

export const getDeliveredSalesForDay: ICrudGetAllAction<IDeliveredSalesForDay> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SALES_DELIVERED_FOR_DAY,
  payload: axios.get<IDeliveredSalesForDay>(`${URL.FETCH_SALES_DELIVERED_FOR_DAY}?cacheBuster=${new Date().getTime()}`),
});
