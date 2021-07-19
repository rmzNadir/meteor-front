import { Tabs } from 'antd';
import Dashboard from '../../Components/Dashboard';
import CollapseProvider from '../../Utils/CollapseContext';
import SalesHistory from './SalesHistory';
import SalesDashboard from './SalesDashboard';
import { useAuthCTX } from '../../Utils/AuthContext';

const { TabPane } = Tabs;

const Sales = () => {
  const { isAdmin } = useAuthCTX();

  return (
    <CollapseProvider>
      <Dashboard selectedKeys='sales' sectionName='Ventas' clientView>
        {/* {isAdmin ? 'dashboard' : 'table'} */}
        <Tabs defaultActiveKey='table'>
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
