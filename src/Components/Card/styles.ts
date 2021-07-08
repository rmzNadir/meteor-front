import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.constants.borderRadius};
`;

export const CardTitle = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  font-size: 14px;
  padding: 12px 24px;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.04);
`;
