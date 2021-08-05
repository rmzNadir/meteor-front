import { ComponentType } from 'react';
import moment from 'moment';
import { Table, Button, Tooltip, Typography, Spin } from 'antd';
import {
  CheckCircleFilled,
  CloseCircleFilled,
  EyeOutlined,
} from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import { ILanguage, IPlatform, IProduct } from '../../Types/Products';
import { Actions, PlatformIconSpace } from './styles';
import GetPlatformIcon from '../../Utils/GetPlatformIcon';
import { useCollapseCTX } from '../../Utils/CollapseContext';
import theme from '../../Utils/theme';
import { IPagination } from '../../Types';
import Capitalize from '../../Utils/Capitalize';

const { Text } = Typography;

interface IProductsTable extends IProduct {
  action?: ComponentType;
}

interface Props {
  products: IProduct[] | undefined;
  setPaginationParams: React.Dispatch<React.SetStateAction<IPagination>>;
  totalRecords: number | undefined;
  loadingProducts: boolean;
  paginationParams: IPagination;
}

const InventoryTable = ({
  products,
  setPaginationParams,
  totalRecords,
  loadingProducts,
  paginationParams,
}: Props) => {
  const { isCollapsing } = useCollapseCTX();

  const columns: ColumnsType<IProductsTable> = [
    {
      title: 'Producto',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (d) => Capitalize(d),
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price',
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
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
      width: 200,
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      render: (data) => (
        <Text ellipsis style={{ width: 200 }}>
          <Tooltip title={data} placement='topLeft'>
            {data}
          </Tooltip>
        </Text>
      ),
    },
    {
      title: 'Disponibles',
      dataIndex: 'stock',
      key: 'stock',
      align: 'center',
    },
    {
      title: 'Plataformas',
      dataIndex: 'platforms',
      key: 'platforms',
      align: 'center',

      render: (d: IPlatform[]) => {
        if (d.length === 0) {
          return 'No Aplica';
        }

        return (
          <PlatformIconSpace>
            {d.map((p: IPlatform) => (
              <Tooltip title={p.name} key={p.id}>
                {GetPlatformIcon(p)}
              </Tooltip>
            ))}
          </PlatformIconSpace>
        );
      },
    },
    {
      title: 'Lenguajes',
      dataIndex: 'languages',
      key: 'languages',
      width: 200,
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      render: (d) => {
        if (d.length === 0) {
          return 'No Aplica';
        }
        const formattedLangs = d
          .map(({ name }: ILanguage, i: number) =>
            i === d.length - 1 ? `${name}.` : `${name},`
          )
          .join(' ');

        return (
          <Text ellipsis style={{ width: 200 }}>
            <Tooltip title={formattedLangs} placement='topLeft'>
              {formattedLangs}
            </Tooltip>
          </Text>
        );
      },
    },
    {
      title: 'Distribuidor',
      dataIndex: 'provider',
      key: 'provider',
      align: 'center',
      render: (d) => Capitalize(d),
    },
    {
      title: 'Envío gratis',
      dataIndex: 'has_free_shipping',
      key: 'has_free_shipping',
      align: 'center',
      render: (d) =>
        d ? (
          <CheckCircleFilled style={{ color: theme.colors.success }} />
        ) : (
          <CloseCircleFilled style={{ color: theme.colors.error }} />
        ),
    },
    {
      title: 'Costo de envío',
      dataIndex: 'shipping_cost',
      key: 'shipping_cost',
      align: 'center',
      render: (d) =>
        d < 1 ? (
          'No aplica'
        ) : (
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
      title: 'Vendido por última vez',
      dataIndex: 'last_bought_at',
      key: 'last_bought_at',
      align: 'center',

      render: (d: Date) => (d ? moment(d).format('DD/MM/yy, hh:mm a') : '-'),
    },
    {
      title: 'Activo',
      dataIndex: 'disabled',
      key: 'disabled',
      align: 'center',
      render: (d) =>
        !d ? (
          <CheckCircleFilled style={{ color: theme.colors.success }} />
        ) : (
          <CloseCircleFilled style={{ color: theme.colors.error }} />
        ),
    },
    {
      title: '',
      dataIndex: '',
      fixed: 'right',
      width: 'max-content',
      render: (_a: undefined, r: IProduct) => (
        <Actions>
          <Tooltip title='Ver'>
            <Link to={`/products/${r.id}`}>
              <Button type='primary' shape='circle' icon={<EyeOutlined />} />
            </Link>
          </Tooltip>
        </Actions>
      ),
    },
  ];

  return (
    <Spin spinning={loadingProducts}>
      <Table
        columns={columns}
        dataSource={products}
        rowKey='id'
        scroll={{ x: isCollapsing ? undefined : 'max-content' }}
        pagination={{
          defaultPageSize: 10,
          defaultCurrent: 1,
          showSizeChanger: true,
          pageSizeOptions: ['10', '25', '50', '100'],
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} de ${total} productos`,
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

export default InventoryTable;
