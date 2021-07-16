/* eslint-disable no-nested-ternary */
import axios from 'axios';
import {
  useDebouncedFn,
  // useThrottledFn,
} from 'beautiful-react-hooks';
import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import moment from 'moment';
import { ICartCTX, ICartItem } from '../Types';
import { useAuthCTX } from './AuthContext';
import { getStorage, setStorage } from './Storage';

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
  const { isAuth, user } = useAuthCTX();
  const renders = useRef(1);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateUserCart = useCallback(
    useDebouncedFn(async (cI: ICartItem[]) => {
      const reqItems = cI.map(({ id, quantity }) => ({ id, quantity }));

      try {
        await axios.patch(`/carts/${user?.id}`, {
          products: reqItems,
        });
      } catch (e) {
        console.error(e);
      }
    }, 500),
    []
  );

  const setUserCart = useCallback(async () => {
    try {
      if (isAuth) {
        const { data } = await axios.get(`/carts/${user?.id}`);
        const { success, cart_items, cart_updated_at } = data;

        if (success) {
          const lsCartUpdate = getStorage('cart_updated_at');

          const isBackOutdated = moment(
            moment(cart_updated_at).format('YYYY-MM-DD HH:mm')
          ).isBefore(moment(lsCartUpdate).format('YYYY-MM-DD HH:mm'));

          if (isBackOutdated) {
            const cart = getStorage('cart');
            if (Array.isArray(cart)) {
              updateUserCart(cart);
              setCartItems(cart);
            }
          } else {
            setCartItems(cart_items);
            setStorage('cart', cart_items);
            setStorage('cart_updated_at', moment());
            // xd
          }
        }
      } else {
        const cart = getStorage('cart');
        if (Array.isArray(cart)) setCartItems(cart);
      }
    } catch (e) {
      console.error(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Maybe separate into 2 useEffects

  useEffect(() => {
    if (renders.current < 2) {
      setUserCart();
    }

    if (renders.current > 2) {
      if (isAuth) {
        updateUserCart(cartItems);
      }
      setStorage('cart', cartItems);
      setStorage('cart_updated_at', moment());
    }

    renders.current += 1;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

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
