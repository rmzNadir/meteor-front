import { IParticlesParams } from 'react-particles-js';
import theme from './theme';

const ParticlesConfig: IParticlesParams = {
  fullScreen: {
    zIndex: -1000,
  },
  interactivity: {
    events: {
      // onHover: {
      //   enable: true,
      //   mode: 'repulse',
      // },
    },
    modes: {
      repulse: {
        distance: 100,
      },
    },
  },
  particles: {
    color: {
      value: theme.colors.primary,
    },
    links: {
      color: {
        value: theme.colors.primary,
      },
      distance: 150,
      opacity: 0.1,
    },
    move: {
      attract: {
        rotate: {
          x: 600,
          y: 600,
        },
      },
      enable: true,
      outModes: 'out',
      random: true,
      speed: 1,
    },
    number: {
      density: {
        enable: true,
      },
      value: 50,
    },
    opacity: {
      random: true,
      value: {
        min: 0,
        max: 0.5,
      },
      animation: {
        enable: true,
        speed: 1,
      },
    },
    size: {
      random: true,
      value: {
        min: 1,
        max: 3,
      },
      animation: {
        speed: 4,
        minimumValue: 0.3,
      },
    },
  },
};

export default ParticlesConfig;
