import { useEffect, useState, useCallback } from 'react';
import { message } from 'antd';
import { useHistory } from 'react-router-dom';
import Dashboard from '../../Components/Dashboard';
import { IUser } from '../../Types';
import Amogus from '../../Utils/Amogus';
import UserProfile from '../../Components/UserProfile';
import { useAuthCTX } from '../../Utils/AuthContext';

const MyProfile = () => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<IUser>();
  const { user } = useAuthCTX();
  const history = useHistory();

  const getUser = useCallback(async () => {
    setLoading(true);
    try {
      const [res] = await Amogus({
        method: 'GET',
        url: `/users/${user?.id}`,
      });

      if (!res.success && res.msg === 'User not found') {
        return history.push('/404');
      }

      setUserInfo(res.user);
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
    <Dashboard selectedKeys='' sectionName='Mi Perfil' showParticles>
      <UserProfile
        userInfo={userInfo}
        loading={loading}
        setUserInfo={setUserInfo}
        isProfile
      />
    </Dashboard>
  );
};

export default MyProfile;
