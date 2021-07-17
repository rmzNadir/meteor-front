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
import { ICartCTX, ICartItem } from '../Types';
import { useAuthCTX } from './AuthContext';
import { getStorage, setStorage } from './Storage';

interface Props {
  children: React.ReactNode;
}

interface INewCartItem extends ICartItem {
  isNew?: boolean;
}

const CartCTX = createContext<ICartCTX>({
  visible: false,
  setVisible: () => {},
  cartItems: [],
  setCartItems: () => {},
  cartTotal: { items: 0, subtotal: 0, shipping: 0 },
  setUserCart: () => new Promise<void>(() => {}),
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
    [user]
  );

  const setUserCart = useCallback(async () => {
    const localCart = getStorage('cart');

    try {
      if (isAuth) {
        const { data } = await axios.get(`/carts/${user?.id}`);
        const { success, cart_items } = data;

        if (success) {
          // If the same product is found in the merge from the ls cart and the db cart arrays
          // then the one from the ls cart takes priority
          const merged = Object.values(
            [
              ...localCart.map((i: ICartItem) => ({ ...i, isNew: true })),
              ...cart_items,
            ].reduce((acc: INewCartItem[], obj: INewCartItem) => {
              const curr = acc[obj.id];
              acc[obj.id] = curr ? (!curr.isNew ? obj : curr) : obj;
              return acc;
            }, {})
          ) as ICartItem[];

          setCartItems(merged);
          setStorage('cart', merged);
        }
      } else {
        setCartItems(localCart);
      }
    } catch (e) {
      console.error(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Maybe separate into 2 useEffects...

  useEffect(() => {
    if (renders.current < 2) {
      setUserCart();
    }

    if (renders.current > 2) {
      if (isAuth) {
        updateUserCart(cartItems);
      }
      setStorage('cart', cartItems);
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
    setUserCart,
  };

  return <CartCTX.Provider value={value}>{children}</CartCTX.Provider>;
};

export default CartProvider;
