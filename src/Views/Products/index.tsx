import { useState, useCallback, useEffect, useRef } from 'react';
import {
  PlusOutlined,
  CheckCircleOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { Button, message, Modal, Tooltip } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import Dashboard from '../../Components/Dashboard';
import CollapseProvider from '../../Utils/CollapseContext';
import InventoryTable from './InventoryTable';
import { Title, TableTitle, HeaderSpace, Search } from './styles';
import ProductForm from './ProductForm';
import { ICards, IPagination, IProduct } from '../../Types';
import Amogus from '../../Utils/Amogus';
import Cards from './Cards';
import DisplayErrors from '../../Utils/DisplayErrors';
import theme from '../../Utils/theme';

const fileDownload = require('js-file-download');

const DEF_PAGINATION = {
  per_page: 10,
  page: 1,
};

const Products = () => {
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cards, setCards] = useState<ICards>();
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [paginationParams, setPaginationParams] =
    useState<IPagination>(DEF_PAGINATION);

  const renders = useRef(0);
  const history = useHistory();

  const setData = (prodData: IProduct[], cardsData: ICards) => {
    setProducts(prodData);
    setCards(cardsData);
  };

  const getProducts = useCallback(
    async (isDownload: boolean = false) => {
      isDownload ? setLoadingDownload(true) : setLoadingProducts(true);
      try {
        let params = new URLSearchParams(
          paginationParams as unknown as Record<string, string>
        );

        if (isDownload) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { page, per_page, ...rest } = paginationParams;
          params = new URLSearchParams({
            ...rest,
            download: 'true',
          } as unknown as Record<string, string>);
        }

        const res = await axios.get(
          `/products/?${params}`,
          isDownload ? { responseType: 'blob' } : undefined
        );

        const {
          data: prodData,
          headers: { total },
        } = res;

        if (isDownload) {
          fileDownload(
            prodData,
            `Reporte-productos-${moment().format('DD-MM-YYYY')}.xlsx`
          );
        } else {
          const [cardsRes] = await Amogus({
            method: 'GET',
            url: `/product-cards/`,
          });

          // Yet another ugly workaround, in this case it helps avoid the ugly stuttering animation on 1st renders
          if (renders.current <= 1) {
            setTimeout(() => {
              setData(prodData, cardsRes?.cards);
            }, 250);
          } else {
            setData(prodData, cardsRes?.cards);
          }
        }

        setTotalRecords(total);
      } catch (e) {
        message.error('Ocurrió un error al cargar el catálogo de productos');
      }
      isDownload ? setLoadingDownload(false) : setLoadingProducts(false);
    },
    [paginationParams]
  );

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

  const handleSearchbar = (value: string) => {
    const trimmed = value.trim();
    setPaginationParams((p) => ({ ...p, q: trimmed, page: 1 }));
  };

  const handleSearchbarChange = (value: string) => {
    !value && setPaginationParams((p) => ({ ...p, q: value.trim(), page: 1 }));
  };

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

        <HeaderSpace>
          <Tooltip title='Descargar reporte'>
            <Button
              shape='circle'
              type='primary'
              loading={loadingDownload}
              disabled={totalRecords < 1}
              icon={<DownloadOutlined />}
              onClick={() => getProducts(true)}
            />
          </Tooltip>
          <Search
            className='search-input'
            placeholder='Buscar productos'
            enterButton
            onSearch={handleSearchbar}
            onChange={({ target }) => handleSearchbarChange(target.value)}
            allowClear
            loading={loadingProducts}
          />
        </HeaderSpace>

        <InventoryTable
          loadingProducts={loadingProducts}
          products={products}
          setPaginationParams={setPaginationParams}
          totalRecords={totalRecords}
          paginationParams={paginationParams}
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
