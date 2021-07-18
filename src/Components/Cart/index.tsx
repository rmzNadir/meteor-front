/* eslint-disable no-nested-ternary */
import { useCallback, useState } from 'react';
import { Button, Drawer, Empty, message, Result } from 'antd';
import { useMediaQuery } from 'beautiful-react-hooks';
import { AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useCartCTX } from '../../Utils/CartContext';
import { CartItemSpace, EmptyWrapper, ResultWrapper } from './styles';
import CartItem from './CartItem';
import Summary from './Summary';
import { ICheckoutForm, ISale } from '../../Types';

const Cart = () => {
  const { visible, setVisible, cartItems, setCartItems, cartTotal } =
    useCartCTX();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sale, setSale] = useState<ISale>();
  const history = useHistory();
  const mobile = useMediaQuery('(max-width: 640px)');
  const tablet = useMediaQuery('(max-width: 1023px)');
  const laptop = useMediaQuery('(max-width: 1439px)');
  const laptopL = useMediaQuery('(min-width: 1980px)');

  const checkAuthStatus = useCallback(async (): Promise<boolean> => {
    try {
      const {
        data: { success },
      } = await axios.get('/logged_in');

      return success;
    } catch (e) {
      console.error(e);
      return false;
    }
  }, []);

  const onSubmit = useCallback(
    async (values: ICheckoutForm, resetForm: () => void) => {
      setIsSubmitting(true);
      const formattedValues = {
        ...values,
        payment_method: +values.payment_method,
        products: cartItems.map(({ id, quantity }) => ({ id, quantity })),
      };

      try {
        const { data } = await axios.post('/sales', formattedValues);
        const { success, sale: saleData } = data;
        if (success) {
          resetForm();
          setCartItems([]);
          setSale(saleData);
        }
      } catch (e) {
        console.error(e);
        message.error('Ocurrió un error, por favor intenta de nuevo');
      }

      setIsSubmitting(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cartItems]
  );

  const handleCheckOrder = () => {
    setSale(undefined);
    setVisible(false);
    history.push(`/orders/${sale?.id}`);
  };

  return (
    <Drawer
      title='Carrito de compras'
      placement='right'
      onClose={() => {
        setVisible(false);
        setSale(undefined);
      }}
      visible={visible}
      width={
        mobile
          ? '100%'
          : tablet
          ? '60%'
          : laptop
          ? '45%'
          : laptopL
          ? '30%'
          : '40%'
      }
      bodyStyle={{
        padding: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
      }}
    >
      <AnimatePresence>
        {cartItems.length > 0 && !sale && (
          <Summary
            cartTotal={cartTotal}
            checkAuthStatus={checkAuthStatus}
            setVisible={setVisible}
            onSubmit={onSubmit}
          />
        )}
        {sale && (
          <ResultWrapper
            key='order-result'
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.3 } }}
            exit={{
              opacity: 0,
              scale: 0,
              transition: { duration: 0.3 },
            }}
          >
            <Result
              status='success'
              title='¡Compra realizada correctamente!'
              subTitle='Se te ha enviado un correo de confirmación con los detalles de tu orden'
              extra={[
                <Button
                  type='primary'
                  key='open-order'
                  onClick={handleCheckOrder}
                >
                  Ver orden
                </Button>,
                <Button
                  key='close'
                  onClick={() => {
                    setSale(undefined);
                    setVisible(false);
                  }}
                >
                  Cerrar
                </Button>,
              ]}
            />
          </ResultWrapper>
        )}
      </AnimatePresence>

      <CartItemSpace>
        <AnimatePresence initial={false}>
          {cartItems.length > 0 &&
            cartItems.map((cI) => (
              <CartItem
                key={cI.id}
                item={cI}
                setCartItems={setCartItems}
                disabled={isSubmitting}
              />
            ))}

          {cartItems.length < 1 && !sale && (
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
