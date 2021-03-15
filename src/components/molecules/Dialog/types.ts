import { HTMLAttributes, ReactNode, MouseEventHandler } from "react";

export interface DialogProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  hasCloseButton?: boolean;
  header?: ReactNode;
  onClickClose?: MouseEventHandler<HTMLButtonElement>;
}
