import { ReactNode } from 'react';
import { Wrapper, CardTitle } from './styles';

interface Props {
  title: string;
  children: ReactNode;
  bodyPadding?: boolean;
}

const Card = ({ title, children, bodyPadding = true }: Props) => {
  return (
    <Wrapper>
      <CardTitle>
        <div>{title}</div>
      </CardTitle>
      <div
        style={{ padding: bodyPadding ? '24px' : undefined, height: '100%' }}
      >
        {children}
      </div>
    </Wrapper>
  );
};

export default Card;
