import { HTMLAttributes, MouseEventHandler, ReactNode } from 'react';

export interface MenuItem<MenuItemId = string> {
  id: MenuItemId;
  content?: ReactNode;
  onClick?: MouseEventHandler<HTMLLIElement>;
}

export interface Menu<MenuItemId = string> {
  label: string;
  items: Array<MenuItem<MenuItemId>>;
  onClickItem?: MouseEventHandler<HTMLLIElement>;
}

export interface MenuProps<MenuItemId = string>
  extends HTMLAttributes<HTMLDivElement>,
    Menu<MenuItemId> {}
