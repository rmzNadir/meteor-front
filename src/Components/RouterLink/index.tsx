import { CSSProperties } from 'react';
import { StyledLink } from './styles';

interface Props {
  to: string;
  style?: CSSProperties;
  children: React.ReactNode;
  className?: string;
}

const RouterLink = ({ style, to, children, className }: Props) => {
  return (
    <StyledLink style={style} to={to} className={className}>
      {children}
    </StyledLink>
  );
};

export default RouterLink;
