import styled from 'styled-components';
import Device from '../../Utils/Breakpoints';

export const ListingSpace = styled.div`
  width: 100%;
  /* border: 1px solid red; */
  display: grid;
  grid-gap: 1rem;
  grid-auto-rows: minmax(529px, min-content);

  @media ${Device.zero} {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }

  @media ${Device.laptopL} {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }

  /* > * {
    border: 1px solid teal;
  } */
`;

export const SearchSpace = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${Device.zero} {
    margin: 1rem 0;
  }

  @media ${Device.laptop} {
    margin-bottom: 2.5rem;
  }

  > :first-child {
    @media ${Device.zero} {
      width: 100%;
    }
    @media ${Device.laptop} {
      width: 60%;
    }

    @media ${Device.laptopL} {
      width: 50%;
    }

    @media (min-width: 1980px) {
      width: 40%;
    }
  }
`;

export const PaginationSpace = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.5rem 0;
`;

export const EmptyWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
