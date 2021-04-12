import { MutableRefObject } from 'react';
import FullCalendar from '@fullcalendar/react';
import { ScheduledEventDraft } from '../../../store/types';

export interface ScheduleModalProps {
  closeModalCb: () => any;
  calendarRef: MutableRefObject<FullCalendar | null>;
  scheduledEventDraft?: ScheduledEventDraft;
}
