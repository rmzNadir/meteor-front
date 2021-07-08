import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
}

const AnimateAuthForms = ({ children }: Props) => {
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        initial={{ opacity: 0, y: 1000 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'tween', duration: 0.35 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimateAuthForms;
