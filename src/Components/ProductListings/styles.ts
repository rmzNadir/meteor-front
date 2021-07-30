import styled from 'styled-components';
import { Card as AntCard } from 'antd';
import { motion } from 'framer-motion';
import Device from '../../Utils/Breakpoints';

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

export const SearchSpace = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${Device.zero} {
    margin: 2.5rem 0 1rem;
  }

  @media ${Device.tablet} {
    margin: 2.5rem 0;
  }

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

export const Card = styled(AntCard)`
  display: flex;
  flex-direction: column;

  .ant-card-actions {
    width: 100%;
    display: flex;

    > li {
      margin: 0;
    }
  }

  .card-body {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px 24px 24px 24px;
    cursor: default;
  }
  // Hell
  .ant-card-body {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0;

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
          min-height: 1.5rem;
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

export const DetailsWrapper = styled.div`
  padding: 12px 24px 24px;

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

  > :first-child {
    display: flex;
    justify-content: space-between;
  }
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5rem;

  > :nth-child(2n) {
    justify-self: end;
  }
`;

export const ExtraInfoGrid = styled.div`
  display: grid;
  grid-gap: 1rem;
  margin-top: 1rem;

  > * {
    height: min-content;
  }

  .platform-list > :first-child {
    margin-right: 0.5rem;
  }

  @media ${Device.zero} {
    grid-template-columns: 1fr;
  }

  @media ${Device.mobileM} {
    grid-template-columns: 1fr 1fr;
  }
`;

export const Actions = styled.div`
  padding: 0.2rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: start;

  > :last-child {
    justify-self: end;
  }
`;

export const CardTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > :first-child {
    overflow-wrap: break-word;
    word-wrap: break-word;
    -ms-word-break: break-all;
    word-break: break-word;
    -ms-hyphens: auto;
    -moz-hyphens: auto;
    -webkit-hyphens: auto;
    hyphens: auto;
    max-width: calc(100% - 1.5rem);
  }
`;

export const ImageWrapper = styled(motion.div)`
  > :first-child {
    width: 100%;
  }
`;
