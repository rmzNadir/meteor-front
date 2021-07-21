import { useEffect, useState, useCallback } from 'react';
import { message } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import Dashboard from '../../Components/Dashboard';
import { IParams, IUser } from '../../Types';
import Amogus from '../../Utils/Amogus';
import UserProfile from '../../Components/UserProfile';

const User = () => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<IUser>();

  const { id }: IParams = useParams();
  const history = useHistory();

  const getUser = useCallback(async () => {
    setLoading(true);
    try {
      const [res] = await Amogus({
        method: 'GET',
        url: `/users/${id}`,
      });

      if (!res.success && res.msg === 'User not found') {
        return history.push('/404');
      }

      const { user } = res;

      setUserInfo(user);
    } catch (e) {
      message.error('Ocurrió un error al cargar el usuario');
    }
    setLoading(false);
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dashboard selectedKeys='users' sectionName='Usuarios' showParticles>
      <UserProfile user={userInfo} loading={loading} />
    </Dashboard>
  );
};

export default User;
