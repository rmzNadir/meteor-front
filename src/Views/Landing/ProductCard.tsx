import { Image, Typography, Button, InputNumber, message } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import NumberFormat from 'react-number-format';
import { useCallback, useState } from 'react';
import { ProductInfo, Card } from './styles';
import theme from '../../Utils/theme';
import { IProduct } from '../../Types';
import { useCartCTX } from '../../Utils/CartContext';
import Capitalize from '../../Utils/Capitalize';

const { Meta } = Card;
const { Paragraph } = Typography;

const IMG_FALLBACK =
  'data:image/png;base64,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';

interface Props {
  loadingProducts: boolean;
  productInfo: IProduct;
  index: number;
}

const ProductCard = ({ loadingProducts, productInfo, index }: Props) => {
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
    let newItems;

    if (itemIndex === -1) {
      newItems = [
        ...cartItems,
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
      newItems = cartItems.map((cI) => {
        const newAmount = cI.quantity + selectedAmount;
        if (newAmount > stock) {
          message.warning(
            'La cantidad de este producto en tu carrito no puede exceder sus existencias'
          );
          return cI;
        }
        message.success(`${Capitalize(name)} agregado al carrito`);
        return cI.id === id
          ? {
              id,
              quantity: newAmount,
              name,
              price,
              image,
              description,
              stock,
              shipping_cost,
            }
          : cI;
      });
    }
    setCartItems(newItems);
    setSelectedAmount(1);
  }, [cartItems, selectedAmount]);

  return (
    <Card
      loading={loadingProducts}
      className='reveal-scale-up'
      data-reveal-delay={index * 50}
      hoverable
      actions={[
        <Button
          type='link'
          key='addToCartBtn'
          block
          style={{ height: '2.25rem' }}
          onClick={handleAddToCart}
          disabled={stock < 1 || selectedAmount < 1}
        >
          Agregar ({selectedAmount}) al carrito
          <ShoppingCartOutlined />
        </Button>,
      ]}
      cover={
        <Image
          alt={name}
          src={loadingProducts ? IMG_FALLBACK : image?.url || IMG_FALLBACK}
          preview={false}
          fallback={IMG_FALLBACK}
          style={{ objectFit: 'cover', height: '190px' }}
        />
      }
    >
      <Meta
        title={Capitalize(name)}
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
    </Card>
  );
};

export default ProductCard;
