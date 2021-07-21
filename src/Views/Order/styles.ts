import styled from 'styled-components';
import { Image as AntImage } from 'antd';
import Device from '../../Utils/Breakpoints';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InfoSpace = styled.div`
  @media ${Device.zero} {
    width: 100%;
  }

  @media ${Device.laptop} {
    width: 80%;
  }

  @media ${Device.laptopL} {
    width: 70%;
  }

  @media ${Device.laptopXL} {
    width: 40%;
  }
`;

export const Summary = styled.div`
  margin-top: 1rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  padding: 0.75rem;
  display: grid;
  grid-gap: 0.25rem;
  background: ${(props) => props.theme.colors.background};

  @media ${Device.zero} {
    grid-template-columns: 1fr;
  }

  @media ${Device.tablet} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const SummaryColumn = styled.div`
  /* border: 1px solid red; */
  display: flex;

  flex-direction: column;
  > :first-child {
    margin-bottom: 0.5rem;
  }

  > * {
    overflow-wrap: break-word;
    word-wrap: break-word;
    -ms-word-break: break-all;
    word-break: break-word;
    -ms-hyphens: auto;
    -moz-hyphens: auto;
    -webkit-hyphens: auto;
    hyphens: auto;
  }
`;

export const SummaryCalculations = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 0.25rem;
  row-gap: 0;

  > :nth-child(2n) {
    justify-self: end;
  }

  > :last-child {
    font-weight: 600;
  }

  .order-total {
    color: ${(props) => props.theme.colors.primary};
  }
`;

export const ProductList = styled.div`
  background: ${(props) => props.theme.colors.background};
  margin-top: 1rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  padding: 0.75rem;
  display: grid;
  grid-gap: 0.5rem;

  @media ${Device.laptopL} {
    grid-template-columns: 1fr 1fr;
  }
`;

export const OrderProduct = styled.div`
  display: grid;
  grid-gap: 0.5rem;

  @media ${Device.zero} {
    grid-template-columns: 1fr;
  }

  @media ${Device.tablet} {
    grid-template-columns: 10rem 1fr;
  }
`;

export const ProductImage = styled(AntImage)`
  object-fit: cover;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;

  > * {
    overflow-wrap: break-word;
    word-wrap: break-word;
    -ms-word-break: break-all;
    word-break: break-word;
    -ms-hyphens: auto;
    -moz-hyphens: auto;
    -webkit-hyphens: auto;
    hyphens: auto;
  }
`;
