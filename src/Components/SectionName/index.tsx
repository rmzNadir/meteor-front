import { LeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import { Section } from './styles';

interface Props {
  sectionName?: string;
  children?: React.ReactNode;
}

const SectionName = ({ sectionName, children }: Props) => {
  const history = useHistory();

  return (
    <Section onClick={() => history.goBack()}>
      <LeftOutlined />
      {sectionName || children}
    </Section>
  );
};

export default SectionName;
