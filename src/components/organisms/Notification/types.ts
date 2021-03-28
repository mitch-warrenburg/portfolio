import { HTMLAttributes } from 'react';
import { IconProps } from '../../atoms/Icon';
import { ButtonProps } from '../../atoms/Button';

export interface NotificationProps extends HTMLAttributes<HTMLDivElement> {
  icon?: IconProps;
  message?: string;
  themeColor: string;
  button?: ButtonProps & { text: string };
}
