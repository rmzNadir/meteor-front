import { useState, useCallback, useEffect, useRef } from 'react';
import { PlusOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Button, message, Modal } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Dashboard from '../../Components/Dashboard';
import CollapseProvider from '../../Utils/CollapseContext';
import InventoryTable from './InventoryTable';
import { Title, TableTitle } from './styles';
import ProductForm from './ProductForm';
import { ICards, IPagination, IProduct } from '../../Types';
import Amogus from '../../Utils/Amogus';
import Cards from './Cards';
import DisplayErrors from '../../Utils/DisplayErrors';
import theme from '../../Utils/theme';

const DEF_PAGINATION = {
  per_page: 10,
  page: 1,
};

const Products = () => {
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cards, setCards] = useState<ICards>();
  const [totalRecords, setTotalRecords] = useState<number>();
  const [paginationParams, setPaginationParams] =
    useState<IPagination>(DEF_PAGINATION);

  const renders = useRef(0);
  const history = useHistory();

  const setData = (prodData: IProduct[], cardsData: ICards) => {
    setProducts(prodData);
    setCards(cardsData);
    setLoadingProducts(false);
  };

  const getProducts = useCallback(async () => {
    setLoadingProducts(true);
    try {
      const params = new URLSearchParams(
        paginationParams as unknown as Record<string, string>
      );
      const [prodRes] = await Amogus(
        {
          method: 'GET',
          url: `/products/?${params}`,
        },
        false
      );

      const {
        data: prodData,
        headers: { total },
      } = prodRes;

      const [cardsRes] = await Amogus({
        method: 'GET',
        url: `/product-cards/`,
      });

      // Yet another guetto workaround, in this case it helps avoid the ugly stuttering animation on 1st renders
      if (renders.current <= 1) {
        setTimeout(() => {
          setData(prodData, cardsRes?.cards);
        }, 250);
      } else {
        setData(prodData, cardsRes?.cards);
      }

      setTotalRecords(total);
    } catch (e) {
      setLoadingProducts(false);

      message.error('Ocurrió un error al cargar el catálogo de productos');
    }
  }, [paginationParams]);

  const submitProduct = async (values: FormData, resetFieldsCB: () => void) => {
    setIsSubmitting(true);
    try {
      const {
        data: { success, product, errors },
      } = await axios.post('/products', values);

      setIsSubmitting(false);

      if (success) {
        resetFieldsCB();

        const { id, name } = product;

        const capitalizedName = name[0].toUpperCase() + name.slice(1);

        Modal.confirm({
          centered: true,
          maskClosable: true,
          title: `¡${capitalizedName} ha sido creado!`,
          content: '¿Deseas verlo?',
          icon: <CheckCircleOutlined style={{ color: theme.colors.success }} />,
          onOk: () => history.push(`/products/${id}`),
          onCancel: () => {},
          afterClose: () => getProducts(),
          okText: 'Ver',
          cancelText: 'Cerrar',
        });
        return true;
      }

      if (errors) {
        DisplayErrors(errors);
        return false;
      }
    } catch (e) {
      message.error('Algo salió mal, por favor intenta de nuevo');
      setIsSubmitting(false);
      return false;
    }
    return true;
  };

  useEffect(() => {
    renders.current += 1;
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationParams]);

  return (
    <CollapseProvider>
      <Dashboard selectedKeys='products' sectionName='Productos' clientView>
        <Title level={3} className='summary-title'>
          Resumen
        </Title>

        <Cards cards={cards} loadingProducts={loadingProducts} />

        <TableTitle>
          <Title level={3}>Inventario</Title>
          <Button
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => setShowForm(true)}
          >
            Nuevo
          </Button>
        </TableTitle>

        <InventoryTable
          loadingProducts={loadingProducts}
          products={products}
          setPaginationParams={setPaginationParams}
          totalRecords={totalRecords}
        />

        <ProductForm
          visible={showForm}
          setVisible={setShowForm}
          onSubmit={submitProduct}
          isSubmitting={isSubmitting}
        />
      </Dashboard>
    </CollapseProvider>
  );
};

export default Products;
