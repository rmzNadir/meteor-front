import styled from 'styled-components';
import { Button } from 'antd';
import Device from '../../Utils/Breakpoints';

export const LoginButton = styled(Button)`
  @media (max-width: 640px) {
    width: 100%;
    margin-top: 0.5rem;
  }
  @media (min-width: 640px) {
    width: auto;
    margin-left: 0.5rem;
  }
`;

export const SignUpButton = styled(Button)`
  @media (max-width: 640px) {
    width: 100%;
  }
  @media (min-width: 640px) {
    width: auto;
  }
`;

export const ListingSection = styled.section`
  margin-top: 80px;
`;

export const ListingSpace = styled.div`
  width: 100%;
  /* border: 1px solid red; */
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));

  /* > * {
    border: 1px solid teal;
  } */
`;

export const SearchSpace = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2.5rem 0;

  > :first-child {
    @media ${Device.zero} {
      width: 100%;
    }
    @media ${Device.tablet} {
      width: 60%;
    }
  }
`;

export const PaginationSpace = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.5rem 0;
`;

export const ProductInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5rem;
  margin-top: 0.5rem;

  & :nth-child(2n) {
    justify-self: end;
    align-self: center;
  }
`;
