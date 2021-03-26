import { HTMLAttributes } from 'react';

export interface RoundImageButtonProps extends HTMLAttributes<HTMLButtonElement> {
  src: string;
  alt: string;
}
