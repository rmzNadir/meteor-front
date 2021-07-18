import { Button, Menu, Dropdown, message } from 'antd';
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
}

const UserDropdown = ({ setIsAuth, setUser }: Props) => {
  const history = useHistory();
  const { setCartItems } = useCartCTX();

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

  const menu = (
    <Menu>
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
