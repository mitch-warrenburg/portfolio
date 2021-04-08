import React, { FC, useState, useCallback } from 'react';
import { uniqueId } from 'lodash';
import styled from 'styled-components';
import { SchedulerState } from './types';
import FullCalendar, {
  EventApi,
  formatDate,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
} from '@fullcalendar/react';
import FlexBox from '../../atoms/FlexBox';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './styles.scss';

const initialEvents = [
  {
    id: uniqueId('event'),
    title: 'All-day event',
    start: '2021-03-30',
  },
  {
    id: uniqueId('event'),
    title: 'Timed event',
    start: '2021-03-31T12:00:00',
  },
];

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
`;

const EventList = styled.ul`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
`;

const Scheduler: FC = () => {
  const [{ events }, setState] = useState<SchedulerState>({ events: [] });

  const eventsHandler = useCallback((events: Array<EventApi>) => {
    setState(prev => ({ ...prev, events }));
  }, []);

  const eventRenderer = useCallback(
    (content: EventContentArg) => (
      <>
        <b>{content.timeText}</b>
        <i>{content.event.title}</i>
      </>
    ),
    []
  );

  const eventClickHandler = useCallback((click: EventClickArg) => {
    console.log('clicked', click.event);
  }, []);

  const dateSelectHandler = useCallback((selection: DateSelectArg) => {
    let title = prompt('Please enter a new title for your event');
    let calendarApi = selection.view.calendar;

    calendarApi.unselect(); // clear date selection
    calendarApi.getEvents().forEach(console.log);

    if (title) {
      calendarApi.addEvent({
        title,
        constraint: () => '',
        id: uniqueId('event'),
        end: selection.endStr,
        start: selection.startStr,
        allDay: selection.allDay,
        extendedProps: {
          user: 'frank',
        },
      });
    }
  }, []);

  return (
    <Container>
      <EventList>
        {events.map(({ id, start, title }) => (
          <li key={id}>
            <b>{formatDate(start!, { year: 'numeric', month: 'long', day: 'numeric' })}</b>
            <i>{title}</i>
          </li>
        ))}
      </EventList>

      <FlexBox>
        <FullCalendar
          businessHours
          slotMinTime="08:00"
          slotMaxTime="18:00"
          height="800px"
          contentHeight="auto"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={false}
          select={dateSelectHandler}
          eventContent={eventRenderer}
          initialEvents={initialEvents}
          eventClick={eventClickHandler}
          eventsSet={eventsHandler}
          eventAdd={console.log}
          eventChange={console.log}
          eventRemove={console.log}
        />
      </FlexBox>
    </Container>
  );
};

export default Scheduler;
