import { HTMLAttributes } from 'react';

export interface ChatMessageProps extends HTMLAttributes<HTMLDivElement> {
  content: string;
  isFromCurrentUser: boolean;
}
