import { DefaultTheme } from 'styled-components';
import { green, red } from '@ant-design/colors';

const theme: DefaultTheme = {
  colors: {
    primary: '#C598D8',
    background: '#131313',
    content: '#1f1f1f',
    border: '#303030',
    success: green[6],
    error: red[5],
    textPrimary: 'rgba(255, 255, 255, 0.85)',
    textSecondary: 'rgba(255,255,255,0.45)',
    formError: '#a61d24',
  },
  constants: {
    borderRadius: '0.25rem',
  },
};

export default theme;
