
import {IProduct} from '../../../shared/model/product.model' 

export interface IDeliveredSalesForDay {
    date?: string;
    sales?: string;
}

export const defaultValueDeliveredSalesForDay: Readonly<IDeliveredSalesForDay> = {};

export interface ISalesForDay {
    date?: string;
    sales?: string;
}

export const defaultValueSalesForDay: Readonly<ISalesForDay> = {};


export interface ITopProductSales {
    product?: IProduct;
    cantTotalSales?: string;
    totalPrice?:string;
}

export const defaultValueTopProductSales: Readonly<ITopProductSales> = {};

export interface ITopProductProfits {
    product?: IProduct;
    cantTotalSales?: string;
    totalPrice?:string;
}
export const defaultValueTopProductProfits: Readonly<ITopProductProfits> = {};

