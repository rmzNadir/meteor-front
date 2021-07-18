import styled from 'styled-components';
import { Typography, Empty, Input } from 'antd';
import Device from '../../Utils/Breakpoints';

const { Title: antTitle } = Typography;
const { Search: antSearch } = Input;

export const Summary = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-auto-rows: 1fr;

  @media ${Device.zero} {
    grid-template-columns: 1fr;
  }

  @media ${Device.tablet} {
    grid-template-columns: 1fr 1fr;
  }

  @media ${Device.laptopL} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled(antTitle)`
  &.summary-title {
    margin-bottom: 2rem;
  }
`;

export const PlatformIconSpace = styled.div`
  align-items: center;
  justify-content: center;
  display: grid;
  grid-template-columns: max-content;
  grid-gap: 1rem;
`;

export const TableTitle = styled.div`
  height: 100%;
  margin: 2rem 0 1rem;
  align-items: center;

  @media ${Device.zero} {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 0.5rem;
  }

  @media ${Device.mobileL} {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

export const TwoColumns = styled.div`
  display: grid;

  @media ${Device.zero} {
    grid-template-columns: 1fr;
    grid-gap: 0;
  }

  @media ${Device.tablet} {
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
  }

  .switch-space > :last-child {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  }
`;

export const ProductDetailsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr min-content 1fr;
  grid-gap: 0.5rem;

  > div:nth-child(3) {
    justify-self: start;
  }

  > div:nth-child(1) {
    justify-self: end;
  }
`;
export const CenterCardBodyColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  & > * {
    text-align: center;
  }

  & .total-records {
    margin: 0;
    line-height: unset;
    color: ${(props) => props.theme.colors.primary};
    font-size: 1.5rem;
    font-weight: 500;
  }

  & .latest-addition {
    font-weight: 500;
    font-size: 1.5rem;
  }
`;

export const InnerCell = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
`;

export const NoData = styled(Empty)`
  margin: 0;
`;

export const HeaderSpace = styled.div`
  margin: 0.25rem 0 1.1rem;
  display: flex;
  justify-content: flex-end;
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
