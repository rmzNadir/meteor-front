import styled from 'styled-components';

export const Section = styled.div`
  width: max-content;
  margin: 1rem 0 -0.5rem 1rem;
  cursor: pointer;
  transition: color 0.2s;
  z-index: 1;
  user-select: none;

  &:hover {
    color: #c598d8;
  }

  & > :first-child {
    margin-right: 0.5rem;
  }
`;
