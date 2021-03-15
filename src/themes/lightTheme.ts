import { DefaultTheme } from 'styled-components';
import { commonBreakpoints } from './commons';

const lightTheme: DefaultTheme = {
  breakpoints: commonBreakpoints,
  colors: {
    border: '',
    divider: '',
    theme: {
      primary: '',
      secondary: '',
      error: '#ff3b47',
      active: '#396df0',
      success: '#3bf083',
      pending: '#ffe564',
    },
    font: {
      primary: '',
      secondary: '',
      header: '',
      inactive: 'rgb(113, 119, 144, 0.78)',
      transparentButton: '',
    },
    background: {
      backdrop: '',
      containerDark: '',
      containerDarkest: '',
      containerLight: '',
      containerMedium: '',
      modal: '',
      primary: '',
      secondary: '',
      dropdown: 'white',
      overlay: 'rgba(36, 39, 59, 0.8)',
      menu: '',
      menuHover: '',
      content: '',
    },
  },
};

export default lightTheme;
