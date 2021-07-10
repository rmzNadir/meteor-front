import { Button, Menu, Dropdown, message } from 'antd';
import {
  InfoCircleOutlined,
  LockOutlined,
  PoweroffOutlined,
  UserOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useAuthCTX } from '../../Utils/AuthContext';

const UserDropdown = () => {
  const history = useHistory();
  const { setIsAuth, setUser, user } = useAuthCTX();
  const { role } = { ...user };

  const handleLogout = async () => {
    try {
      setIsAuth(false);
      setUser(undefined);
      await axios.delete('/logout');
      document.body.classList.remove('is-loaded');
      message.success({
        content: '¡Hasta la próxima! 👀',
        style: { cursor: 'pointer' },
        onClick: () =>
          window.open('https://www.youtube.com/watch?v=b8PxzPxI8Os'),
      });
      history.replace('/');
    } catch (e) {
      console.error(e);
    }
  };

  const menu = (
    <Menu>
      {role === 'admin' && (
        <Menu.Item disabled key='0'>
          <Button disabled type='link' size='small' icon={<LockOutlined />}>
            Panel de administrador
          </Button>
        </Menu.Item>
      )}
      <Menu.Item disabled key='1'>
        <Button disabled type='link' size='small' icon={<InfoCircleOutlined />}>
          Perfil
        </Button>
      </Menu.Item>
      <Menu.Item key='2'>
        <Button
          type='link'
          onClick={handleLogout}
          size='small'
          icon={<PoweroffOutlined />}
        >
          Cerrar sesión
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown trigger={['click']} overlay={menu} arrow>
      <Button
        type='primary'
        shape='circle'
        icon={<UserOutlined />}
        size='large'
      />
    </Dropdown>
  );
};

export default UserDropdown;
