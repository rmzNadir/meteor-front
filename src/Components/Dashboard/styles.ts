import styled from 'styled-components';
import { Layout } from 'antd';
import Device from '../../Utils/Breakpoints';

const { Content } = Layout;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 0;
  overflow: hidden;
  background: ${(props) => props.theme.colors.content};

  & .logo {
    height: 50px;
  }
`;

export const LayoutContent = styled(Content)`
  margin: 2rem 1rem 1rem;

  @media ${Device.zero} {
    padding: 0;
  }

  @media ${Device.laptop} {
    padding: 1.5rem;
  }
`;

export const HeaderActions = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: 1fr 1fr;
`;
