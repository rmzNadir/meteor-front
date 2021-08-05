import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  color: ${(props) => props.theme.colors.primary} !important;
  transition: opacity 0.2s;

  > * {
    color: ${(props) => props.theme.colors.primary} !important;
  }

  :hover {
    opacity: 0.75;
  }
`;
