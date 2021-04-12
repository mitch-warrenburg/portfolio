import { ButtonHTMLAttributes } from 'react';

export interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  isLoading?: boolean;
  transparent?: boolean;
  loaderColor?: string;
  loaderAnimationDuration?: number;
}
