import { Button, Menu, Dropdown, message, Avatar } from 'antd';
import {
  InfoCircleOutlined,
  PoweroffOutlined,
  UserOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { IUser } from '../../Types';
import { clearStorageKey } from '../../Utils/Storage';
import { useCartCTX } from '../../Utils/CartContext';

interface Props {
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser | undefined;
}

const UserDropdown = ({ setIsAuth, setUser, user }: Props) => {
  const history = useHistory();
  const { setCartItems } = useCartCTX();

  // TODO: turn into a custom hook

  const handleLogout = async () => {
    try {
      await axios.delete('/logout');
      setIsAuth(false);
      setCartItems([]);
      setUser(undefined);
      clearStorageKey('cart');

      document.body.classList.remove('is-loaded');
      message.success({
        content: '¡Hasta la próxima! 👀',
        style: { cursor: 'pointer' },
        onClick: () =>
          window.open('https://www.youtube.com/watch?v=b8PxzPxI8Os'),
      });
      history.push('/');
    } catch (e) {
      console.error(e);
    }
  };

  const handleMenuClick = (e: { key: string }) => {
    switch (e.key) {
      case 'profile':
        return history.push('/my-profile');
      case 'logout':
        return handleLogout();
      default:
        return undefined;
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key='profile'>
        <Button type='link' size='small' icon={<InfoCircleOutlined />}>
          Perfil
        </Button>
      </Menu.Item>
      <Menu.Item key='logout'>
        <Button type='link' size='small' icon={<PoweroffOutlined />}>
          Cerrar sesión
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown trigger={['click']} overlay={menu} arrow>
      {user?.image ? (
        <Avatar
          size='large'
          src={user?.image.url}
          style={{
            cursor: 'pointer',
            objectFit: 'cover',
            objectPosition: 'center right',
            userSelect: 'none',
          }}
        />
      ) : (
        <Button
          type='primary'
          shape='circle'
          icon={<UserOutlined />}
          size='large'
        />
      )}
    </Dropdown>
  );
};

export default UserDropdown;
