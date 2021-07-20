import { useState, useCallback, useEffect, useRef } from 'react';
import { message } from 'antd';
import Dashboard from '../../Components/Dashboard';
import UsersTable from './UsersTable';
import { HeaderSpace, Title, Search } from './styles';
import { IPagination, IUser } from '../../Types';
import Amogus from '../../Utils/Amogus';
import CollapseProvider from '../../Utils/CollapseContext';

const DEF_PAGINATION = {
  per_page: 10,
  page: 1,
};

const Users = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>();
  const [paginationParams, setPaginationParams] =
    useState<IPagination>(DEF_PAGINATION);

  const renders = useRef(0);

  const setData = (userData: IUser[]) => {
    setUsers(userData);
    setLoading(false);
  };

  const getUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(
        paginationParams as unknown as Record<string, string>
      );
      const [res] = await Amogus(
        {
          method: 'GET',
          url: `/users/?${params}`,
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

      message.error('Ocurrió un error al cargar los usuarios');
    }
  }, [paginationParams]);

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
          <Search
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
