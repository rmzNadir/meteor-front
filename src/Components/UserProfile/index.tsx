/* eslint-disable no-nested-ternary */
import { Spin, Typography, Tag, Button, message } from 'antd';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useState } from 'react';
import axios from 'axios';
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

const { Text, Title } = Typography;

const USER_IMG_FALLBACK =
  'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';

interface Props {
  userInfo: IUser | undefined;
  loading: boolean;
  setUserInfo: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}

const UserProfile = ({ userInfo, loading, setUserInfo }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [edit, setEdit] = useState(false);
  const [initialValues, setInitialValues] = useState();

  const { name, last_name, email, role, created_at, id, image } = {
    ...userInfo,
  };

  const submitEdit = async (values: FormData) => {
    setIsSubmitting(true);
    try {
      const {
        data: { success, user, errors },
      } = await axios.patch(`/users/${id}`, values);

      setIsSubmitting(false);

      if (success) {
        // Update initial values in case the user wants to make a new edit
        setInitialValues(ToFormValues(user));
        setUserInfo(user);
        console.log('user', user);
        setEdit(false);
        message.success('El usuario ha sido actualizado correctamente');
      }

      if (errors) {
        DisplayErrors(errors);
      }
    } catch (e) {
      message.error('Algo salió mal, por favor intenta de nuevo');
      setIsSubmitting(false);
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
      />
    </ProfileSpace>
  );
};

export default UserProfile;
