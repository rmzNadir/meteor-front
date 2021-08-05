import { ComponentType } from 'react';
import { Table, Spin, Tooltip, Button, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import NumberFormat from 'react-number-format';
import { EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useCollapseCTX } from '../../Utils/CollapseContext';
import { IPagination, ISaleProduct, ISaleRecord } from '../../Types';
import { Actions } from './styles';

interface ISalesTable extends ISaleRecord {
  action?: ComponentType;
}

interface Props {
  sales: ISaleRecord[] | undefined;
  setPaginationParams: React.Dispatch<React.SetStateAction<IPagination>>;
  totalRecords: number | undefined;
  loading: boolean;
  paginationParams: IPagination;
}

const { Text } = Typography;

const SalesTable = ({
  sales,
  setPaginationParams,
  paginationParams,
  totalRecords,
  loading,
}: Props) => {
  const { isCollapsing } = useCollapseCTX();

  const columns: ColumnsType<ISalesTable> = [
    {
      title: 'Usuario',
      dataIndex: 'user',
      key: 'user',
      width: 200,
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      render: (d) => `${d.name} ${d.last_name}`,
    },
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
      width: 300,
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      render: (d) => (
        <Text ellipsis style={{ width: 200 }}>
          <Tooltip title={d} placement='topLeft'>
            {d}
          </Tooltip>
        </Text>
      ),
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
            <Link to={`/sales/${r.id}`}>
              <Button type='primary' shape='circle' icon={<EyeOutlined />} />
            </Link>
          </Tooltip>
        </Actions>
      ),
    },
  ];

  return (
    <Spin spinning={loading}>
      <Table
        columns={columns}
        dataSource={sales}
        rowKey='id'
        scroll={{ x: isCollapsing ? undefined : 'max-content' }}
        pagination={{
          defaultPageSize: 10,
          defaultCurrent: 1,
          showSizeChanger: true,
          pageSizeOptions: ['10', '25', '50', '100'],
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} de ${total} ventas`,
          total: totalRecords,
          current: paginationParams.page,
        }}
        onChange={({ current, pageSize }) => {
          setPaginationParams((p) => ({
            ...p,
            per_page: pageSize || 10,
            page: current || 1,
          }));
        }}
      />
    </Spin>
  );
};

export default SalesTable;
