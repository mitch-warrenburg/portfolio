import React, { FC, useRef, useState, useEffect } from 'react';
import Dialog from '../../molecules/Dialog';
import { ScheduleModalProps } from './types';
import { emailValidator } from '../../../util';
import { useEventCallback } from '../../../hooks';
import useAuthState from '../../../hooks/useAuthState';
import { useSelector, useDispatch } from 'react-redux';
import ScheduledEventPanel from '../ScheduledEventPanel';
import { RootState, PendingEvent } from '../../../store/types';
import { setIsAuthFormModalOpen } from '../../../store/state/uiSlice';
import { setPendingEvent, createScheduledEvent } from '../../../store/state/schedulerSlice';

const ScheduleModal: FC<ScheduleModalProps> = ({
  calendarRef,
  closeModalCb,
  scheduledEventDraft,
}) => {
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState('');
  const emailInputRef = useRef<HTMLInputElement>(null);
  const { isUserFullyAuthenticated, updateAuthStateStatus } = useAuthState();
  const pendingEvent = useSelector<RootState, PendingEvent | undefined>(
    ({ scheduler }) => scheduler.pendingEvent
  );

  const api = calendarRef.current?.getApi();

  const submitButtonClickHandler = useEventCallback(() => {
    const email = emailInputRef.current?.value;

    if (emailValidator(email, true)) {
      const event = { ...scheduledEventDraft, email };

      setEmailError('');
      closeModalCb();
      dispatch(setPendingEvent(event));

      if (!isUserFullyAuthenticated) {
        updateAuthStateStatus();
        dispatch(setIsAuthFormModalOpen(true));
      } else {
        dispatch(createScheduledEvent({ ...event, api }));
      }
    } else {
      setEmailError('A valid email is required');
    }
  });

  useEffect(() => {
    if (isUserFullyAuthenticated && pendingEvent) {
      dispatch(createScheduledEvent({ ...pendingEvent, api }));
    }
  }, [isUserFullyAuthenticated]);

  return (
    <Dialog
      active={!!scheduledEventDraft}
      onClickAway={closeModalCb}
      onClickClose={closeModalCb}>
      <ScheduledEventPanel
        showCalendarLinks={false}
        submitButtonDisabled={false}
        submitButtonText="Schedule Meeting"
        emailError={emailError}
        event={scheduledEventDraft}
        emailInputRef={emailInputRef}
        onClickSubmitButton={submitButtonClickHandler}
      />
    </Dialog>
  );
};

export default ScheduleModal;
