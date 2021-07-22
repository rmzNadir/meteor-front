import { useState, useCallback, useEffect, useRef } from 'react';
import { Button, message, Tooltip } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { DownloadOutlined } from '@ant-design/icons';
import Dashboard from '../../Components/Dashboard';
import OrdersTable from './OrdersTable';
import { HeaderSpace, Title, Search } from './styles';
import { IPagination, ISaleRecord } from '../../Types';
import CollapseProvider from '../../Utils/CollapseContext';

const fileDownload = require('js-file-download');

const DEF_PAGINATION = {
  per_page: 10,
  page: 1,
};

const Orders = () => {
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [orders, setOrders] = useState<ISaleRecord[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [paginationParams, setPaginationParams] =
    useState<IPagination>(DEF_PAGINATION);

  const renders = useRef(0);

  const getOrders = useCallback(
    async (isDownload: boolean = false) => {
      isDownload ? setLoadingDownload(true) : setLoadingOrders(true);
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
          `/orders/?${params}`,
          isDownload ? { responseType: 'blob' } : undefined
        );

        const {
          data: orderData,
          headers: { total },
        } = res;

        if (isDownload) {
          fileDownload(
            orderData,
            `Historial-de-pedidos-${moment().format('DD-MM-YYYY')}.xlsx`
          );
          // Yet another ugly workaround, in this case it helps avoid the ugly stuttering animation on 1st renders
        } else if (renders.current <= 1) {
          setTimeout(() => {
            setOrders(orderData);
          }, 250);
        } else {
          setOrders(orderData);
        }

        setTotalRecords(total);
      } catch (e) {
        message.error('Ocurrió un error al cargar la lista de pedidos');
      }
      isDownload ? setLoadingDownload(false) : setLoadingOrders(false);
    },
    [paginationParams]
  );

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
          <Tooltip title='Descargar historial de pedidos'>
            <Button
              shape='circle'
              type='primary'
              loading={loadingDownload}
              disabled={totalRecords < 1}
              icon={<DownloadOutlined />}
              onClick={() => getOrders(true)}
            />
          </Tooltip>
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
