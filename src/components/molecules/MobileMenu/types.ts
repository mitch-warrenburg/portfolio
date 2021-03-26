import { ReactNode, HTMLAttributes, MouseEventHandler } from 'react';

export interface MenuItem<MenuItemId = string> {
  id: MenuItemId;
  content?: ReactNode;
}

export interface MobileMenuProps<MenuItemId = string>
  extends HTMLAttributes<HTMLUListElement> {
  isOpen: boolean;
  items: Array<MenuItem<MenuItemId>>;
  onClickItem?: MouseEventHandler<HTMLLIElement>;
  onClickClose?: MouseEventHandler<HTMLButtonElement>;
}
