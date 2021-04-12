import { HTMLAttributes, MutableRefObject, ChangeEventHandler } from 'react';
import { ScheduledEventDraft, ScheduledEvent } from '../../../store/types';

export interface ScheduledEventReviewPanelProps extends HTMLAttributes<HTMLDivElement> {
  showCalendarLinks: boolean;
  submitButtonText: string;
  submitButtonDisabled: boolean;
  onClickSubmitButton: () => any;
  emailError: string;
  emailInputRef: MutableRefObject<HTMLInputElement | null>;
  emailInputDisabled?: boolean;
  event?: ScheduledEventDraft | ScheduledEvent;
  onEmailInputChange?: ChangeEventHandler<HTMLInputElement>;
}
