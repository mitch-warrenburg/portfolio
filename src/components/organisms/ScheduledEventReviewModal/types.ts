import { ScheduledEvent, PendingEvent } from '../../../store/types';
import { MutableRefObject } from 'react';
import FullCalendar from '@fullcalendar/react';

export interface ScheduledEventReviewModalProps {
  closeModalCb: () => any;
  showSummary: boolean;
  event?: ScheduledEvent | PendingEvent;
  calendarRef: MutableRefObject<FullCalendar | null>;
}
