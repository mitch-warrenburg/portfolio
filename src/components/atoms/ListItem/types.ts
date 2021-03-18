import { HTMLAttributes } from 'react';

export interface ListItemProps extends HTMLAttributes<HTMLLIElement> {
  selected?: boolean;
  cursorPointer?: boolean;
}
