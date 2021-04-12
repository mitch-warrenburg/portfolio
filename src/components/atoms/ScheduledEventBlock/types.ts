import { HTMLAttributes } from 'react';

export interface ScheduledEventBlockProps extends HTMLAttributes<HTMLDivElement> {
  view: string;
  borderColor: string;
  backgroundColor: string;
}
