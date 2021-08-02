import { IErrors } from '../Common';

export interface IPlatform {
  id: number;
  name: 'PC' | 'Mac' | 'Linux';
}

export interface ILanguage {
  id: number;
  name: string;
}

export interface IImage {
  id: number;
  content_type: string;
  filename: string;
  url: string;
  created_at?: string;
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  platforms: IPlatform[];
  languages: ILanguage[];
  provider: string;
  has_free_shipping: boolean;
  shipping_cost: number;
  last_bought_at: string | null;
  created_at: string;
  image: IImage;
  disabled: boolean;
  times_bought: number;
}

export type ILowStock = Pick<IProduct, 'id' | 'name' | 'stock'>;

export type IPossibleSales = Pick<IProduct, 'id' | 'name' | 'stock'>;

export interface ICards {
  total_records: number;
  low_stock: ILowStock[];
  possible_sales: IPossibleSales[];
  latest_addition: IProduct;
}

export type NewProduct = Omit<IProduct, 'id'>;

export interface INewProductTemp {
  name: string;
  price: string;
  description: string;
  stock: string;
  platforms: IPlatform[];
  languages: ILanguage[];
  provider: string;
  has_free_shipping: boolean;
  shipping_cost: string;
  last_bought_at: Date;
  image: IImage;
}

export interface IDeleteProduct {
  success: boolean;
  msg: string;
  product?: IProduct;
  errors?: IErrors;
}
