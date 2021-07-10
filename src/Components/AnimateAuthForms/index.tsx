import { AnimatePresence } from 'framer-motion';
import { Space } from './styles';

interface Props {
  children: React.ReactNode;
}

const AnimateAuthForms = ({ children }: Props) => {
  return (
    <AnimatePresence exitBeforeEnter>
      <Space
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'tween', duration: 0.35 }}
      >
        {children}
      </Space>
    </AnimatePresence>
  );
};

export default AnimateAuthForms;
