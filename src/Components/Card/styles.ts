import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.constants.borderRadius};
  z-index: 1;
  > :last-child {
    background: ${(props) => props.theme.colors.background};
    opacity: 1;
  }
`;

export const CardTitle = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  font-size: 14px;
  padding: 12px 24px;
  font-weight: 500;
  background: ${(props) => props.theme.colors.content};
`;
