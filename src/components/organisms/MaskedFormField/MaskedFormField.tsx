import React, {
  Ref,
  useRef,
  useState,
  useEffect,
  forwardRef,
  FormEventHandler,
  FocusEventHandler,
} from 'react';
import FormField from '../../molecules/FormField';
import { useForkRef, useEventCallback } from '../../../hooks';
import { MaskedFormFieldState, MaskedFormFieldProps } from './types';
import { applyMask, hideValue, getPureValue, getNewCursorPosition } from '../../../util';

const MaskedFormField = forwardRef<HTMLInputElement, MaskedFormFieldProps>(
  (
    { id, name, mask, style, value, onBlur, onMask, onFocus, onInput, disabled, ...props },
    forwardedRef: Ref<HTMLInputElement>
  ) => {
    const innerRef = useRef<HTMLInputElement>(null);
    const ref = useForkRef<HTMLInputElement>(forwardedRef, innerRef);

    const [state, setState] = useState<MaskedFormFieldState>({
      hiddenValue: '',
      cursorPosition: 0,
      value: applyMask(value, mask),
    });

    const inputHandler: FormEventHandler<HTMLInputElement> = useEventCallback(event => {
      const {
        value: newValue,
        selectionStart: cursorPosition,
      } = event.target as HTMLInputElement;

      const maskedValue = applyMask(newValue, mask);

      setState(prev => {
        return {
          ...prev,
          value: maskedValue,
          hiddenValue: hideValue(maskedValue, mask, true),
          cursorPosition: getNewCursorPosition(
            cursorPosition,
            maskedValue,
            prev.value,
            newValue
          ),
        };
      });

      onInput && onInput(event);
      onMask &&
        onMask({
          id,
          name,
          value: maskedValue,
          pureValue: getPureValue(maskedValue),
        });
    });

    const blurHandler: FocusEventHandler<HTMLInputElement> = useEventCallback(event => {
      setState(prev => ({
        ...prev,
        hiddenValue: hideValue(prev.value, mask, false),
        cursorPosition: prev.value.length,
      }));
      onBlur && onBlur(event);
    });

    const focusHandler: FocusEventHandler<HTMLInputElement> = useEventCallback(event => {
      setState(prev => ({
        ...prev,
        hiddenValue: hideValue(prev.value, mask, true),
        cursorPosition: prev.value.length,
      }));
      onFocus && onFocus(event);
    });

    const { cursorPosition } = state;

    useEffect(() => {
      cursorPosition && innerRef.current?.setSelectionRange(cursorPosition, cursorPosition);
    }, [cursorPosition, innerRef]);

    useEffect(() => {
      setState(prev => {
        const maskedValue = applyMask(value || prev.value, mask);
        const showLastChar = document.activeElement === innerRef.current;
        const hiddenValue = hideValue(maskedValue, mask, showLastChar);

        return { ...prev, value: maskedValue, hiddenValue };
      });
    }, [value, mask, ref]);

    return (
      <FormField
        {...props}
        type="text"
        id={id}
        ref={ref}
        name={name}
        style={style}
        onChange={() => {}}
        disabled={disabled}
        value={state.value}
        onBlur={blurHandler}
        onFocus={focusHandler}
        onInput={inputHandler}
      />
    );
  }
);

MaskedFormField.defaultProps = {
  required: false,
};

export default MaskedFormField;
