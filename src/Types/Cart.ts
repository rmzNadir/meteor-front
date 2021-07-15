import { IImage } from './Products';

export interface ICartCTX {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: ICartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<ICartItem[]>>;
  cartTotal: ICartTotal;
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
