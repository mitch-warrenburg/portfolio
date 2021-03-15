import { ButtonHTMLAttributes } from 'react';

export interface OverlayProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}
