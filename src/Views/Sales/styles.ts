import styled from 'styled-components';
import { Typography, Input } from 'antd';
import Device from '../../Utils/Breakpoints';

const { Search: antSearch } = Input;
const { Title: antTitle } = Typography;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PlatformIconSpace = styled.div`
  align-items: center;
  justify-content: center;
  display: grid;
  grid-template-columns: max-content;
  grid-gap: 1rem;
`;

export const Title = styled(antTitle)`
  margin: 0 !important;
  margin-bottom: 1rem !important;
`;

export const HeaderSpace = styled.div`
  margin: 0.25rem 0 1.1rem;
  display: flex;
  justify-content: flex-end;

  > :first-child {
    margin-right: 0.5rem;
  }
`;

export const Search = styled(antSearch)`
  @media ${Device.zero} {
    width: 100%;
  }

  @media ${Device.laptop} {
    width: 50%;
  }

  @media ${Device.laptopL} {
    width: 40%;
  }

  @media (min-width: 1980px) {
    width: 30%;
  }
`;

export const DashboardSpace = styled.div`
  width: 100%;

  .graph-space {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media ${Device.zero} {
      flex-direction: column;
      > :last-child {
        width: 100%;
        margin-top: 1rem;
      }
      > :first-child {
        width: 100%;
      }
    }

    @media ${Device.laptopL} {
      flex-direction: row;
      > :last-child {
        margin-top: 0;
      }
      > :first-child,
      > :last-child {
        width: calc(50% - 0.5rem);
      }
    }
  }

  .bottom-graphs {
    margin-top: 1rem;
  }
`;

export const TitleInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: min-content;

  > :first-child {
    margin-right: 0.5rem;
  }
`;

export const LiquidTooltipInfo = styled.div`
  display: flex;
  flex-direction: column;

  .tooltip-info-wrapper {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 0.5rem;

    > :nth-child(2n) {
      justify-self: flex-end;
    }
  }

  > * {
    overflow-wrap: break-word;
    word-wrap: break-word;
    -ms-word-break: break-all;
    word-break: break-word;
    -ms-hyphens: auto;
    -moz-hyphens: auto;
    -webkit-hyphens: auto;
    hyphens: auto;
  }
`;
