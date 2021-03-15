import { HTMLAttributes } from 'react';

export type Status = 'error' | 'active' | 'success' | 'pending';

export interface StatusIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  status: Status;
}
