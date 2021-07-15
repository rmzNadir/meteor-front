/* eslint-disable no-nested-ternary */
import { Drawer, Empty } from 'antd';

import { useMediaQuery } from 'beautiful-react-hooks';
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
    >
      {cartItems.length > 0 ? (
        <>
          <CartItemSpace>
            {cartItems.map((cI) => (
              <CartItem key={cI.id} item={cI} setCartItems={setCartItems} />
            ))}
          </CartItemSpace>
        </>
      ) : (
        <EmptyWrapper>
          <Empty description='Tu carrito está vacío' />
        </EmptyWrapper>
      )}
    </Drawer>
  );
};

export default Cart;
