import { IUser } from './Auth';
import { IProduct } from './Products';

export interface ISaleRecord {
  id: number;
  total: number;
  subtotal: number;
  shipping_total: number;
  address: string;
  payment_method: 'credit_card' | 'debit_card';
  payment_info: string;
  user: Pick<IUser, 'id' | 'name' | 'last_name' | 'email'>;
  products: ISaleProduct[];
  created_at: Date;
}

export interface ISaleProduct {
  id: IProduct['id'];
  name: IProduct['name'];
  unit_price: IProduct['price'];
  quantity: number;
  image: IProduct['image'];
}
export interface IDaySale {
  name: string;
  date: Date;
  sales: number;
}

export interface MostSold {
  all_sales: number;
  percentage: number;
  product: IProduct;
}

export interface ITopBuyer {
  user: IUser;
  all_sales: number;
  percentage: number;
}

export interface IDashboard {
  week_sales: IDaySale[];
  most_sold: MostSold;
  top_buyer: ITopBuyer;
  top_5_products: IProduct[];
}
