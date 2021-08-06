import styled from 'styled-components';
import { Button, Card as AntCard } from 'antd';
import Device from '../../Utils/Breakpoints';

export const LoginWrapper = styled.div`
  @media (max-width: 640px) {
    > :first-child {
      width: 100%;
      margin-top: 0.5rem;

      > :first-child {
        width: 100%;
      }
    }
  }
  @media (min-width: 640px) {
    > :first-child {
      width: auto;
      margin-left: 0.5rem;

      > :first-child {
        width: auto;
      }
    }
  }
`;
export const CartButton = styled(Button)`
  @media (max-width: 640px) {
    width: 100%;
    margin-top: 0.5rem;
  }
  @media (min-width: 640px) {
    width: auto;
    margin-left: 0.5rem;
  }
`;

export const CartWrapper = styled.div`
  @media (max-width: 640px) {
    width: 100%;
    margin-top: 0.5rem;
  }
  @media (min-width: 640px) {
    width: auto;
    margin-left: 0.5rem;
  }
`;

export const SignUpWrapper = styled.div`
  @media (max-width: 640px) {
    > :first-child {
      width: 100%;

      > :first-child {
        width: 100%;
      }
    }
  }
  @media (min-width: 640px) {
    > :first-child {
      width: auto;

      > :first-child {
        width: auto;
      }
    }
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
  grid-auto-rows: minmax(529px, min-content);

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
  @media ${Device.zero} {
    margin: 1.5rem 0 0rem;
  }

  @media ${Device.laptop} {
    margin: 1.5rem 0;
  }
`;

export const ProductInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.25rem;
  margin-top: 0.5rem;

  & :nth-child(2n) {
    justify-self: end;
    align-self: center;
  }
`;

export const LandingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Card = styled(AntCard)`
  width: 100%;
  display: flex;
  flex-direction: column;

  .ant-card-actions {
    width: 100%;
    display: flex;

    > li {
      margin: 0;
    }
  }

  // Hell
  .ant-card-body {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px 24px 24px 24px;

    .ant-card-meta {
      height: 100%;
      display: flex;
      flex-direction: column;
      margin: 0;

      .ant-card-meta-detail {
        height: 100%;
        display: flex;
        flex-direction: column;

        .ant-card-meta-title {
          display: flex;
          flex-direction: column;
        }

        .ant-card-meta-description {
          height: 100%;
          display: flex;
          flex-direction: column;

          > :first-child {
            height: 100%;
            display: flex;
            flex-direction: column;

            > :last-child {
              /* Imagine going through hell and fighting all of its demons just to set some margin lmao */
              margin-top: auto;
            }
          }
        }
      }
    }
  }
`;

export const EmptyWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
