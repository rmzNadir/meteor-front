import { useState, useCallback, useEffect, useRef } from 'react';
import { message } from 'antd';
import Dashboard from '../../Components/Dashboard';
import OrdersTable from './OrdersTable';
import { HeaderSpace, Title, Search } from './styles';
import { IPagination, ISaleRecord } from '../../Types';
import Amogus from '../../Utils/Amogus';
import CollapseProvider from '../../Utils/CollapseContext';

const DEF_PAGINATION = {
  per_page: 10,
  page: 1,
};

const Orders = () => {
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [orders, setOrders] = useState<ISaleRecord[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>();
  const [paginationParams, setPaginationParams] =
    useState<IPagination>(DEF_PAGINATION);

  const renders = useRef(0);

  const setData = (orderData: ISaleRecord[]) => {
    setOrders(orderData);
    setLoadingOrders(false);
  };

  const getOrders = useCallback(async () => {
    setLoadingOrders(true);
    try {
      const params = new URLSearchParams(
        paginationParams as unknown as Record<string, string>
      );
      const [orderRes] = await Amogus(
        {
          method: 'GET',
          url: `/orders/?${params}`,
        },
        false
      );

      const {
        data: orderData,
        headers: { total },
      } = orderRes;

      // Yet another guetto workaround, in this case it helps avoid the ugly stuttering animation on 1st renders
      if (renders.current <= 1) {
        setTimeout(() => {
          setData(orderData);
        }, 250);
      } else {
        setData(orderData);
      }

      setTotalRecords(total);
    } catch (e) {
      setLoadingOrders(false);

      message.error('Ocurrió un error al cargar el catálogo de productos');
    }
  }, [paginationParams]);

  useEffect(() => {
    renders.current += 1;
    getOrders();
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
      <Dashboard selectedKeys='orders' sectionName='Mis Pedidos'>
        <Title level={3}>Últimos pedidos</Title>
        <HeaderSpace>
          <Search
            className='search-input'
            placeholder='Buscar pedidos'
            enterButton
            onSearch={handleSearchbar}
            onChange={({ target }) => handleSearchbarChange(target.value)}
            allowClear
            loading={loadingOrders}
          />
        </HeaderSpace>

        <OrdersTable
          loadingOrders={loadingOrders}
          orders={orders}
          setPaginationParams={setPaginationParams}
          totalRecords={totalRecords}
          paginationParams={paginationParams}
        />
      </Dashboard>
    </CollapseProvider>
  );
};

export default Orders;
