/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import { Image as AntImage, Card } from 'antd';
import Device from '../../Utils/Breakpoints';

export const ProfileSpace = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProfileCard = styled(Card)`
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .ant-card-body {
    width: 100%;
    padding: 24px 8px 8px;
  }

  .profile-image {
    border-radius: 50%;
  }

  .ant-card-actions {
    width: 100%;
    display: flex;

    > li {
      margin: 0;
    }
  }

  @media ${Device.zero} {
    width: 100%;
  }

  @media ${Device.tablet} {
    width: 70%;
  }

  @media ${Device.laptopL} {
    width: 50%;
  }

  @media ${Device.laptopXL} {
    width: 40%;
  }
`;

export const Image = styled(AntImage)`
  user-select: none;
  border-radius: 50%;
  width: 9rem;
  height: 9rem;
  object-fit: cover;
  object-position: center right;
  border: 4px solid
    ${({ role, theme }) =>
      role === 'user'
        ? theme.colors.user
        : role === 'client_user'
        ? theme.colors.client_user
        : theme.colors.admin};
`;

export const UserInfo = styled.div`
  margin-top: 1rem;
  text-align: center;

  > :first-child {
    color: ${(props) => props.theme.colors.primary};
  }
`;

export const TagSpace = styled.div`
  margin: 0.5rem 0;
`;

export const ExtraInfo = styled.div`
  width: 100%;
  margin-top: 2rem;

  @media ${Device.zero} {
    text-align: center;
  }
  @media ${Device.laptop} {
    text-align: right;
  }
`;

export const ProfilePictureSpace = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const TwoColumns = styled.div`
  display: grid;

  @media ${Device.zero} {
    grid-template-columns: 1fr;
    grid-gap: 0;
  }

  @media ${Device.tablet} {
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
  }
`;
