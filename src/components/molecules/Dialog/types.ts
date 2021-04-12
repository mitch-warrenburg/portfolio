import { HTMLAttributes, MouseEventHandler, MutableRefObject } from 'react';

export interface DialogProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  onClickAway?: (event: Event) => any;
  ref?: MutableRefObject<HTMLDivElement>;
  onClickClose?: MouseEventHandler<HTMLButtonElement>;
}
