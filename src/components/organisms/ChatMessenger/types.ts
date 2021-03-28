import { MouseEventHandler, FocusEventHandler } from 'react';

export interface ChatMessengerProps {
  isChatOpen?: boolean;
  isChatMinimized?: boolean;
  onClickHeader?: MouseEventHandler<HTMLDivElement>;
  onBlurTextArea?: FocusEventHandler<HTMLTextAreaElement>;
  onFocusTextArea?: FocusEventHandler<HTMLTextAreaElement>;
}

export interface CollapsibleElementProps {
  open?: boolean;
  height?: number;
}
