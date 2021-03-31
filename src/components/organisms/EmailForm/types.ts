import { HTMLAttributes, MutableRefObject } from 'react';

export interface ValidEmailForm {
  email: string;
  company: string;
  username: string;
  phoneNumber?: string;
}

export type ValidationTriggerCallback = () => ValidEmailForm | null;

export interface EmailFormProps extends HTMLAttributes<HTMLFormElement> {
  validationTriggerRef: MutableRefObject<ValidationTriggerCallback>;
}
