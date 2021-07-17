import { IImage } from './Products';

export interface ICartCTX {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: ICartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<ICartItem[]>>;
  cartTotal: ICartTotal;
  setUserCart: () => Promise<void>;
}

export interface ICartTotal {
  items: number;
  subtotal: number;
  shipping: number;
}

export interface ICartItem {
  id: number;
  quantity: number;
  name: string;
  price: number;
  image: IImage;
  description: string;
  stock: number;
  shipping_cost: number;
}

export interface IFormCartItem {
  id: ICartItem['id'];
  quantity: ICartItem['quantity'];
}

export interface ICheckoutForm {
  address: string;
  payment_method: number;
  payment_info: string;
  payment_info_expiration: string;
  payment_info_code: string;
}

export interface ISale {
  id: number;
  user_id: number;
  total: number;
  payment_method: number;
  payment_info: string;
  created_at: Date;
  updated_at: Date;
  address: string;
  shipping_total: number;
  payment_info_expiration: string;
  payment_info_code: string;
}
