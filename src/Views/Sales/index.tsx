import { useState, useCallback, useEffect, useRef } from 'react';
import { message, Tabs } from 'antd';
import Dashboard from '../../Components/Dashboard';

import { IPagination, ISaleRecord } from '../../Types';
import Amogus from '../../Utils/Amogus';
import CollapseProvider from '../../Utils/CollapseContext';
import SalesHistory from './SalesHistory';
import SalesDashboard from './SalesDashboard';
import { useAuthCTX } from '../../Utils/AuthContext';

const { TabPane } = Tabs;

const DEF_PAGINATION = {
  per_page: 10,
  page: 1,
};

const Sales = () => {
  const [loading, setLoading] = useState(false);
  const [sales, setSales] = useState<ISaleRecord[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [paginationParams, setPaginationParams] =
    useState<IPagination>(DEF_PAGINATION);

  const renders = useRef(0);
  const { isAdmin } = useAuthCTX();

  const setData = (salesdata: ISaleRecord[]) => {
    setSales(salesdata);
    setLoading(false);
  };

  const getProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(
        paginationParams as unknown as Record<string, string>
      );
      const [res] = await Amogus(
        {
          method: 'GET',
          url: `/sales/?${params}`,
        },
        false
      );

      const {
        data,
        headers: { total },
      } = res;

      // Yet another guetto workaround, in this case it helps avoid the ugly stuttering animation on 1st renders
      if (renders.current <= 1) {
        setTimeout(() => {
          setData(data);
        }, 250);
      } else {
        setData(data);
      }

      setTotalRecords(total);
    } catch (e) {
      setLoading(false);

      message.error('Ocurrió un error al cargar el historial de ventas');
    }
  }, [paginationParams]);

  useEffect(() => {
    renders.current += 1;
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationParams]);

  const handleSearchbar = (value: string) => {
    const trimmed = value.trim();
    setPaginationParams((p) => ({ ...p, q: trimmed, page: 1 }));
  };

  return (
    <CollapseProvider>
      <Dashboard selectedKeys='sales' sectionName='Ventas' clientView>
        <Tabs defaultActiveKey={isAdmin ? 'dashboard' : 'table'}>
          {isAdmin && (
            <TabPane tab='Dashboard' key='dashboard'>
              <SalesDashboard />
            </TabPane>
          )}
          <TabPane tab='Historial' key='table'>
            <SalesHistory
              setPaginationParams={setPaginationParams}
              paginationParams={paginationParams}
              loading={loading}
              handleSearchbar={handleSearchbar}
              totalRecords={totalRecords}
              sales={sales}
            />
          </TabPane>
        </Tabs>
      </Dashboard>
    </CollapseProvider>
  );
};

export default Sales;
