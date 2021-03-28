export interface UseControlledProps<T = unknown> {
  controlled: T | undefined;
  default: T | undefined;
  name: string;
  state?: string;
}

export type Breakpoint = 'small' | 'large';

export type UseBreakpoint = () => Breakpoint;
