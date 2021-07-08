import styled from 'styled-components';
import Device from '../../Utils/Breakpoints';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 5rem 0;

  & > :first-child {
    text-align: center;
    padding: 1rem;
  }

  & > :nth-child(2) {
    max-width: 90vw;
  }

  & > :last-child {
    position: absolute;
    bottom: 12.5%;
    width: calc(100% - 2rem);
  }

  @media ${Device.zero} {
    & > :first-child {
      font-size: 1.5rem;
    }

    & > :last-child {
      width: calc(100% - 2rem);
    }
  }

  @media ${Device.mobileL} {
    & > :first-child {
      font-size: 2rem;
    }

    & > :last-child {
      width: auto;
    }
  }

  @media ${Device.tablet} {
    & > :first-child {
      font-size: 2.5rem;
    }
  }
`;
