import { DefaultTheme } from 'styled-components';

export const darkTheme: DefaultTheme = {
  breakpoints: {
    mobile: {
      portrait: {
        max: 1,
        min: 1,
      },
      landscape: {
        max: 1,
        min: 1,
      },
    },
    tablet: {
      portrait: {
        max: 1,
        min: 1,
      },
      landscape: {
        max: 1,
        min: 1,
      },
    },
    desktop: {
      max: 1,
      min: 1,
    },
    largeScreen: {
      max: 1,
      min: 1,
    },
  },

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

export const lightTheme: DefaultTheme = {
  breakpoints: {
    mobile: {
      portrait: {
        max: 0,
        min: 0,
      },
      landscape: {
        max: 0,
        min: 0,
      },
    },
    tablet: {
      portrait: {
        max: 0,
        min: 0,
      },
      landscape: {
        max: 0,
        min: 0,
      },
    },
    desktop: {
      max: 0,
      min: 0,
    },
    largeScreen: {
      max: 0,
      min: 0,
    },
  },

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
