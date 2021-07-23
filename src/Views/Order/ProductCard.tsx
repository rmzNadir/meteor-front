/* eslint-disable jsx-a11y/anchor-is-valid */
import { Typography } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import NumberFormat from 'react-number-format';
import { useHistory } from 'react-router-dom';
import { ProductImage, OrderProduct, ProductInfo } from './styles';
import { ISaleProduct } from '../../Types';
import IMG_FALLBACK from '../../Utils/IMG_FALLBACK';

const { Text, Link } = Typography;

interface Props {
  product: ISaleProduct;
}

const ProductCard = ({ product }: Props) => {
  const history = useHistory();

  const { image, name, quantity, unit_price, id } = product;

  return (
    <OrderProduct>
      <ProductImage
        src={image?.url}
        fallback={IMG_FALLBACK}
        preview={{
          mask: <EyeOutlined style={{ fontSize: 25 }} />,
        }}
      />
      <ProductInfo>
        <Link
          style={{ marginBottom: '0.5rem' }}
          onClick={() => history.push(`/listings?id=${id}`)}
        >
          {name}
        </Link>
        <Text>
          Cantidad:&nbsp;
          <NumberFormat value={quantity} displayType='text' thousandSeparator />
        </Text>
        <Text>
          Precio unitario:&nbsp;
          <NumberFormat
            value={unit_price}
            displayType='text'
            thousandSeparator
            prefix='$ '
            suffix=' MXN'
          />
        </Text>
        <Text>
          Total producto:&nbsp;
          <NumberFormat
            value={unit_price * quantity}
            displayType='text'
            thousandSeparator
            prefix='$ '
            suffix=' MXN'
          />
        </Text>
      </ProductInfo>
    </OrderProduct>
  );
};

export default ProductCard;
