import { ButtonHTMLAttributes, MutableRefObject } from 'react';

export interface ModalProps extends ButtonHTMLAttributes<HTMLDivElement> {
  active?: boolean;
  onClickAway?: (event: Event) => any;
  ref?: MutableRefObject<HTMLDivElement>;
}
