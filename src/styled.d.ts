import 'styled-components';

export interface BreakpointRange {
  min: number;
  max: number;
}

export interface DeviceOrientationBreakpoints {
  portrait: BreakpointRange;
  landscape: BreakpointRange;
}

export interface ThemeBreakpoints {
  mobile: DeviceOrientationBreakpoints;
  tablet: DeviceOrientationBreakpoints;
  desktop: BreakpointRange;
  largeScreen: BreakpointRange;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      border: string;
      divider: string;
      theme: {
        primary: string;
        secondary: string;
        error: string;
        success: string;
        active: string;
        pending: string;
      };
      font: {
        primary: string;
        secondary: string;
        inactive: string;
        header: string;
        transparentButton: string;
      };
      background: {
        primary: string;
        secondary: string;
        containerDarkest: string;
        containerDark: string;
        containerMedium: string;
        containerLight: string;
        backdrop: string;
        modal: string;
        dropdown: string;
        overlay: string;
        panel: string;
        menu: string;
        menuHover: string;
        content: string;
      };
    };
    breakpoints: ThemeBreakpoints;
  }
}
