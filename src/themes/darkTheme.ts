import { commonBreakpoints } from './commons';
import { DefaultTheme } from 'styled-components';

const darkTheme: DefaultTheme = {
  breakpoints: commonBreakpoints,
  colors: {
    border: 'rgba(113, 119, 144, 0.25)',
    divider: 'rgba(113, 119, 144, 0.25)',
    theme: {
      primary: '#3a6df0',
      secondary: '',
      error: '#ff3b47',
      active: '#396df0',
      success: '#3bf083',
      pending: '#ffe564',
    },
    font: {
      primary: '#f9fafb',
      inactive: 'rgba(113, 119, 144, 0.78)',
      secondary: '',
      header: '#999ba5',
      transparentButton: 'rgba(249, 250, 251, 0.55)',
    },
    background: {
      backdrop: '',
      containerDark: '',
      containerDarkest: '',
      containerLight: '',
      containerMedium: '',
      primary: 'rgba(16, 18, 27, 0.8)',
      secondary: '',
      modal: '#161925',
      dropdown: '#21242d',
      overlay: 'rgba(36, 39, 59, 0.8)',
      menu: 'rgba(12, 15, 25, 0.30)',
      menuHover: '#0c0f19',
      content: 'rgba(146, 151, 179, 0.13)',
    },
  },
};

export default darkTheme;
