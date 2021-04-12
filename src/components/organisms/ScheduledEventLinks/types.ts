import { HTMLAttributes } from 'react';
import { ScheduledEventDraft } from '../../../store/types';

export interface ScheduledEventLinksProps extends HTMLAttributes<HTMLDivElement> {
  event?: ScheduledEventDraft;
}
