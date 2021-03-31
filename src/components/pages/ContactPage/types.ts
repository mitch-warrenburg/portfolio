import { HTMLAttributes } from 'react';

export interface ContactPageProps extends HTMLAttributes<HTMLDivElement> {
  openChatFn: () => void;
}
