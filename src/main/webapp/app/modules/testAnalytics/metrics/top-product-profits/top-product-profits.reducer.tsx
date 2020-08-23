import axios from 'axios';

import { ICrudGetAllAction} from 'react-jhipster';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import {defaultValueTopProductProfits,ITopProductProfits} from '../metric.models';


const URL={
  FETCH_TOP_PRODUCT_PROFITS:'api/metric/topProductProfits'
}

export const ACTION_TYPES = {
  FETCH_TOP_PRODUCT_PROFITS:'metric/FETCH_TOP_PRODUCT_PROFITS'
};


const initialStateTopProductProfits = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITopProductProfits>,
  entity: defaultValueTopProductProfits,
  updating: false,
  updateSuccess: false,
};


export type TopProductProfitsState = Readonly<typeof initialStateTopProductProfits>;
// Reducer


export default (state: TopProductProfitsState = initialStateTopProductProfits, action): TopProductProfitsState => {
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

export const getTopProductProfits: ICrudGetAllAction<ITopProductProfits> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TOP_PRODUCT_PROFITS,
  payload: axios.get<ITopProductProfits>(`${URL.FETCH_TOP_PRODUCT_PROFITS}?cacheBuster=${new Date().getTime()}`),
});

