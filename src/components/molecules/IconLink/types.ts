import { HTMLAttributes } from 'react';
import { IconProps } from '../../atoms/Icon';

export interface IconLinkProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  href: string;
  icon?: IconProps;
  img?: string;
  newTab?: boolean;
}
