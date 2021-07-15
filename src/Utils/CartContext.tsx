import React, { createContext, useContext, useState } from 'react';
import { ICartCTX, ICartItem } from '../Types';

interface Props {
  children: React.ReactNode;
}

const CartCTX = createContext<ICartCTX>({
  visible: false,
  setVisible: () => {},
  cartItems: [],
  setCartItems: () => {},
});

export const useCartCTX = () => {
  return useContext(CartCTX);
};

const CartProvider: React.FC<Props> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  const value: ICartCTX = {
    visible,
    setVisible,
    cartItems,
    setCartItems,
  };

  return <CartCTX.Provider value={value}>{children}</CartCTX.Provider>;
};

export default CartProvider;
