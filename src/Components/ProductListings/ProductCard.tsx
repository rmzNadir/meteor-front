/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useCallback, useState } from 'react';
import { Image, Typography, Button, InputNumber, message, Tooltip } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import NumberFormat from 'react-number-format';
import { ProductInfo, Card, CardTitle } from './styles';
import theme from '../../Utils/theme';
import { IProduct } from '../../Types';
import { useCartCTX } from '../../Utils/CartContext';
import Capitalize from '../../Utils/Capitalize';
import IMG_FALLBACK from '../../Utils/IMG_FALLBACK';

const { Meta } = Card;
const { Paragraph, Text } = Typography;

interface Props {
  loadingProducts: boolean;
  productInfo: IProduct;
  index: number;
  handleShowDetails: (id: number) => void;
}

const ProductCard = ({
  loadingProducts,
  productInfo,
  index,
  handleShowDetails,
}: Props) => {
  const {
    id,
    name,
    image,
    price,
    description,
    has_free_shipping,
    shipping_cost,
    stock,
  } = productInfo;

  const [selectedAmount, setSelectedAmount] = useState(stock >= 1 ? 1 : 0);
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
    <>
      <Card
        loading={loadingProducts}
        className='reveal-scale-up'
        data-reveal-delay={index * 50}
        hoverable
        actions={[
          <Button
            type='link'
            key={`${id}-add-to-cart`}
            block
            style={{ height: '2.25rem' }}
            onClick={() => handleAddToCart()}
            disabled={stock < 1 || selectedAmount < 1}
          >
            Agregar al carrito
            <ShoppingCartOutlined />
          </Button>,
        ]}
        cover={
          <Image
            onClick={() => handleShowDetails(id)}
            alt={name}
            src={loadingProducts ? IMG_FALLBACK : image?.url || IMG_FALLBACK}
            preview={false}
            fallback={IMG_FALLBACK}
            style={{
              objectFit: 'cover',
              height: '190px',
              borderBottom: `2px solid ${theme.colors.primary}`,
            }}
          />
        }
      >
        <div className='card-body'>
          <Meta
            title={
              <CardTitle>
                <Text ellipsis={{ tooltip: Capitalize(name) }}>
                  {Capitalize(name)}
                </Text>
                <Tooltip title='Ver más' zIndex={999}>
                  <Button
                    type='primary'
                    shape='circle'
                    size='small'
                    onClick={() => handleShowDetails(id)}
                  >
                    <EyeOutlined />
                  </Button>
                </Tooltip>
              </CardTitle>
            }
            description={
              <div>
                <Paragraph
                  ellipsis={{
                    rows: 2,
                  }}
                >
                  {Capitalize(description)}
                </Paragraph>
                <ProductInfo>
                  <div>Costo</div>
                  <NumberFormat
                    value={price}
                    displayType='text'
                    thousandSeparator
                    prefix='$ '
                    suffix=' MXN'
                  />
                  <div>Envío gratis</div>
                  {has_free_shipping ? (
                    <CheckCircleOutlined
                      style={{
                        color: theme.colors.success,
                        fontSize: '1rem',
                      }}
                    />
                  ) : (
                    <CloseCircleOutlined
                      style={{
                        color: theme.colors.error,
                        fontSize: '1rem',
                      }}
                    />
                  )}
                  <div>Costo de Envío</div>
                  <NumberFormat
                    value={shipping_cost}
                    displayType='text'
                    thousandSeparator
                    prefix='$ '
                    suffix=' MXN'
                  />
                  <div>Disponibles</div>
                  <NumberFormat
                    value={stock}
                    displayType='text'
                    thousandSeparator
                  />
                  <div>Cantidad</div>
                  <InputNumber
                    min={stock < 1 ? 0 : 1}
                    max={stock}
                    value={selectedAmount}
                    disabled={stock < 1}
                    size='small'
                    onChange={setSelectedAmount}
                    style={{ maxWidth: '3.45rem' }}
                  />
                </ProductInfo>
              </div>
            }
          />
        </div>
      </Card>
    </>
  );
};

export default ProductCard;
