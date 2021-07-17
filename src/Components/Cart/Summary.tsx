import { useState } from 'react';
import { Typography, Button } from 'antd';
import NumberFormat from 'react-number-format';
import { useHistory } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ICartTotal, ICheckoutForm } from '../../Types';
import { SummarySpace, BuyButtonSpace, CheckoutSpace } from './styles';
import CheckoutForm from './CheckoutForm';

const { Text } = Typography;

interface Props {
  cartTotal: ICartTotal;
  checkAuthStatus(): Promise<boolean>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit(formValues: ICheckoutForm, resetForm: () => void): Promise<void>;
}

const Summary = ({
  cartTotal,
  checkAuthStatus,
  setVisible,
  onSubmit,
}: Props) => {
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const history = useHistory();

  const { subtotal, shipping } = cartTotal;

  const handleStartCheckout = async () => {
    setIsBtnLoading(true);
    const isUserAuth = await checkAuthStatus();
    setIsBtnLoading(false);

    if (!isUserAuth) {
      setVisible(false);
      history.push('/login?from=cart');
    } else {
      setShowCheckout(true);
    }
  };

  const handleCancelCheckout = (resetFields: () => void) => {
    resetFields();
    setShowCheckout(false);
  };

  return (
    <SummarySpace
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 40,
      }}
      layout='position'
      exit={{ x: -250, opacity: 0, transition: { duration: 0.3 } }}
    >
      <div>
        <Text>Subtotal: </Text>
        <NumberFormat
          className='number-color'
          value={subtotal}
          displayType='text'
          thousandSeparator
          prefix='$ '
          suffix=' MXN'
        />
      </div>
      <div>
        <Text>Envío: </Text>
        <NumberFormat
          className='number-color'
          value={shipping}
          displayType='text'
          thousandSeparator
          prefix='$ '
          suffix=' MXN'
        />
      </div>
      <div>
        <Text>Total: </Text>
        <NumberFormat
          className='number-color'
          value={subtotal + shipping}
          displayType='text'
          thousandSeparator
          prefix='$ '
          suffix=' MXN'
        />
      </div>
      <AnimatePresence>
        {!showCheckout && (
          <BuyButtonSpace
            key='checkout-space'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0.75,
              scale: 0,
              transition: { duration: 0.25 },
            }}
          >
            <Button
              loading={isBtnLoading}
              onClick={handleStartCheckout}
              type='primary'
            >
              Proceder al pago
            </Button>
          </BuyButtonSpace>
        )}
      </AnimatePresence>

      <div className='shipping-disclaimer'>
        <Text type='secondary'>
          *Nota: El envío es gratuito en subtotales mayores o iguales $ 250.00
          MXN
        </Text>
      </div>

      <AnimatePresence>
        {showCheckout && (
          <CheckoutSpace
            key='checkout-space'
            layout
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0.75,
              scale: 0,
              transition: { duration: 0.25 },
            }}
          >
            <CheckoutForm
              handleCancelCheckout={handleCancelCheckout}
              onSubmit={onSubmit}
            />
          </CheckoutSpace>
        )}
      </AnimatePresence>
    </SummarySpace>
  );
};

export default Summary;
