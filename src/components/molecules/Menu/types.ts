import { HTMLAttributes, MouseEventHandler, ReactNode } from 'react';

export interface MenuItem<MenuItemId = string> {
  id: MenuItemId;
  content?: ReactNode;
}

export interface MenuItemProps<MenuItemId = string> extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  items: Array<MenuItem<MenuItemId>>;
  onClickItem?: MouseEventHandler<HTMLLIElement>;
}
