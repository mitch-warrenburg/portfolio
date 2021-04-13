import React, { FC, useState, useRef, MutableRefObject, useMemo, useEffect } from 'react';
import FullCalendar, {
  DateSelectArg,
  EventClickArg,
  DateRangeInput,
  EventContentArg,
} from '@fullcalendar/react';
import Legend from '../Legend';
import styled from 'styled-components';
import { useWindowSize } from 'react-use';
import ScheduleModal from '../ScheduleModal';
import momentPlugin from '@fullcalendar/moment';
import { useEventCallback, useScrollTop } from '../../../hooks';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useSelector, useDispatch } from 'react-redux';
import useAuthState from '../../../hooks/useAuthState';
import LoadingOverlay from '../../molecules/LoadingOverlay';
import { allowSelection, toHourString } from '../../../util';
import ScheduledEventBlock from '../../atoms/ScheduledEventBlock';
import { confirmSummary } from '../../../store/state/schedulerSlice';
import ScheduledEventReviewModal from '../ScheduledEventReviewModal';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { businessHours, calendarLegendItems, eventSources } from './constants';
import {
  RootState,
  ScheduledEvent,
  SchedulerState,
  ScheduledEventDraft,
  ExtendedScheduledEventProps,
} from '../../../store/types';
import './styles.scss';

const CalendarContainer = styled.div`
  height: 856px;
  margin-bottom: 50px;

  @media screen and (max-width: 780px), screen and (max-height: 600px) {
    height: 700px;
  }
`;

const LegendContainer = styled.div`
  position: absolute;
  top: 872px;
  right: 16px;
  display: flex;
  height: 26px;
  align-items: center;
  justify-content: flex-start;
  @media screen and (max-width: 780px), screen and (max-height: 600px) {
    top: 716px;
  }
`;

const Scheduler: FC = () => {
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const { updateAuthStateStatus } = useAuthState();
  const calendarRef: MutableRefObject<FullCalendar | null> = useRef(null);
  const [eventDraft, setEventDraft] = useState<ScheduledEventDraft | undefined>();
  const [selectedEvent, setSelectedEvent] = useState<ScheduledEvent | undefined>();
  const { showSummary, pendingEvent } = useSelector<RootState, Partial<SchedulerState>>(
    ({ scheduler }) => ({
      showSummary: scheduler.showSummary,
      pendingEvent: scheduler.pendingEvent,
    })
  );
  const isLoading = useSelector<RootState, boolean>(
    ({ user, scheduler, ui }) =>
      (user.isLoading || scheduler.isLoading) && !ui.isAuthFormModalOpen
  );

  const closeSchedulerModal = useEventCallback(() => {
    setEventDraft(undefined);
  });

  const closeReviewModal = useEventCallback(() => {
    setSelectedEvent(undefined);
    if (showSummary) {
      updateAuthStateStatus();
      dispatch(confirmSummary(false));
    }
  });

  const eventClickHandler = useEventCallback(
    ({ view, event: { id, startStr, endStr, extendedProps, start, end } }: EventClickArg) => {
      if (width <= 780 && view.type === 'dayGridMonth') {
        console.log(start, end);

        view.calendar.changeView('timeGridDay', start as DateRangeInput);
        return;
      }

      if (extendedProps.currentUser) {
        setSelectedEvent({
          id: parseInt(id),
          start: startStr,
          end: endStr,
          extendedProps: extendedProps as ExtendedScheduledEventProps,
        });
      }
    }
  );

  const dateSelectHandler = useEventCallback(({ endStr, startStr, view }: DateSelectArg) => {
    view.calendar.unselect();
    setEventDraft({
      end: endStr,
      start: startStr,
    });
  });

  const monthViewClickHandler = useEventCallback(({ date, view }: DateClickArg) => {
    if (view.type === 'dayGridMonth') {
      view.calendar.changeView('timeGridDay', date);
    }
  });

  const headerToolbar = useMemo(
    () => ({
      left: `prev,next${width <= 780 ? '' : ',today'}`,
      center: 'title',
      right: `dayGridMonth,${width <= 780 ? '' : 'timeGridWeek,'}timeGridDay`,
    }),
    [width]
  );

  const initialView = useMemo(() => (width <= 780 ? 'dayGridMonth' : 'timeGridWeek'), [
    width <= 780,
  ]);

  const scheduledEventRenderer = useEventCallback((content: EventContentArg) => {
    const { backgroundColor, borderColor } = content.event;
    const text = `${toHourString(content, 'startStr')}`;
    return (
      <ScheduledEventBlock
        view={content.view.type}
        borderColor={borderColor}
        backgroundColor={backgroundColor}>
        {`${text}${
          width <= 780 && content.view.type !== 'timeGridDay'
            ? ''
            : `- ${toHourString(content, 'endStr')}`
        }`}
      </ScheduledEventBlock>
    );
  });

  useEffect(() => {
    const api = calendarRef.current?.getApi();

    if (width <= 780 && api && api.view.type === 'timeGridWeek') {
      api.changeView('dayGridMonth');
    }
  }, [width, calendarRef]);

  useScrollTop();

  return (
    <>
      <LoadingOverlay isLoading={isLoading} message="Loading scheduled events..." />
      <ScheduleModal
        calendarRef={calendarRef}
        scheduledEventDraft={eventDraft}
        closeModalCb={closeSchedulerModal}
      />
      <ScheduledEventReviewModal
        calendarRef={calendarRef}
        showSummary={!!showSummary}
        closeModalCb={closeReviewModal}
        event={showSummary ? pendingEvent : selectedEvent}
      />
      <LegendContainer>
        <Legend items={calendarLegendItems} />
      </LegendContainer>
      <CalendarContainer>
        <FullCalendar
          dayMaxEvents={4}
          longPressDelay={500}
          ref={calendarRef}
          height="100%"
          slotDuration="00:30:00"
          initialView={initialView}
          defaultTimedEventDuration="00:30:00"
          weekends={false}
          editable={false}
          selectable={true}
          allDaySlot={false}
          nowIndicator={true}
          selectMirror={false}
          defaultAllDay={false}
          eventOverlap={false}
          selectOverlap={false}
          slotEventOverlap={false}
          forceEventDuration={true}
          eventStartEditable={false}
          select={dateSelectHandler}
          eventSources={eventSources}
          selectAllow={allowSelection}
          headerToolbar={headerToolbar}
          businessHours={businessHours}
          eventClick={eventClickHandler}
          dateClick={monthViewClickHandler}
          eventContent={scheduledEventRenderer}
          slotMaxTime={businessHours[0].endTime}
          slotMinTime={businessHours[0].startTime}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, momentPlugin]}
        />
      </CalendarContainer>
    </>
  );
};

export default Scheduler;
