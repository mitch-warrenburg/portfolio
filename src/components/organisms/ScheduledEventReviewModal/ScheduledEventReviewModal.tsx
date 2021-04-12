import React, { FC, useState, useRef } from 'react';
import Optional from '../../atoms/Optional';
import Dialog from '../../molecules/Dialog';
import { emailValidator } from '../../../util';
import { useEventCallback } from '../../../hooks';
import FormButton from '../../molecules/FormButton';
import styled, { useTheme } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import ScheduledEventPanel from '../ScheduledEventPanel';
import { ScheduledEventReviewModalProps } from './types';
import { updateUserInfo } from '../../../store/state/userSlice';
import { deleteScheduledEvent } from '../../../store/state/schedulerSlice';
import { RootState, UserState, ScheduledEvent } from '../../../store/types';

const DeleteButtonWrapper = styled.div`
  margin-right: 16px;
`;

const ScheduledEventReviewModal: FC<ScheduledEventReviewModalProps> = ({
  event,
  showSummary,
  calendarRef,
  closeModalCb,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const api = calendarRef.current?.getApi();
  const emailInputRef = useRef<HTMLInputElement>(null);

  const { uid, email: currentEmail } = useSelector<RootState, Partial<UserState>>(
    ({ user }) => ({
      uid: user.uid,
      email: user.email,
    })
  );

  const [emailError, setEmailError] = useState('');
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  const emailInputChangeHandler = useEventCallback(({ target }) => {
    setSubmitButtonDisabled(target.value === currentEmail);
  });

  const submitButtonClickHandler = useEventCallback(() => {
    const email = emailInputRef.current?.value;

    if (showSummary) {
      closeModalCb();
      return;
    }

    if (emailValidator(email, true)) {
      if (!submitButtonDisabled) {
        dispatch(updateUserInfo({ uid, email }));
      }
    } else {
      setEmailError('A valid email is required');
    }
  });

  const deleteButtonClickHandler = useEventCallback(() => {
    if (event && api) {
      dispatch(deleteScheduledEvent({ eventId: (event as ScheduledEvent).id, api }));
      closeModalCb();
    }
  });

  return (
    <Dialog active={!!event} onClickClose={closeModalCb} onClickAway={closeModalCb}>
      <ScheduledEventPanel
        showCalendarLinks
        event={event}
        emailError={emailError}
        emailInputRef={emailInputRef}
        emailInputDisabled={showSummary}
        submitButtonDisabled={submitButtonDisabled && !showSummary}
        onEmailInputChange={emailInputChangeHandler}
        onClickSubmitButton={submitButtonClickHandler}
        submitButtonText={showSummary ? 'Got it' : 'Update Email'}>
        <Optional renderIf={!showSummary}>
          <DeleteButtonWrapper>
            <FormButton onClick={deleteButtonClickHandler} color={theme.colors.theme.error}>
              Delete Event
            </FormButton>
          </DeleteButtonWrapper>
        </Optional>
      </ScheduledEventPanel>
    </Dialog>
  );
};

export default ScheduledEventReviewModal;
