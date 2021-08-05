/* eslint-disable no-nested-ternary */
import { ComponentType } from 'react';
import { Table, Spin, Tooltip, Button, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import NumberFormat from 'react-number-format';
import { EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useCollapseCTX } from '../../Utils/CollapseContext';
import { IPagination, IUser } from '../../Types';
import { Actions } from './styles';
import Capitalize from '../../Utils/Capitalize';

const { Text } = Typography;

interface IUsersTable extends IUser {
  action?: ComponentType;
}

interface Props {
  users: IUser[] | undefined;
  setPaginationParams: React.Dispatch<React.SetStateAction<IPagination>>;
  totalRecords: number | undefined;
  loading: boolean;
  paginationParams: IPagination;
}

const UsersTable = ({
  users,
  setPaginationParams,
  totalRecords,
  loading,
  paginationParams,
}: Props) => {
  const { isCollapsing } = useCollapseCTX();

  const columns: ColumnsType<IUsersTable> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (d) => (
        <NumberFormat value={d} displayType='text' thousandSeparator />
      ),
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (data) => Capitalize(data),
    },
    {
      title: 'Apellidos',
      dataIndex: 'last_name',
      key: 'last_name',
      width: 200,
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      render: (data) => (
        <Text ellipsis style={{ width: 200 }}>
          <Tooltip title={Capitalize(data)} placement='topLeft'>
            {Capitalize(data)}
          </Tooltip>
        </Text>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'shipping_total',
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
      title: 'Rol',
      dataIndex: 'role',
      key: 'role',
      align: 'center',
      render: (data) =>
        Capitalize(
          data === 'user'
            ? 'Usuario'
            : data === 'client_user'
            ? 'Gerente'
            : 'Administrador'
        ),
    },
    {
      title: 'Fecha de registro',
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
      render: (_a: undefined, r: IUser) => (
        <Actions>
          <Tooltip title='Ver'>
            <Link to={`/users/${r.id}`}>
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
        dataSource={users}
        rowKey='id'
        scroll={{ x: isCollapsing ? undefined : 'max-content' }}
        pagination={{
          defaultPageSize: 10,
          defaultCurrent: 1,
          showSizeChanger: true,
          pageSizeOptions: ['10', '25', '50', '100'],
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} de ${total} usuarios`,
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

export default UsersTable;
