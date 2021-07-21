/* eslint-disable no-nested-ternary */
import { Spin, Typography, Tag, Button, message } from 'antd';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { IUser } from '../../Types';
import {
  ProfileCard,
  ProfileSpace,
  Image,
  UserInfo,
  TagSpace,
  ExtraInfo,
  ProfilePictureSpace,
} from './styles';
import Capitalize from '../../Utils/Capitalize';
import UserForm from './UserForm';
import ToFormValues from '../../Utils/ToFormValues';
import DisplayErrors from '../../Utils/DisplayErrors';
import { useAuthCTX } from '../../Utils/AuthContext';
import { useCartCTX } from '../../Utils/CartContext';
import { clearStorageKey } from '../../Utils/Storage';

const { Text, Title } = Typography;

const USER_IMG_FALLBACK =
  'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';

interface Props {
  userInfo: IUser | undefined;
  loading: boolean;
  setUserInfo: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  isProfile?: boolean;
}

const UserProfile = ({
  userInfo,
  loading,
  setUserInfo,
  isProfile = false,
}: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [edit, setEdit] = useState(false);
  const [initialValues, setInitialValues] = useState();
  const { user, setUser, setIsAuth, isAdmin } = useAuthCTX();
  const { setCartItems } = useCartCTX();
  const history = useHistory();

  const { name, last_name, email, role, created_at, id, image } = {
    ...userInfo,
  };

  // TODO: turn into a custom hook
  const handleLogout = async () => {
    try {
      await axios.delete('/logout');
      setIsAuth(false);
      setCartItems([]);
      setUser(undefined);
      clearStorageKey('cart');

      document.body.classList.remove('is-loaded');
      message.info('Por favor inicia sesión con tu nueva contraseña');
      history.push('/');
    } catch (e) {
      console.error(e);
    }
  };

  const submitEdit = async (values: FormData) => {
    setIsSubmitting(true);
    try {
      const {
        data: { success, user: userData, errors, password_updated },
      } = await axios.patch(`/users/${id}`, values);

      setIsSubmitting(false);

      if (password_updated) {
        setTimeout(() => {
          handleLogout();
        }, 1000);
      }

      if (success) {
        // Update initial values in case the user wants to make a new edit
        setInitialValues(ToFormValues(userData));
        setUserInfo(userData);
        if (userData.id === user?.id) {
          setUser(userData);
        }
        setEdit(false);
        message.success('El usuario ha sido actualizado correctamente');
        return true;
      }

      if (errors) {
        DisplayErrors(errors);
        return false;
      }
    } catch (e) {
      message.error('Algo salió mal, por favor intenta de nuevo');
      setIsSubmitting(false);
      return false;
    }
    return true;
  };

  return (
    <ProfileSpace>
      <ProfileCard
        actions={[
          <Button
            type='link'
            block
            style={{ height: '2.25rem' }}
            onClick={() => {
              // Initialize the initial values, yeah... lol
              !initialValues &&
                userInfo &&
                setInitialValues(ToFormValues(userInfo));
              setEdit(true);
            }}
          >
            <EditOutlined key='edit' /> Editar
          </Button>,
        ]}
      >
        <Spin spinning={loading}>
          <ProfilePictureSpace>
            <Image
              role={role}
              src={image?.url || USER_IMG_FALLBACK}
              fallback={USER_IMG_FALLBACK}
              preview={{
                maskClassName: 'profile-image',
                mask: <EyeOutlined style={{ fontSize: 25 }} />,
              }}
            />
          </ProfilePictureSpace>
          <UserInfo>
            <Title level={3}>
              {name && last_name && Capitalize(`${name} ${last_name}`)}
            </Title>
            <TagSpace>
              <Tag
                color={
                  role === 'user'
                    ? 'green'
                    : role === 'client_user'
                    ? 'cyan'
                    : 'gold'
                }
              >
                {role === 'user'
                  ? 'Usuario'
                  : role === 'client_user'
                  ? 'Gerente'
                  : 'Administrador'}
              </Tag>
            </TagSpace>
            <Text>{email}</Text>
          </UserInfo>
          <ExtraInfo>
            <Text type='secondary'>
              Fecha de registro:{' '}
              {moment(created_at).format('DD/MM/YYYY HH:mm a')}
            </Text>
          </ExtraInfo>
        </Spin>
      </ProfileCard>
      <UserForm
        visible={edit}
        setVisible={setEdit}
        isSubmitting={isSubmitting}
        onSubmit={submitEdit}
        initialValues={initialValues}
        isEdit
        isProfile={isProfile}
        isAdmin={isAdmin}
      />
    </ProfileSpace>
  );
};

export default UserProfile;
