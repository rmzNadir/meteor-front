import { useEffect, useState, useCallback } from 'react';
import { Divider, message, Space, Spin, Typography } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import { CreditCardOutlined } from '@ant-design/icons';
import Dashboard from '../../Components/Dashboard';
import Amogus from '../../Utils/Amogus';
import { IParams, ISaleRecord } from '../../Types';
import {
  InfoSpace,
  Summary,
  SummaryColumn,
  Wrapper,
  SummaryCalculations,
  ProductList,
} from './styles';
import Capitalize from '../../Utils/Capitalize';
import theme from '../../Utils/theme';
import ProductCard from './ProductCard';

const { Title, Text } = Typography;

const Order = () => {
  const [loading, setLoading] = useState(false);
  const [orderInfo, setOrderInfo] = useState<ISaleRecord>();

  const { id }: IParams = useParams();
  const history = useHistory();

  const getProduct = useCallback(async () => {
    setLoading(true);
    try {
      const [res] = await Amogus({
        method: 'GET',
        url: `/orders/${id}`,
      });

      if (!res.success && res.msg === 'Order not found') {
        return history.push('/404');
      }

      const { order } = res;

      setOrderInfo(order);
    } catch (e) {
      message.error('Ocurrió un error al cargar el pedido ');
    }
    setLoading(false);
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    created_at,
    user,
    address,
    payment_info,
    subtotal,
    shipping_total,
    total,
    products,
  } = {
    ...orderInfo,
  };

  console.log(orderInfo);

  return (
    <Dashboard selectedKeys='orders' sectionName='Mis Pedidos' clientView>
      <Spin spinning={loading}>
        <Wrapper>
          <InfoSpace>
            <Title level={3}>Información del pedido</Title>
            <Space split={<Divider type='vertical' />}>
              <Text>
                Pedido el {moment(created_at).format('DD [de] MMMM [de] YYYY')}
              </Text>
              <Text>Pedido No. {id}</Text>
            </Space>
            <Summary>
              <SummaryColumn>
                <Text strong>Dirección de envío</Text>
                <Text>
                  {user?.name && Capitalize(user?.name)}{' '}
                  {user?.last_name && Capitalize(user?.last_name)}
                </Text>
                <Text>{address && Capitalize(address)}</Text>
              </SummaryColumn>
              <SummaryColumn>
                <Text strong>Método de pago</Text>
                <Text>
                  <CreditCardOutlined
                    style={{ color: theme.colors.primary, fontSize: '18px' }}
                  />
                  &nbsp;&nbsp;
                  {`**** ${payment_info}`}
                </Text>
              </SummaryColumn>
              <SummaryColumn>
                <Text strong>Resumen del pedido</Text>
                <SummaryCalculations>
                  <Text>Subtotal:</Text>
                  <NumberFormat
                    value={subtotal}
                    displayType='text'
                    thousandSeparator
                    prefix='$ '
                    suffix=' MXN'
                  />
                  <Text>Envío:</Text>
                  <NumberFormat
                    value={shipping_total}
                    displayType='text'
                    thousandSeparator
                    prefix='$ '
                    suffix=' MXN'
                  />
                  <Text strong className='order-total'>
                    Total:
                  </Text>
                  <NumberFormat
                    className='order-total'
                    value={total}
                    displayType='text'
                    thousandSeparator
                    prefix='$ '
                    suffix=' MXN'
                  />
                </SummaryCalculations>
              </SummaryColumn>
            </Summary>
            <ProductList>
              {products?.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </ProductList>
          </InfoSpace>
        </Wrapper>
      </Spin>
    </Dashboard>
  );
};

export default Order;
