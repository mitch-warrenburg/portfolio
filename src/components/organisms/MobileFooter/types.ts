import { HTMLAttributes } from 'react';
import { Menu } from '../../molecules/Menu';

export interface MobileFooterProps extends HTMLAttributes<HTMLDivElement> {
  menus: Array<Menu>;
}
