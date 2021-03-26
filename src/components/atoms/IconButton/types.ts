import { IconProps } from '../Icon';
import { MouseEventHandler } from 'react';

export interface IconButtonProps extends Omit<IconProps, 'onClick'> {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
