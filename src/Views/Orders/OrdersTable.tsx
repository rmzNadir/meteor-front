import { ComponentType } from 'react';
import { Table, Spin, Tooltip, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import NumberFormat from 'react-number-format';
import { EyeOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { useCollapseCTX } from '../../Utils/CollapseContext';
import { IPagination, ISaleProduct, ISaleRecord } from '../../Types';
import { Actions } from './styles';

interface ISalesTable extends ISaleRecord {
  action?: ComponentType;
}

interface Props {
  orders: ISaleRecord[] | undefined;
  setPaginationParams: React.Dispatch<React.SetStateAction<IPagination>>;
  totalRecords: number | undefined;
  loadingOrders: boolean;
  paginationParams: IPagination;
}

const OrdersTable = ({
  orders,
  setPaginationParams,
  totalRecords,
  loadingOrders,
  paginationParams,
}: Props) => {
  const { isCollapsing } = useCollapseCTX();
  const history = useHistory();

  const columns: ColumnsType<ISalesTable> = [
    // {
    //   title: 'Usuario',
    //   dataIndex: 'user',
    //   key: 'user',
    //   align: 'center',
    //   render: (d) => d.name,
    // },
    {
      title: 'No. de Orden',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (d) => (
        <NumberFormat value={d} displayType='text' thousandSeparator />
      ),
    },
    {
      title: 'Productos',
      dataIndex: 'products',
      key: 'products',
      align: 'center',
      render: (d: ISaleProduct[]) =>
        d.reduce((acc, cur) => cur.quantity + acc, 0),
    },
    {
      title: 'Subtotal',
      dataIndex: 'subtotal',
      key: 'subtotal',
      align: 'center',
      render: (d) => (
        <NumberFormat
          value={d}
          displayType='text'
          thousandSeparator
          prefix='$ '
          suffix=' MXN'
        />
      ),
    },
    {
      title: 'Envío',
      dataIndex: 'shipping_total',
      key: 'shipping_total',
      align: 'center',
      render: (d) => (
        <NumberFormat
          value={d}
          displayType='text'
          thousandSeparator
          prefix='$ '
          suffix=' MXN'
        />
      ),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      align: 'center',
      render: (d) => (
        <NumberFormat
          value={d}
          displayType='text'
          thousandSeparator
          prefix='$ '
          suffix=' MXN'
        />
      ),
    },
    {
      title: 'Dirección de envío',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
    },
    {
      title: 'Método de pago',
      dataIndex: 'payment_method',
      key: 'payment_method',
      align: 'center',
      render: (d) => {
        switch (d) {
          case 'credit_card':
            return 'Tarjeta de crédito';
          case 'debit_card':
            return 'Tarjeta de débito';
          default:
            return '-';
        }
      },
    },
    {
      title: 'Tarjeta',
      dataIndex: 'payment_info',
      key: 'payment_info',
      align: 'center',
    },
    {
      title: 'Fecha',
      dataIndex: 'created_at',
      key: 'created_at',
      align: 'center',
      render: (d: Date) => (d ? moment(d).format('DD/MM/yy, hh:mm a') : '-'),
    },
    {
      title: '',
      dataIndex: '',
      fixed: 'right',
      width: 'max-content',
      render: (_a: undefined, r: ISaleRecord) => (
        <Actions>
          <Tooltip title='Ver'>
            <Button
              type='primary'
              shape='circle'
              icon={<EyeOutlined />}
              onClick={() => history.push(`/orders/${r.id}`)}
            />
          </Tooltip>
        </Actions>
      ),
    },
  ];

  return (
    <Spin spinning={loadingOrders}>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey='id'
        scroll={{ x: isCollapsing ? undefined : 'max-content' }}
        pagination={{
          defaultPageSize: 10,
          defaultCurrent: 1,
          showSizeChanger: true,
          pageSizeOptions: ['10', '25', '50', '100'],
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} de ${total} pedidos`,
          total: totalRecords,
          current: paginationParams.page,
        }}
        onChange={({ current, pageSize }) => {
          setPaginationParams({
            per_page: pageSize || 10,
            page: current || 1,
          });
        }}
      />
    </Spin>
  );
};

export default OrdersTable;
