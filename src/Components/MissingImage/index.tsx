import { CloseOutlined, FileImageOutlined } from '@ant-design/icons';
import { CSSProperties } from 'react';
import { Wrapper } from './styles';

interface Props {
  style: CSSProperties;
}

const MissingImage = ({ style }: Props) => {
  return (
    <Wrapper style={style}>
      <div>
        <CloseOutlined className='icon-close' />
        <FileImageOutlined className='icon-image' />
      </div>
    </Wrapper>
  );
};

export default MissingImage;
