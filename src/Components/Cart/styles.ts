import styled from 'styled-components';
import { Button } from 'antd';

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

export const EmptyWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CartItemSpace = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: 1fr;
`;

export const CartItemWrapper = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  padding: 0.5rem 0;

  :first-child {
    padding-top: 0;
  }

  :last-child {
    padding-bottom: 0;
    border: 0;
  }
`;

export const Image = styled.img`
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

  > :first-child {
    > :first-child {
      margin-right: 0.5rem;
    }
  }

  > :last-child {
    justify-self: end;
  }
`;
