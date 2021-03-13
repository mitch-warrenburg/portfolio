import 'styled-components';

export interface BreakpointRange {
  min: number;
  max: number;
}

export interface DeviceOrientationBreakpoints {
  portrait: BreakpointRange;
  landscape: BreakpointRange;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      font: {
        primary: string;
        secondary: string;
      };
      background: {
        primary: string;
        secondary: string;
        containerDarkest: string;
        containerDark: string;
        containerMedium: string;
        containerLight: string;
        backdrop: string;
      };
      theme: {
        primary: string;
        secondary: string;
        error: string;
        highlightGreen: string;
        highlightYellow: string;
      };
      border: string;
      divider: string;
    };
    breakpoints: {
      mobile: DeviceOrientationBreakpoints;
      tablet: DeviceOrientationBreakpoints;
      desktop: BreakpointRange;
      largeScreen: BreakpointRange;
    };
  }
}
