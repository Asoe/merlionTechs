import axios from 'axios';
import { ICrudGetAllAction} from 'react-jhipster';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import {ISalesForDay,defaultValueSalesForDay,} from '../metric.models';


const URL={  
  FETCH_SALES_FOR_DAY:'api/metric/salesForDay',  
}

export const ACTION_TYPES = {  
  FETCH_SALES_FOR_DAY: 'metric/FETCH_SALES_FOR_DAY', 
};

const initialSalesForDayState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISalesForDay>,
  entity: defaultValueSalesForDay,
  updating: false,
  updateSuccess: false,
};

export type SalesForDayState = Readonly<typeof initialSalesForDayState>;

// Reducer

export default (state: SalesForDayState = initialSalesForDayState, action): SalesForDayState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SALES_FOR_DAY):    
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };    
    case FAILURE(ACTION_TYPES.FETCH_SALES_FOR_DAY):     
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SALES_FOR_DAY):   
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
export const getSalesForDay: ICrudGetAllAction<ISalesForDay> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SALES_FOR_DAY,
  payload: axios.get<ISalesForDay>(`${URL.FETCH_SALES_FOR_DAY}?cacheBuster=${new Date().getTime()}`),
});



