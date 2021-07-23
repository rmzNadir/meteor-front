/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react';
import { Typography, InputNumber, Button, Popconfirm } from 'antd';

import NumberFormat from 'react-number-format';
import { ICartItem } from '../../Types';
import Capitalize from '../../Utils/Capitalize';
import {
  CartItemWrapper,
  Image,
  TopInfo,
  ProductInfo,
  BottomInfo,
} from './styles';
import IMG_FALLBACK from '../../Utils/IMG_FALLBACK';

interface Props {
  item: ICartItem;
  setCartItems: React.Dispatch<React.SetStateAction<ICartItem[]>>;
  disabled: boolean;
}

const { Text, Paragraph } = Typography;

const CartItem = ({ item, setCartItems, disabled }: Props) => {
  const { name, image, price, description, quantity, stock, id } = item;

  const handleChangeQuantity = useCallback((value: number) => {
    setCartItems((cI) =>
      cI.map((i) => (i.id === id ? { ...i, quantity: value } : i))
    );
  }, []);

  const handleRemoveProduct = useCallback(() => {
    setCartItems((cI) => cI.filter((i) => i.id !== id));
  }, []);

  return (
    <CartItemWrapper
      key={id}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 40,
      }}
      layout='position'
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, x: 250, transition: { duration: 0.3 } }}
    >
      <TopInfo>
        <Image src={image?.url} alt='' fallback={IMG_FALLBACK} />
        <ProductInfo>
          <Text>{Capitalize(name)}</Text>
          <Paragraph
            ellipsis={{
              rows: 2,
            }}
          >
            {Capitalize(description)}
          </Paragraph>
          <NumberFormat
            value={price}
            displayType='text'
            thousandSeparator
            prefix='$ '
            suffix=' MXN'
          />
          <div>
            Existencias:{' '}
            <NumberFormat value={stock} displayType='text' thousandSeparator />
          </div>
        </ProductInfo>
      </TopInfo>
      <BottomInfo>
        <div>
          <span>Cantidad:</span>
          <InputNumber
            min={1}
            max={stock}
            value={quantity}
            disabled={stock < 1 || disabled}
            size='small'
            onChange={handleChangeQuantity}
            style={{ maxWidth: '3.45rem' }}
          />
        </div>
        {disabled ? (
          <Button type='link' danger disabled>
            Eliminar
          </Button>
        ) : (
          <Popconfirm
            placement='left'
            title='¿Estás seguro?'
            onConfirm={handleRemoveProduct}
            okText='Sí'
          >
            <Button type='link' danger>
              Eliminar
            </Button>
          </Popconfirm>
        )}
      </BottomInfo>
    </CartItemWrapper>
  );
};

export default CartItem;
