import { HTMLAttributes } from 'react';

export interface LoadingOverlayProps extends HTMLAttributes<HTMLDivElement> {
  message?: string;
  isLoading: boolean;
}
