/* eslint-disable no-nested-ternary */
import { Drawer, Empty } from 'antd';

import { useMediaQuery } from 'beautiful-react-hooks';
import { AnimatePresence } from 'framer-motion';
import { useCartCTX } from '../../Utils/CartContext';
import { CartItemSpace, EmptyWrapper } from './styles';
import CartItem from './CartItem';

const Cart = () => {
  const { visible, setVisible, cartItems, setCartItems } = useCartCTX();
  const mobile = useMediaQuery('(max-width: 640px)');
  const tablet = useMediaQuery('(max-width: 1023px)');

  console.log(cartItems);

  return (
    <Drawer
      title='Carrito de compras'
      placement='right'
      onClose={() => setVisible(false)}
      visible={visible}
      width={mobile ? '100%' : tablet ? '60%' : '35%'}
      bodyStyle={{ padding: 0 }}
    >
      <CartItemSpace>
        <AnimatePresence>
          {cartItems.length > 0 ? (
            cartItems.map((cI) => (
              <CartItem key={cI.id} item={cI} setCartItems={setCartItems} />
            ))
          ) : (
            <EmptyWrapper
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 0,
                transition: { duration: 0.3, delay: 0.3 },
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
