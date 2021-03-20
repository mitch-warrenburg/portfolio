import { HTMLAttributes } from 'react';

export interface ChatMessageProps extends HTMLAttributes<HTMLDivElement> {
  content?: string;
  typing?: boolean;
  isAdmin?: boolean;
  isCurrentUser?: boolean;
}
