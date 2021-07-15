/* eslint-disable no-nested-ternary */
import React, { createContext, useContext, useMemo, useState } from 'react';
import { ICartCTX, ICartItem } from '../Types';

interface Props {
  children: React.ReactNode;
}

const CartCTX = createContext<ICartCTX>({
  visible: false,
  setVisible: () => {},
  cartItems: [],
  setCartItems: () => {},
  cartTotal: { items: 0, subtotal: 0, shipping: 0 },
});

export const useCartCTX = () => {
  return useContext(CartCTX);
};

const CartProvider: React.FC<Props> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (acc, { quantity, price, shipping_cost }) => ({
          items: acc.items + quantity,
          subtotal: acc.subtotal + price * quantity,
          shipping:
            acc.subtotal + price * quantity >= 250
              ? 0
              : shipping_cost > acc.shipping
              ? shipping_cost
              : acc.shipping,
        }),
        { items: 0, subtotal: 0, shipping: 0 }
      ),
    [cartItems]
  );

  const value: ICartCTX = {
    visible,
    setVisible,
    cartItems,
    setCartItems,
    cartTotal,
  };

  return <CartCTX.Provider value={value}>{children}</CartCTX.Provider>;
};

export default CartProvider;
