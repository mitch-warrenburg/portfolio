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
    },
    font: {
      primary: '',
      secondary: '',
    },
    border: '',
    divider: '',
  },
};

export default lightTheme;
