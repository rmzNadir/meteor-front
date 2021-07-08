import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Container } from './styles';

const AppLoading = () => {
  return (
    <Container>
      <Spin indicator={<LoadingOutlined style={{ fontSize: '5rem' }} spin />} />
    </Container>
  );
};

export default AppLoading;
