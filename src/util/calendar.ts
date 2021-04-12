import moment, { duration } from 'moment';
import { EventContentArg, DateSpanApi } from '@fullcalendar/react';

export const toHourString = (content: EventContentArg, type: 'startStr' | 'endStr') => {
  return `${moment(content.event[type]).format('LT')}`;
};

export const allowSelection = ({ startStr, endStr }: DateSpanApi) => {
  const durationMs = moment(endStr).diff(moment(startStr));
  return duration(durationMs).asHours() <= 2;
};
