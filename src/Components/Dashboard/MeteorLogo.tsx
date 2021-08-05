/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-multi-assign */
import { useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LogoWrapper } from './styles';

interface Props {
  collapsed: boolean;
}

const MeteorLogo = ({ collapsed }: Props) => {
  const shouldAnimate = useRef(false);

  useEffect(() => {
    shouldAnimate.current = true;
  }, []);

  // Preloading the logos results in smooth animations since the first page render.
  const large = (new Image().src = '/images/meteor.png');
  const small = (new Image().src = '/images/meteor-small.png');

  const AnimationsLibrary = [
    {
      initial: { opacity: 1, x: 0 },
      animate: { opacity: 1, x: 0 },
      transition: { type: 'tween', duration: 0 },
    },
    {
      initial: { opacity: 0, y: -300 },
      animate: { opacity: 1, y: 0 },
      transition: { type: 'tween', duration: 0.2 },
    },
    {
      initial: { opacity: 0, x: 300 },
      animate: { opacity: 1, x: 0 },
      transition: { type: 'tween', duration: 0.2 },
    },
  ];

  const AnimationConfigSmall = shouldAnimate.current
    ? AnimationsLibrary[1]
    : AnimationsLibrary[0];

  const AnimationConfigBig = shouldAnimate.current
    ? AnimationsLibrary[2]
    : AnimationsLibrary[0];

  return (
    <LogoWrapper>
      <Link to='/'>
        <AnimatePresence>
          {collapsed && (
            <motion.img
              className='logo'
              {...AnimationConfigSmall}
              src={small}
              alt='meteor-logo'
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!collapsed && (
            <motion.img
              className='logo'
              {...AnimationConfigBig}
              src={large}
              alt='meteor-logo'
            />
          )}
        </AnimatePresence>
      </Link>
    </LogoWrapper>
  );
};

export default MeteorLogo;
