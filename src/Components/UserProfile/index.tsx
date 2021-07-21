/* eslint-disable no-nested-ternary */
import { Spin, Typography, Tag, Button } from 'antd';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import moment from 'moment';
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

const { Text, Title } = Typography;

interface Props {
  user: IUser | undefined;
  loading: boolean;
}

const UserProfile = ({ user, loading }: Props) => {
  console.log(user);
  const { name, last_name, email, role, created_at } = { ...user };
  return (
    <ProfileSpace>
      <ProfileCard
        actions={[
          <Button type='link' block>
            <EditOutlined key='edit' /> Editar
          </Button>,
        ]}
      >
        <Spin spinning={loading}>
          <ProfilePictureSpace>
            <Image
              role={role}
              src='https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
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
    </ProfileSpace>
  );
};

export default UserProfile;
