import {
  CaretRightFilled,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import {
  Modal,
  Image,
  Typography,
  List,
  Button,
  Tooltip,
  InputNumber,
  message,
} from 'antd';
import { useCallback, useState } from 'react';
import NumberFormat from 'react-number-format';
import { useHistory } from 'react-router-dom';
import { IProduct } from '../../Types';
import { useAuthCTX } from '../../Utils/AuthContext';
import Capitalize from '../../Utils/Capitalize';
import { useCartCTX } from '../../Utils/CartContext';
import GetPlatformIcon from '../../Utils/GetPlatformIcon';
import IMG_FALLBACK from '../../Utils/IMG_FALLBACK';
import theme from '../../Utils/theme';
import { Actions, DetailsWrapper, ExtraInfoGrid, InfoGrid } from './styles';

interface Props {
  data: IProduct;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const { Title, Paragraph, Text } = Typography;

const ProductDetails = ({ data, visible, setVisible }: Props) => {
  const {
    image,
    name,
    provider,
    description,
    price,
    stock,
    has_free_shipping,
    shipping_cost,
    languages,
    platforms,
    id,
  } = data;

  const [selectedAmount, setSelectedAmount] = useState(stock >= 1 ? 1 : 0);
  const history = useHistory();
  const { isClientUser } = useAuthCTX();
  const { cartItems, setCartItems } = useCartCTX();

  const handleAddToCart = useCallback(() => {
    const itemIndex = cartItems.findIndex((i) => i.id === id);
    let newItems = [...cartItems];

    if (itemIndex === -1) {
      newItems = [
        ...newItems,
        {
          id,
          quantity: selectedAmount,
          name,
          price,
          image,
          description,
          stock,
          shipping_cost,
        },
      ];
      message.success(`${Capitalize(name)} agregado al carrito`);
    } else {
      const newAmount = newItems[itemIndex].quantity + selectedAmount;
      if (newAmount > stock) {
        message.warning(
          'La cantidad de este producto en tu carrito no puede exceder sus existencias'
        );
      } else {
        message.success(`${Capitalize(name)} agregado al carrito`);

        newItems[itemIndex] = {
          id,
          quantity: newAmount,
          name,
          price,
          image,
          description,
          stock,
          shipping_cost,
        };
      }
    }
    setCartItems(newItems);

    setSelectedAmount(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems, selectedAmount]);

  return (
    <Modal
      bodyStyle={{ padding: 0 }}
      visible={visible}
      closable={false}
      onCancel={() => setVisible(false)}
      centered
      footer={[
        <Actions>
          <div>
            <Text style={{ marginRight: '0.5rem' }}>Cantidad</Text>
            <InputNumber
              min={stock < 1 ? 0 : 1}
              max={stock}
              value={selectedAmount}
              disabled={stock < 1}
              onChange={setSelectedAmount}
              style={{ maxWidth: '3.45rem' }}
            />
          </div>
          <Button
            type='primary'
            key={`${id}-add-to-cart`}
            onClick={() => handleAddToCart()}
            disabled={stock < 1 || selectedAmount < 1}
          >
            Agregar al carrito
            <ShoppingCartOutlined />
          </Button>
        </Actions>,
      ]}
    >
      <Image
        fallback={IMG_FALLBACK}
        src={image?.url}
        preview={{
          mask: <EyeOutlined style={{ fontSize: 25 }} />,
        }}
        style={{ height: '10rem', objectFit: 'cover' }}
      />
      <DetailsWrapper>
        <div>
          <Title level={3} style={{ margin: 0 }}>
            {name && Capitalize(name)}
          </Title>
          {isClientUser && (
            <Tooltip title='Editar/Eliminar'>
              <Button
                shape='circle'
                type='primary'
                onClick={() => history.push(`/products/${id}`)}
              >
                <SettingOutlined />
              </Button>
            </Tooltip>
          )}
        </div>
        <Title level={5} style={{ margin: '0.25rem 0 1rem' }}>
          {provider && Capitalize(provider)}
        </Title>
        <Paragraph className='product-description' type='secondary'>
          {description}
        </Paragraph>
        <InfoGrid>
          <Text>Precio:</Text>
          <NumberFormat
            value={price}
            displayType='text'
            thousandSeparator
            prefix='$ '
            suffix=' MXN'
          />
          <Text>Existencias:</Text>
          <NumberFormat value={stock} displayType='text' thousandSeparator />
          <Text>Envío gratis:</Text>
          {has_free_shipping ? (
            <CheckCircleOutlined
              style={{ color: theme.colors.success, fontSize: '1rem' }}
            />
          ) : (
            <CloseCircleOutlined
              style={{ color: theme.colors.error, fontSize: '1rem' }}
            />
          )}
          {!has_free_shipping && (
            <>
              <Text>Costo de envío</Text>
              <NumberFormat
                value={shipping_cost}
                displayType='text'
                thousandSeparator
                prefix='$ '
                suffix=' MXN'
              />
            </>
          )}
        </InfoGrid>
        <ExtraInfoGrid>
          <List
            header={<Text strong>Lenguajes</Text>}
            size='small'
            bordered
            dataSource={languages}
            renderItem={(l) => (
              <List.Item>
                <CaretRightFilled style={{ marginRight: '0.5rem' }} />
                {l.name}
              </List.Item>
            )}
          />
          <List
            header={<Text strong>Plataformas</Text>}
            size='small'
            bordered
            dataSource={platforms}
            renderItem={(p) => (
              <List.Item className='platform-list'>
                {GetPlatformIcon(p)}
                {p.name}
              </List.Item>
            )}
          />
        </ExtraInfoGrid>
      </DetailsWrapper>
    </Modal>
  );
};

export default ProductDetails;
