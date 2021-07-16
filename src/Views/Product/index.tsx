/* eslint-disable no-multi-assign */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState, useCallback } from 'react';
import {
  message,
  Divider,
  Typography,
  List,
  Button,
  Spin,
  Modal,
  Image as AntImage,
} from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import {
  CaretRightFilled,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import NumberFormat from 'react-number-format';
import { useMediaQuery } from 'beautiful-react-hooks';
import axios from 'axios';
import Dashboard from '../../Components/Dashboard';
import {
  Title,
  ProductSpace,
  Wrapper,
  InfoSpace,
  CardSpace,
  Actions,
  Details,
  ItemTitle,
  ItemInfo,
  DetailsVertical,
  ImageWrapper,
} from './styles';
import Amogus from '../../Utils/Amogus';
import {
  IDeleteProduct,
  INewProductTemp,
  IParams,
  IProduct,
} from '../../Types';
import GetPlatformIcon from '../../Utils/GetPlatformIcon';
import theme from '../../Utils/theme';
import Capitalize from '../../Utils/Capitalize';
import MissingImage from '../../Components/MissingImage';
import ProductForm from '../Products/ProductForm';
import DisplayErrors from '../../Utils/DisplayErrors';
import ToFormValues from '../../Utils/ToFormValues';

const { Paragraph, Text } = Typography;

const Product = () => {
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [productInfo, setProductInfo] = useState<IProduct>();
  const [imgLoading, setImgLoading] = useState(true);
  const [missingImage, setShowMissingImg] = useState(false);
  const [edit, setEdit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialValues, setInitialValues] = useState<INewProductTemp>();

  const laptop = useMediaQuery('(min-width: 1024px)');
  const controls = useAnimation();

  const { id }: IParams = useParams();
  const history = useHistory();

  const {
    image,
    name,
    description,
    languages,
    platforms,
    provider,
    price,
    stock,
    has_free_shipping,
    shipping_cost,
  } = {
    ...productInfo,
  };

  const getProduct = useCallback(async () => {
    setLoadingProduct(true);
    try {
      const [prodRes] = await Amogus({
        method: 'GET',
        url: `/products/${id}}`,
      });

      if (!prodRes.success && prodRes.msg === 'Product not found') {
        return history.push('/404');
      }

      const { product: dProd } = prodRes;

      setProductInfo(dProd);
    } catch (e) {
      message.error('Ocurrió un error al cargar el producto');
    }
    setLoadingProduct(false);
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteProduct = async () => {
    try {
      const {
        data: { success },
      } = await axios.delete<IDeleteProduct>(`/products/${id}`);

      if (success) {
        message.success('El producto fue eliminado satisfactoriamente');
        history.push('/products');
      } else {
        message.error('Ocurrió un error al eliminar el producto');
      }
    } catch (e) {
      message.error('Ocurrió un error al eliminar el producto');
    }
  };

  const handleConfirmDelete = () => {
    Modal.confirm({
      title: '¿Estás seguro?',
      icon: <ExclamationCircleOutlined />,
      content:
        'Esta acción es irreversible, haciendo imposible la recuperación de este registro.',
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      centered: true,
      maskClosable: true,
      onOk: handleDeleteProduct,
      onCancel: () => {},
    });
  };

  const submitEdit = async (values: FormData) => {
    setIsSubmitting(true);
    try {
      const {
        data: { success, product, errors },
      } = await axios.patch(`/products/${id}`, values);

      setIsSubmitting(false);

      if (success) {
        // Update initial values in case the user wants to make a new edit
        setInitialValues(ToFormValues(product));
        setProductInfo(product);
        setEdit(false);
        message.success('El producto ha sido actualizado correctamente');
      }

      if (errors) {
        DisplayErrors(errors);
      }
    } catch (e) {
      message.error('Algo salió mal, por favor intenta de nuevo');
      setIsSubmitting(false);
    }
    return true;
  };

  return (
    <Dashboard selectedKeys='products' sectionName='Productos'>
      <Wrapper>
        <ProductSpace>
          <ImageWrapper>
            {(!imgLoading && (missingImage || !image) && (
              <MissingImage style={{ paddingLeft: '2rem' }} />
            )) || (
              <AnimatePresence>
                <motion.div
                  animate={controls}
                  initial={{ opacity: 0 }}
                  key={image?.url}
                >
                  <AntImage
                    preview={{
                      mask: <EyeOutlined style={{ fontSize: 25 }} />,
                    }}
                    src={image?.url}
                    onLoad={() => {
                      setImgLoading(false);
                      controls.start(() => ({
                        opacity: 1,
                        transition: { duration: 0.35 },
                      }));
                    }}
                    onError={() => {
                      setImgLoading(false);
                      setShowMissingImg(true);
                      message.error(
                        'Ocurrió un error al cargar la imagen del producto'
                      );
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            )}
          </ImageWrapper>
          {laptop && <Divider type='vertical' className='product-divider-1' />}
          <Spin spinning={loadingProduct}>
            <InfoSpace>
              <Title level={1} style={{ margin: 0 }}>
                {name && Capitalize(name)}
              </Title>
              <Title level={5} style={{ margin: '0.25rem 0 1rem' }}>
                {provider && Capitalize(provider)}
              </Title>
              <Paragraph className='product-description' type='secondary'>
                {description}
              </Paragraph>
              <DetailsVertical>
                <div>
                  <ItemTitle strong>Precio</ItemTitle>
                  <ItemInfo>
                    <NumberFormat
                      value={price}
                      displayType='text'
                      thousandSeparator
                      prefix='$ '
                      suffix=' MXN'
                    />
                  </ItemInfo>
                </div>
                <div>
                  <ItemTitle strong>Existencias</ItemTitle>
                  <ItemInfo>
                    <NumberFormat
                      value={stock}
                      displayType='text'
                      thousandSeparator
                    />
                  </ItemInfo>
                </div>
              </DetailsVertical>
              <Details>
                <ItemTitle strong>Envío gratis</ItemTitle>
                <ItemInfo>
                  {has_free_shipping ? (
                    <CheckCircleOutlined
                      style={{ color: theme.colors.success, fontSize: '1rem' }}
                    />
                  ) : (
                    <CloseCircleOutlined
                      style={{ color: theme.colors.error, fontSize: '1rem' }}
                    />
                  )}
                </ItemInfo>
                {!has_free_shipping && (
                  <>
                    <ItemTitle strong>Costo de envío</ItemTitle>
                    <ItemInfo>
                      <NumberFormat
                        value={shipping_cost}
                        displayType='text'
                        thousandSeparator
                        prefix='$ '
                        suffix=' MXN'
                      />
                    </ItemInfo>
                  </>
                )}
              </Details>
              <CardSpace>
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
              </CardSpace>
            </InfoSpace>
          </Spin>
          <Divider className='product-divider-2' />

          {productInfo && (
            <Actions>
              <Button
                type='primary'
                icon={<EditOutlined />}
                onClick={() => {
                  // Initialize the initial values, yeah... lol
                  !initialValues && setInitialValues(ToFormValues(productInfo));
                  setEdit(true);
                }}
              >
                Editar
              </Button>
              <Button
                type='primary'
                danger
                icon={<DeleteOutlined />}
                onClick={handleConfirmDelete}
              >
                Eliminar
              </Button>
              <ProductForm
                visible={edit}
                setVisible={setEdit}
                isSubmitting={isSubmitting}
                onSubmit={submitEdit}
                initialValues={initialValues}
                isEdit
              />
            </Actions>
          )}
        </ProductSpace>
      </Wrapper>
    </Dashboard>
  );
};

export default Product;
