import { HTMLAttributes } from 'react';

export interface ChatMessageProps extends HTMLAttributes<HTMLDivElement> {
  content: string;
  isAdmin?: boolean;
  isFromCurrentUser: boolean;
}
