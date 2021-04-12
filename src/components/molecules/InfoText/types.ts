import { HTMLAttributes } from 'react';
import { IconProps } from '../../atoms/Icon';

export interface InfoTextProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  icon: IconProps;
}
