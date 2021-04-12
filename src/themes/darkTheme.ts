import { commonBreakpoints } from './commons';
import { DefaultTheme } from 'styled-components';

const darkTheme: DefaultTheme = {
  breakpoints: commonBreakpoints,
  colors: {
    border: 'rgba(113, 119, 144, 0.25)',
    divider: 'rgba(113, 119, 144, 0.25)',
    theme: {
      primary: 'rgb(58,109,240)',
      primaryTransparent: 'rgb(58,109,240, 0.5)',
      secondary: '',
      error: '#ff3b47',
      active: '#396df0',
      success: '#3bf083',
      pending: '#ffe564',
    },
    font: {
      primary: 'rgb(249,250,251)',
      inactive: 'rgb(113,119,144)',
      secondary: '',
      header: '#999ba5',
      transparentButton: 'rgba(249, 250, 251, 0.7)',
    },
    background: {
      backdrop: '',
      containerDark: '',
      containerDarkest: '',
      containerLight: '',
      containerMedium: '',
      primary: 'rgba(16, 18, 27, 0.6)',
      secondary: 'rgba(36, 39, 59, 1)',
      modal: 'rgba(22, 25, 37, 1)',
      dropdown: 'rgba(33, 36, 45, 1)',
      overlay: 'rgba(36, 39, 59, 0.9)',
      menu: 'rgba(12, 15, 25, 0.30)',
      menuHover: '#0c0f19',
      content: 'rgba(146, 151, 179, 0.13)',
      input: 'rgba(113, 119, 144, 0.1)',
    },
  },
};

export default darkTheme;
