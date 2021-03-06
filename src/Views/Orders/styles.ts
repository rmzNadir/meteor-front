import styled from 'styled-components';
import { Typography, Input } from 'antd';
import Device from '../../Utils/Breakpoints';

const { Search: antSearch } = Input;
const { Title: antTitle } = Typography;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PlatformIconSpace = styled.div`
  align-items: center;
  justify-content: center;
  display: grid;
  grid-template-columns: max-content;
  grid-gap: 1rem;
`;

export const Title = styled(antTitle)`
  margin: 0 !important;
  margin-bottom: 1rem !important;
`;

export const HeaderSpace = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: flex-end;

  > :first-child {
    margin-right: 0.5rem;
  }
`;

export const Search = styled(antSearch)`
  @media ${Device.zero} {
    width: 100%;
  }

  @media ${Device.laptop} {
    width: 50%;
  }

  @media ${Device.laptopL} {
    width: 40%;
  }

  @media (min-width: 1980px) {
    width: 30%;
  }
`;
