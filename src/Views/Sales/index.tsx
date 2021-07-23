import { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import Dashboard from '../../Components/Dashboard';
import CollapseProvider from '../../Utils/CollapseContext';
import SalesHistory from './SalesHistory';
import SalesDashboard from './SalesDashboard';
import { useAuthCTX } from '../../Utils/AuthContext';
import { getStorage, setStorage } from '../../Utils/Storage';

const { TabPane } = Tabs;

const Sales = () => {
  const { isAdmin } = useAuthCTX();
  const [tab, setTab] = useState(isAdmin ? 'dashboard' : 'table');

  useEffect(() => {
    const lsTab = getStorage('dashboardTab');
    if (!Array.isArray(lsTab)) {
      setTab(lsTab);
    }
  }, []);

  const handleTabChange = (activeKey: string) => {
    setStorage('dashboardTab', activeKey);
    setTab(activeKey);
  };

  return (
    <CollapseProvider>
      <Dashboard selectedKeys='sales' sectionName='Ventas' clientView>
        {/* {isAdmin ? 'dashboard' : 'table'} */}
        <Tabs onChange={handleTabChange} activeKey={tab}>
          {isAdmin && (
            <TabPane tab='Dashboard' key='dashboard'>
              <SalesDashboard />
            </TabPane>
          )}
          <TabPane tab='Historial' key='table'>
            <SalesHistory />
          </TabPane>
        </Tabs>
      </Dashboard>
    </CollapseProvider>
  );
};

export default Sales;
