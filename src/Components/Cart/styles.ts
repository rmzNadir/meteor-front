import styled from 'styled-components';
import { Button, Image as AntImage } from 'antd';
import { motion } from 'framer-motion';
import Device from '../../Utils/Breakpoints';

export const FAB = styled(Button)`
  position: fixed;
  right: 40px;
  bottom: 102px;
  z-index: 999;
  cursor: pointer;
  box-shadow: 0 0 0 0 ${(props) => props.theme.colors.primary};
  -webkit-animation: pulse 1.5s infinite cubic-bezier(0.66, 0, 0, 1);
  -moz-animation: pulse 1.5s infinite cubic-bezier(0.66, 0, 0, 1);
  -ms-animation: pulse 1.5s infinite cubic-bezier(0.66, 0, 0, 1);
  animation: pulse 1.5s infinite cubic-bezier(0.66, 0, 0, 1);

  :hover {
    -webkit-animation: none;
    -moz-animation: none;
    -ms-animation: none;
    animation: none;
  }

  @-webkit-keyframes pulse {
    to {
      box-shadow: 0 0 0 25px rgba(232, 76, 61, 0);
    }
  }
  @-moz-keyframes pulse {
    to {
      box-shadow: 0 0 0 25px rgba(232, 76, 61, 0);
    }
  }
  @-ms-keyframes pulse {
    to {
      box-shadow: 0 0 0 25px rgba(232, 76, 61, 0);
    }
  }
  @keyframes pulse {
    to {
      box-shadow: 0 0 0 25px rgba(232, 76, 61, 0);
    }
  }
`;

export const EmptyWrapper = styled(motion.div)`
  position: absolute;
  height: 75%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ResultWrapper = styled(motion.div)`
  height: 75%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CartItemSpace = styled.div`
  position: relative;
  width: 100%;
  /* height: 100%; */
  flex-grow: 1;
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  overflow-x: hidden;
  padding: 0 24px 24px;
`;

export const CartItemWrapper = styled(motion.div)`
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  padding: 0.5rem 0;
  /* 
  :first-child {
    padding-top: 0;
  }

  :last-child {
    padding-bottom: 0;
    border: 0;
  } */
`;

export const Image = styled(AntImage)`
  height: 5.5rem;
  width: 5.5rem;
  object-fit: cover;
`;

export const TopInfo = styled.div`
  display: grid;
  grid-template-columns: 5.5rem 1fr;
  grid-gap: 0.5rem;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;

  > :first-child,
  > :nth-child(2) {
    margin: 0;
    overflow-wrap: break-word;
    word-wrap: break-word;
    -ms-word-break: break-all;
    word-break: break-word;
    -ms-hyphens: auto;
    -moz-hyphens: auto;
    -webkit-hyphens: auto;
    hyphens: auto;
  }

  > :nth-last-child(2) {
    color: ${(props) => props.theme.colors.primary};
  }
`;

export const BottomInfo = styled.div`
  margin-top: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;

  > :first-child {
    > :first-child {
      margin-right: 0.5rem;
    }
  }

  > :last-child {
    justify-self: end;
  }
`;

export const SummarySpace = styled(motion.div)`
  padding: 24px 24px 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  margin-bottom: 0.5rem;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;
  text-align: center;

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

  .number-color {
    color: ${(props) => props.theme.colors.primary};
  }

  .shipping-disclaimer {
    text-align: left;
    align-self: start;
    margin-top: 1rem;
  }
`;

export const BuyButtonSpace = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

export const CheckoutSpace = styled(motion.div)`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${(props) => props.theme.colors.border};
  text-align: left;
`;

export const TwoColumns = styled.div`
  display: grid;

  @media ${Device.zero} {
    grid-template-columns: 1fr;
    grid-gap: 0.5rem;
  }

  @media ${Device.tablet} {
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
  }
`;
