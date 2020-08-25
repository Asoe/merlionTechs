
import axios ,{ AxiosPromise} from 'axios';
import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProduct, defaultValue } from 'app/shared/model/product.model';

export const ACTION_TYPES = {
  FETCH_PRODUCT_LIST: 'product/FETCH_PRODUCT_LIST',
  FETCH_PRODUCT: 'product/FETCH_PRODUCT',
  CREATE_PRODUCT: 'product/CREATE_PRODUCT',
  UPDATE_PRODUCT: 'product/UPDATE_PRODUCT',
  DELETE_PRODUCT: 'product/DELETE_PRODUCT',
  RESET: 'product/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProduct>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ProductState = Readonly<typeof initialState>;

// Reducer

export default (state: ProductState = initialState, action): ProductState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PRODUCT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRODUCT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PRODUCT):
    case REQUEST(ACTION_TYPES.UPDATE_PRODUCT):
    case REQUEST(ACTION_TYPES.DELETE_PRODUCT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PRODUCT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRODUCT):
    case FAILURE(ACTION_TYPES.CREATE_PRODUCT):
    case FAILURE(ACTION_TYPES.UPDATE_PRODUCT):
    case FAILURE(ACTION_TYPES.DELETE_PRODUCT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRODUCT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRODUCT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PRODUCT):
    case SUCCESS(ACTION_TYPES.UPDATE_PRODUCT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PRODUCT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/testAnalyticsBonus/products';

// Actions



export const getEntitiesProductTest:ICrudGetAllAction<IProduct>= (userId,page, size, sort)=>{
    const axiosConfig = {
        headers: {
            'id-user': userId,
        }
      };
      const action={
        type: ACTION_TYPES.FETCH_PRODUCT_LIST,
        payload: axios.get<IProduct>(`${apiUrl}?cacheBuster=${new Date().getTime()}`,axiosConfig),
      } ;
      return action;
      
}; 

export const getEntityProductTest:ICrudGetAction<IProduct>= (userId,id) => {
  const requestUrl = `${apiUrl}/${id}`;
   const axiosConfig = {
        headers: {
            'id-user': userId,
        }
      };
      const action={
        type: ACTION_TYPES.FETCH_PRODUCT,
        payload:  axios.get<IProduct>(requestUrl,axiosConfig),
      } ;
      return action; 
};

export const createEntityProductTest :ICrudPutAction<IProduct>= (userId,entity)=> async dispatch => {
  const axiosConfig = {
    headers: {
        'id-user': userId,
    }
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PRODUCT,
    payload: axios.post(apiUrl, cleanEntity(entity),axiosConfig),
  });
  dispatch(getEntitiesProductTest(userId));
  return result;
};

export const updateEntityProductTest :ICrudPutAction<IProduct> = (userId,entity) => async dispatch => {
  const axiosConfig = {
    headers: {
        'id-user': userId,
    }
  };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PRODUCT,
    payload: axios.put(apiUrl, cleanEntity(entity),axiosConfig),
  });
  return result;
};

export const resetProductTest = () => ({
  type: ACTION_TYPES.RESET,
});


export interface IPayload<T> {
    type: string;
    payload: AxiosPromise<T>;
    meta?: any;
}
export declare type IPayloadResult<T> = ((dispatch: any, getState?: any) => IPayload<T> | Promise<IPayload<T>>);
export declare type ICrudGetAction<T> = (userId:string,id: string | number) => IPayload<T> | ((dispatch: any) => IPayload<T>);
export declare type ICrudGetAllAction<T> = (userId:string,page?: number, size?: number, sort?: string) => IPayload<T> | ((dispatch: any) => IPayload<T>);
export declare type ICrudPutAction<T> = (userId:string,data?: T) => IPayload<T> | IPayloadResult<T>;
