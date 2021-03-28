import { IconProps } from '../../atoms/Icon';
import { HTMLAttributes, ReactNode } from 'react';

export interface Toast {
  id: string;
  themeColor: string;
  icon?: IconProps;
  content?: ReactNode;
  onToastComplete?: (id: string) => any;
}

export type ToastProps = HTMLAttributes<HTMLDivElement> & Toast;
