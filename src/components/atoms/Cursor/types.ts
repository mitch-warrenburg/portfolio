import { HTMLAttributes } from 'react';

export interface CursorProps extends HTMLAttributes<HTMLParagraphElement> {
  isNewLine?: boolean;
  hidden?: boolean;
  blinking?: boolean;
}
