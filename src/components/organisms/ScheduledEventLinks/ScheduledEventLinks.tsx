import React, { FC, useMemo } from 'react';
import styled from 'styled-components';
import { IconProps } from '../../atoms/Icon';
import IconLink from '../../molecules/IconLink';
import { ScheduledEventLinksProps } from './types';
import googleIcon from '../../../assets/google.png';
import { google, outlook, ics, CalendarEvent, office365 } from 'calendar-link';

const Container = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  justify-items: start;
`;

const ScheduledEventLinks: FC<ScheduledEventLinksProps> = ({
  event: { start, end } = {},
  ...props
}) => {
  const calendarEvent: CalendarEvent = useMemo(
    () => ({
      end,
      start,
      title: 'Meeting with Mitch Warrenburg',
      description: "Meeting scheduled with Mitch Warrenburg's Portfolio Application.",
    }),
    [start, end]
  );

  const links = useMemo(
    () => [
      {
        text: 'Open with Google',
        href: google(calendarEvent),
        img: googleIcon,
      },
      {
        text: 'Open with Outlook',
        href: outlook(calendarEvent),
        icon: {
          icon: 'microsoft',
          prefix: 'fab',
          color: '#0078d4',
        },
      },
      {
        text: 'Open with Office',
        href: office365(calendarEvent),
        icon: {
          icon: 'microsoft',
          prefix: 'fab',
          color: '#0078d4',
        },
      },
      {
        text: 'Open ics',
        href: ics(calendarEvent),
        icon: {
          icon: 'paperclip',
          color: 'white',
        },
      },
    ],
    [calendarEvent]
  );

  return (
    <Container {...props}>
      {links.map(({ text, href, icon, img }, index) => (
        <IconLink
          key={`${text}-${index}`}
          text={text}
          href={href}
          icon={icon as IconProps}
          img={img}
        />
      ))}
    </Container>
  );
};

export default ScheduledEventLinks;
