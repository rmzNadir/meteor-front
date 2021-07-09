import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Space } from './styles';

interface Props {
  children: React.ReactNode;
}

const AnimateAuthForms = ({ children }: Props) => {
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsFirstRender(false);
    }, 250);
  }, []);
  return (
    <AnimatePresence exitBeforeEnter>
      <Space
        style={{
          overflow: isFirstRender ? 'hidden' : 'auto',
        }}
        initial={{ opacity: 0, y: 1000 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'tween', duration: 0.35 }}
      >
        {children}
      </Space>
    </AnimatePresence>
  );
};

export default AnimateAuthForms;
