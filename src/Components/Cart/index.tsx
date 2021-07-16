/* eslint-disable no-nested-ternary */
import { useCallback } from 'react';
import { Drawer, Empty } from 'antd';
import { useMediaQuery } from 'beautiful-react-hooks';
import { AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useCartCTX } from '../../Utils/CartContext';
import { CartItemSpace, EmptyWrapper } from './styles';
import CartItem from './CartItem';
import Summary from './Summary';

const Cart = () => {
  const { visible, setVisible, cartItems, setCartItems, cartTotal } =
    useCartCTX();
  const mobile = useMediaQuery('(max-width: 640px)');
  const tablet = useMediaQuery('(max-width: 1023px)');

  console.log(cartItems);

  const checkAuthStatus = useCallback(async (): Promise<boolean> => {
    try {
      const {
        data: { success },
      } = await axios.get('/logged_in');

      return success;
    } catch (e) {
      console.log(e);
      return false;
    }
  }, []);

  return (
    <Drawer
      title='Carrito de compras'
      placement='right'
      onClose={() => setVisible(false)}
      visible={visible}
      width={mobile ? '100%' : tablet ? '60%' : '35%'}
      bodyStyle={{ padding: 0 }}
    >
      <AnimatePresence>
        {cartItems.length > 0 && (
          <Summary cartTotal={cartTotal} checkAuthStatus={checkAuthStatus} />
        )}
      </AnimatePresence>

      <CartItemSpace>
        <AnimatePresence>
          {cartItems.length > 0 ? (
            cartItems.map((cI) => (
              <CartItem key={cI.id} item={cI} setCartItems={setCartItems} />
            ))
          ) : (
            <EmptyWrapper
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: 0.3 } }}
              exit={{
                opacity: 0,
                scale: 0,
                transition: { duration: 0.3 },
              }}
            >
              <Empty description='Tu carrito está vacío' />
            </EmptyWrapper>
          )}
        </AnimatePresence>
      </CartItemSpace>
    </Drawer>
  );
};

export default Cart;
