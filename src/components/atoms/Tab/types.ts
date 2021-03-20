import { HTMLAttributes } from 'react';

export interface TabProps extends HTMLAttributes<HTMLLIElement> {
  selected?: boolean;
}
