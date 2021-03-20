import { ButtonHTMLAttributes } from 'react';

export interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  transparent?: boolean;
  loaderColor?: string;
  loaderAnimationDuration?: number;
}
