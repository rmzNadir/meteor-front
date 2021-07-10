import styled from 'styled-components';
import { Button } from 'antd';

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
