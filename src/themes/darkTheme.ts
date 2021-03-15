import { commonBreakpoints } from './commons';
import { DefaultTheme } from 'styled-components';

const darkTheme: DefaultTheme = {
  breakpoints: commonBreakpoints,
  colors: {
    theme: {
      error: '',
      highlightGreen: '',
      highlightYellow: '',
      primary: '',
      secondary: '',
    },
    background: {
      backdrop: '',
      containerDark: '',
      containerDarkest: '',
      containerLight: '',
      containerMedium: '',
      primary: '',
      secondary: '',
      dropdown: '#21242d',
      panel: 'rgb(16, 18, 27, 0.9)',
      menu: 'rgba(12, 15, 25, 0.30)',
      content: 'rgb(146, 151, 179, 0.13)',
    },
    font: {
      primary: '#f9fafb',
      inactive: 'rgb(113, 119, 144, 0.78)',
      secondary: '',
      header: '#999ba5',
    },
    divider: '',
    border: 'rgba(113, 119, 144, 0.25)',
  },
};

export default darkTheme;
