import { LegendItemConfig } from '../Legend/types';
import { darkTheme } from '../../../themes';

export const businessHours = [
  {
    daysOfWeek: [1, 2, 3, 4, 5],
    startTime: '08:00',
    endTime: '20:00',
  },
];
export const calendarLegendItems: ReadonlyArray<LegendItemConfig> = [
  {
    color: darkTheme.colors.theme.error,
    text: 'Unavailable',
  },
  {
    color: darkTheme.colors.theme.primary,
    text: 'Your Meeting',
  },
];

export const eventSources = [
  {
    url: '/api/v1/scheduling/events',
  },
];
