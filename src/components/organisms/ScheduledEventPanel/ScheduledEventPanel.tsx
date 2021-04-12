import React, { FC, KeyboardEventHandler, useMemo } from 'react';
import { ScheduledEventReviewPanelProps } from './types';
import moment, { duration } from 'moment';
import Icon from '../../atoms/Icon';
import FlexBox from '../../atoms/FlexBox';
import { useSelector } from 'react-redux';
import Optional from '../../atoms/Optional';
import InfoText from '../../molecules/InfoText';
import FormField from '../../molecules/FormField';
import { useEventCallback } from '../../../hooks';
import FormButton from '../../molecules/FormButton';
import styled, { useTheme } from 'styled-components';
import { RootState, UserState } from '../../../store/types';
import ScheduledEventLinks from '../ScheduledEventLinks';

const DialogContentWrapper = styled.div<{ showLinks: boolean }>`
  display: flex;
  width: 100%;
  max-width: 380px;
  min-height: ${({ showLinks }) => (showLinks ? 460 : 400)}px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  @media screen and (max-width: 512px), screen and (max-height: 600px) {
    width: 100%;
    height: 100%;
    max-height: none;
    padding-bottom: 30px;
  }
`;

const MeetingSummaryText = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
`;

const DialogTitle = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  margin: 0 0 14px 0;
  color: lightsteelblue;
  text-align: left;
  vertical-align: baseline;

  h2 {
    margin: 3px 0 0 10px;
  }
`;

const UserText = styled.div`
  margin-bottom: 32px;
  font-size: 14px;

  p {
    margin-bottom: 8px;
  }

  h3 {
    color: lightsteelblue;
  }
`;

const EmailInputContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;

  > div {
    width: 100%;
    max-width: 300px;
  }
`;

const EmailInputMessage = styled.div`
  margin: -16px 0 0 8px;
  font-size: 12px;
  font-style: italic;
  text-align: left;
`;

const ScheduledEventPanel: FC<ScheduledEventReviewPanelProps> = ({
  event,
  children,
  emailError,
  emailInputRef,
  submitButtonText,
  showCalendarLinks,
  onEmailInputChange,
  emailInputDisabled,
  onClickSubmitButton,
  submitButtonDisabled,
  ...props
}) => {
  const theme = useTheme();
  const { email: currentEmail = '', isLoading } = useSelector<RootState, UserState>(
    ({ user }) => user
  );
  const meetingWithUsername = useSelector<RootState, string>(
    ({ chat }) => chat.defaultChatUsername || ''
  );

  const timeText = useMemo(() => {
    if (event) {
      const { start, end } = event;
      const dateTime = moment(start).format('LLLL');
      const endTime = moment(end).format('LT');
      return `${dateTime} - ${endTime}`;
    }
    return '';
  }, [event]);

  const emailInputKeyDownHandler: KeyboardEventHandler<HTMLInputElement> = useEventCallback(
    event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        onClickSubmitButton();
      }
    }
  );

  const eventDuration = useMemo(
    () => (event ? duration(moment(event.end).diff(moment(event.start))) : duration(0)),
    [event]
  );

  const durationText = useMemo(() => {
    if (eventDuration.asHours() < 1) {
      return `${eventDuration.asMinutes()} Minute Meeting`;
    }

    return `${eventDuration.asHours()} Hour Meeting`;
  }, [eventDuration]);

  const durationMinutesText = useMemo(() => `${eventDuration.asMinutes()} min`, [
    eventDuration,
  ]);

  return (
    <DialogContentWrapper {...props} showLinks={showCalendarLinks}>
      <FlexBox fullWidth direction="column" align="flex-start">
        <DialogTitle>
          <Icon icon="calendar-check" size="lg" color={theme.colors.theme.primary} />
          <h2>Meeting Confirmation</h2>
        </DialogTitle>
        <MeetingSummaryText>
          <UserText>
            <p>{meetingWithUsername}</p>
            <h3>{durationText}</h3>
          </UserText>
          <InfoText text={durationMinutesText} icon={{ icon: 'clock', size: 'lg' }} />
          <InfoText text={timeText} icon={{ icon: 'calendar-alt', size: 'lg' }} />
          <InfoText text="Pacific Time - US & Canada" icon={{ icon: 'globe', size: 'lg' }} />
        </MeetingSummaryText>
        <Optional renderIf={showCalendarLinks}>
          <ScheduledEventLinks event={event} />
        </Optional>
      </FlexBox>
      <FlexBox fullWidth direction="column">
        <EmailInputContainer>
          <FormField
            required
            autoFocus
            type="email"
            name="email"
            inputMode="email"
            label="Your Email"
            ref={emailInputRef}
            error={emailError}
            defaultValue={currentEmail}
            onChange={onEmailInputChange}
            onKeyDown={emailInputKeyDownHandler}
            disabled={isLoading || emailInputDisabled}
          />
          <Optional renderIf={!emailError}>
            <EmailInputMessage>
              * A confirmation email with be send with contact information
            </EmailInputMessage>
          </Optional>
        </EmailInputContainer>
        <FlexBox fullWidth justify={children ? 'center' : 'flex-end'}>
          {children}
          <FormButton disabled={submitButtonDisabled} onClick={onClickSubmitButton}>
            {submitButtonText}
          </FormButton>
        </FlexBox>
      </FlexBox>
    </DialogContentWrapper>
  );
};

export default ScheduledEventPanel;
