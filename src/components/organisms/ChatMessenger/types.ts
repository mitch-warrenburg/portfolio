import { MouseEventHandler } from 'react';

export interface ChatMessengerProps {
  isChatOpen?: boolean;
  isChatMinimized?: boolean;
  onClickHeader?: MouseEventHandler<HTMLDivElement>;
}

export interface CollapsibleElementProps {
  open?: boolean;
}
