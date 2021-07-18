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
  user: Pick<IUser, 'id' | 'name' | 'last_name'>;
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
