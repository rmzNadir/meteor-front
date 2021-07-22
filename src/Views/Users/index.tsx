import { useState, useCallback, useEffect, useRef } from 'react';
import { Button, message, Tooltip } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { DownloadOutlined } from '@ant-design/icons';
import Dashboard from '../../Components/Dashboard';
import UsersTable from './UsersTable';
import { HeaderSpace, Title, Search } from './styles';
import { IPagination, IUser } from '../../Types';
import CollapseProvider from '../../Utils/CollapseContext';

const fileDownload = require('js-file-download');

const DEF_PAGINATION = {
  per_page: 10,
  page: 1,
};

const Users = () => {
  const [loading, setLoading] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [paginationParams, setPaginationParams] =
    useState<IPagination>(DEF_PAGINATION);

  const renders = useRef(0);

  const getUsers = useCallback(
    async (isDownload: boolean = false) => {
      isDownload ? setLoadingDownload(true) : setLoading(true);
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
          `/users/?${params}`,
          isDownload ? { responseType: 'blob' } : undefined
        );

        const {
          data,
          headers: { total },
        } = res;

        if (isDownload) {
          fileDownload(
            data,
            `Reporte-usuarios-${moment().format('DD-MM-YYYY')}.xlsx`
          );
          // Yet another ugly workaround, in this case it helps avoid the ugly stuttering animation on 1st renders
        } else if (renders.current <= 1) {
          setTimeout(() => {
            setUsers(data);
          }, 250);
        } else {
          setUsers(data);
        }

        setTotalRecords(total);
      } catch (e) {
        message.error('Ocurrió un error al cargar la lista de usuarios');
      }
      isDownload ? setLoadingDownload(false) : setLoading(false);
    },
    [paginationParams]
  );

  useEffect(() => {
    renders.current += 1;
    getUsers();
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
      <Dashboard selectedKeys='users' sectionName='Usuarios' adminView>
        <Title level={3}>Todos los usuarios</Title>
        <HeaderSpace>
          <Tooltip title='Descargar reporte'>
            <Button
              shape='circle'
              type='primary'
              loading={loadingDownload}
              disabled={totalRecords < 1}
              icon={<DownloadOutlined />}
              onClick={() => getUsers(true)}
            />
          </Tooltip>
          <Search
            className='search-input'
            placeholder='Buscar usuarios'
            enterButton
            onSearch={handleSearchbar}
            onChange={({ target }) => handleSearchbarChange(target.value)}
            allowClear
            loading={loading}
          />
        </HeaderSpace>

        <UsersTable
          loading={loading}
          users={users}
          setPaginationParams={setPaginationParams}
          totalRecords={totalRecords}
          paginationParams={paginationParams}
        />
      </Dashboard>
    </CollapseProvider>
  );
};

export default Users;
