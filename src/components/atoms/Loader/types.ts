import { HTMLAttributes } from 'react';

export interface LoaderProps extends HTMLAttributes<HTMLInputElement> {
  size?: number;
  color?: string;
  durationSeconds?: number;
}
