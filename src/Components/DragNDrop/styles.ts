import styled from 'styled-components';

interface IErrorProps {
  // Ugly workaround to stop "overwritten" err
  errorBorder: undefined;
}

export const DraggerWrapper = styled.div<IErrorProps>`
  max-height: 210px;
  overflow: hidden;
  position: relative;
  text-align: center;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;

  & > :last-child {
    & > :first-child {
      font-size: 50px !important;
      color: ${({ errorBorder, theme }) =>
        errorBorder
          ? `${theme.colors.formError} !important`
          : `${theme.colors.primary} !important`};
      margin-bottom: 0.5rem;
    }
  }

  &::before {
    content: '';
    position: absolute;
    border: ${({ errorBorder, theme }) =>
      errorBorder
        ? `10px dashed ${theme.colors.formError}`
        : `10px dashed ${theme.colors.textSecondary}`};
    top: -8px;
    bottom: -8px;
    left: -8px;
    right: -8px;
  }

  &:hover::before {
    border-color: ${({ errorBorder, theme }) =>
      errorBorder
        ? `${theme.colors.formError} !important`
        : `${theme.colors.primary} !important`};
  }

  .dragger-input:focus,
  .dragger-input:active {
    outline: none;
  }
`;

export const DraggerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  outline: none;

  .dragger-title {
    font-size: 16px;
    color: ${(props) => props.theme.colors.textPrimary};
  }

  .dragger-subtitle {
    font-size: 14px;
    color: ${(props) => props.theme.colors.textSecondary};
  }
`;

export const ListItemInfo = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  grid-column-gap: 0.1rem;
  align-items: center;
  margin: 0.5rem 0;

  & > :first-child {
    margin-right: 1rem;
  }
`;

export const ItemsList = styled.div`
  margin-top: 0.5rem;
  max-height: 130px;
  overflow-y: auto;

  .rejected-file {
    height: 32px;
  }

  :first-child {
    border: 1px solid red;
  }

  :last-child {
    margin-right: 0.25rem;
  }
`;

export const ItemsListTitle = styled.div`
  margin-top: 1rem;
`;
