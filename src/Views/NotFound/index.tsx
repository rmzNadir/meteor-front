import { Typography, Button } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import { ReactComponent as NotFoundSvg } from './404.svg';
import { Wrapper } from './styles';

const { Text } = Typography;
const NotFound = () => {
  const history = useHistory();
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'tween', duration: 0.2 }}
      >
        <Wrapper>
          <Text strong>Parece que te has perdido ☹</Text>
          <NotFoundSvg />
          <Button size='large' type='primary' onClick={() => history.push('/')}>
            Llévame de regreso
          </Button>
        </Wrapper>
      </motion.div>
    </AnimatePresence>
  );
};

export default NotFound;
