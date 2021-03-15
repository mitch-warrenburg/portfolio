import { commonBreakpoints } from './commons';
import { DefaultTheme } from 'styled-components';

const darkTheme: DefaultTheme = {
  breakpoints: commonBreakpoints,
  colors: {
    divider: '',
    border: 'rgba(113, 119, 144, 0.25)',
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
      inactive: 'rgb(113, 119, 144, 0.78)',
      secondary: '',
      header: '#999ba5',
      transparentButton: 'rgb(249, 250, 251, 0.55)',
    },
    background: {
      backdrop: '',
      containerDark: '',
      containerDarkest: '',
      containerLight: '',
      containerMedium: '',
      primary: '',
      secondary: '',
      modal: '#161925',
      dropdown: '#21242d',
      overlay: 'rgba(36, 39, 59, 0.8)',
      panel: 'rgb(16, 18, 27, 0.8)',
      menu: 'rgba(12, 15, 25, 0.30)',
      menuHover: '#0c0f19',
      content: 'rgb(146, 151, 179, 0.13)',
    },
  },
};

export default darkTheme;
