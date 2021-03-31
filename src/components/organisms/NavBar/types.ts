import { HTMLAttributes } from 'react';
import { Menu } from '../../molecules/Menu';

export interface NavBarProps extends HTMLAttributes<HTMLDivElement> {
  menus: Array<Menu>;
}
