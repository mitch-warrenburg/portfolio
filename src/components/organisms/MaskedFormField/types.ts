import { Ref } from 'react';
import { FormFieldProps } from '../../molecules/FormField';

export interface MaskEvent {
  id?: string;
  name?: string;
  value?: string;
  pureValue?: string;
}

export type MaskChangeEventHandler = (event: MaskEvent) => any;

export interface MaskedFormFieldState {
  value: string;
  hiddenValue: string;
  cursorPosition: number;
}

export interface MaskedFormFieldProps extends FormFieldProps {
  mask?: string;
  value?: string;
  required?: boolean;
  ref?: Ref<HTMLInputElement>;
  onMask?: MaskChangeEventHandler;
}
