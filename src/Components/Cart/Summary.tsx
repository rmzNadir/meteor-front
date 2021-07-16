import { useState } from 'react';
import { Typography, Button } from 'antd';
import NumberFormat from 'react-number-format';
import { useHistory } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ICartTotal } from '../../Types';
import { SummarySpace, BuyButtonSpace } from './styles';

const { Text } = Typography;

interface Props {
  cartTotal: ICartTotal;
  checkAuthStatus(): Promise<boolean>;
}

const Summary = ({ cartTotal, checkAuthStatus }: Props) => {
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const history = useHistory();
  const { subtotal, shipping } = cartTotal;

  const handleStartCheckout = async () => {
    setIsBtnLoading(true);
    const isUserAuth = await checkAuthStatus();
    setIsBtnLoading(false);

    if (!isUserAuth) {
      history.push('/login?from=cart');
    }
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
          value={subtotal + shipping}
          displayType='text'
          thousandSeparator
          prefix='$ '
          suffix=' MXN'
        />
      </div>
      <BuyButtonSpace>
        <Button
          loading={isBtnLoading}
          onClick={handleStartCheckout}
          type='primary'
        >
          Proceder al pago
        </Button>
      </BuyButtonSpace>
      <AnimatePresence initial={false}>
        {shipping > 0 && (
          <motion.div
            layout='position'
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 0,
              transition: { duration: 0.25 },
            }}
          >
            <Text type='secondary'>
              *Nota: El envío es gratuito en subtotales mayores o iguales $
              250.00 MXN
            </Text>
          </motion.div>
        )}
      </AnimatePresence>
    </SummarySpace>
  );
};

export default Summary;
