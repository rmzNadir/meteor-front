import { motion } from 'framer-motion';
import styled from 'styled-components';
import Device from '../../Utils/Breakpoints';

export const Space = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100%;
  padding: 1rem;

  & .ant-card-head {
    border-top: 2px solid ${(props) => props.theme.colors.primary};
  }

  & .ant-card {
    opacity: 1 !important;
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
