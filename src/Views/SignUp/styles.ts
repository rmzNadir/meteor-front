import styled from 'styled-components';
import { Button } from 'antd';
import Device from '../../Utils/Breakpoints';

export const SignUpSpace = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  & .ant-card-head {
    border-top: 2px solid ${(props) => props.theme.colors.primary};
  }

  @media ${Device.zero} {
    & > :first-child {
      width: 100%;
    }
  }

  @media ${Device.tablet} {
    & > :first-child {
      width: 70%;
    }
  }

  @media ${Device.laptop} {
    & > :first-child {
      width: 60%;
    }
  }

  @media ${Device.laptopL} {
    & > :first-child {
      width: 40%;
    }
  }

  @media ${Device.desktop} {
    & > :first-child {
      width: 30%;
    }
  }
`;

export const FormSpace = styled.div`
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.constants.borderRadius};
  width: 50%;
`;

export const LogoSpace = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > :first-child {
    height: 4.5rem;
    margin: 0.5rem 0;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: 0.5rem 0 2rem;
`;

export const SubmitButton = styled(Button)`
  margin-top: 1rem;
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
`;
