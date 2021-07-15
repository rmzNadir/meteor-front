import { Typography, Button } from 'antd';
import NumberFormat from 'react-number-format';
import { ICartTotal } from '../../Types';
import { SummarySpace, BuyButtonSpace } from './styles';

const { Text } = Typography;

interface Props {
  cartTotal: ICartTotal;
}

const Summary = ({ cartTotal }: Props) => {
  const { subtotal, shipping } = cartTotal;

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
        <Button type='primary'>Proceder al pago</Button>
      </BuyButtonSpace>
      {shipping > 0 && (
        <div>
          <Text type='secondary'>
            *Nota: El envío es gratuito en subtotales mayores o iguales $ 250.00
            MXN
          </Text>
        </div>
      )}
    </SummarySpace>
  );
};

export default Summary;
