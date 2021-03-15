import { ButtonHTMLAttributes } from 'react';

export interface ModalProps extends ButtonHTMLAttributes<HTMLDivElement> {
  active?: boolean;
}
