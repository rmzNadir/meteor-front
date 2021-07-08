import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & div:first-child {
    display: grid;
  }

  .icon-close {
    grid-area: 1 / 1;
    font-size: 22vw;
    color: ${(props) => props.theme.colors.error};
    z-index: 2;
  }
  .icon-image {
    grid-area: 1 / 1;
    font-size: 20vw;
    color: ${(props) => props.theme.colors.textSecondary};
  }
`;
