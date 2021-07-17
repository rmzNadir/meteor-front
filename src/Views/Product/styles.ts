import styled from 'styled-components';
import { Typography } from 'antd';
import Device from '../../Utils/Breakpoints';

const { Title: antTitle, Text } = Typography;

export const Title = styled(antTitle)``;

export const ProductSpace = styled.div`
  display: grid;

  row-gap: 0.5rem;

  & .product-divider-1 {
    height: 85%;
    align-self: center;
  }

  & .product-divider-2 {
    grid-area: d;
    margin: 1.5rem 0 0;
  }
  @media ${Device.zero} {
    width: 100%;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    grid-template-areas:
      'a'
      'c'
      'd'
      'e';

    & .product-divider-2 {
      grid-area: d;
      margin: 0.5rem 0 0;
    }
  }

  @media ${Device.laptop} {
    grid-template-columns: auto min-content 4fr;
    grid-template-rows: 1fr min-content auto;
    grid-template-areas:
      'a b c'
      'd d d'
      '. . e';
    column-gap: 2rem;
    row-gap: 1rem;
  }
  @media ${Device.laptopL} {
    width: 70%;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const InfoSpace = styled.div`
  display: flex;
  flex-direction: column;

  .product-description {
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

export const CardSpace = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: auto;
  grid-gap: 1rem;

  > * {
    height: min-content;
  }

  .platform-list > :first-child {
    margin-right: 0.5rem;
  }
`;

export const Actions = styled.div`
  width: 100%;
  grid-area: e;

  @media ${Device.zero} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.5rem;
  }

  @media ${Device.tablet} {
    display: flex;
    justify-content: flex-end;

    & > :first-child {
      margin-right: 0.5rem;
    }
  }
`;

export const DetailsVertical = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  margin-bottom: 1rem;
`;

export const ItemTitle = styled(Text)``;

export const ItemInfo = styled.div`
  margin-top: 0.25rem;
`;

export const Details = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;

  & :nth-child(2) {
    justify-self: end;
    align-self: center;
  }
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${Device.zero} {
    & > :first-child {
      width: 100%;
    }
  }

  @media ${Device.tablet} {
    & > :first-child {
      width: 30vw;
    }
  }
`;
