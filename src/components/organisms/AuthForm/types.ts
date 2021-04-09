import { IconProps } from '../../atoms/Icon';
import { AuthFormStatus } from '../../../store/types';
import { HTMLAttributes, MutableRefObject } from 'react';

export interface AuthFormMessages {
  phoneNumber: string;
  userInfo: string;
  confirmationCode: string;
}

export type AutoFocusFields = {
  [key in AuthFormStatus]: MutableRefObject<HTMLInputElement | null> | undefined;
};

export interface AuthFormFieldsProps extends HTMLAttributes<HTMLDivElement> {
  prompt: string;
  icon: IconProps;
  authFormStatus: AuthFormStatus;
  currentAuthFormState: AuthFormStatus;
}

export interface AuthFormProps extends HTMLAttributes<HTMLDivElement> {
  isVisible?: boolean;
  onClickClose?: () => any;
  formMessages: AuthFormMessages;
}
