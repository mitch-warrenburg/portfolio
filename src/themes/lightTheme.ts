import { DefaultTheme } from 'styled-components';
import { commonBreakpoints } from './commons';

const lightTheme: DefaultTheme = {
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
      dropdown: 'white',
      panel: '',
      menu: '',
      content: ''
    },
    font: {
      primary: '',
      secondary: '',
      header: '',
      inactive: 'rgb(113, 119, 144, 0.78)',
    },
    border: '',
    divider: '',
  },
};

export default lightTheme;
