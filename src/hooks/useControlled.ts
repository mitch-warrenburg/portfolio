/* eslint-disable react-hooks/rules-of-hooks, react-hooks/exhaustive-deps, no-console */
import { UseControlledProps } from './types';
import { useRef, useState, useEffect, SetStateAction, useCallback } from 'react';

export default function useControlled<T = unknown>({
  name,
  controlled,
  default: defaultProp,
}: UseControlledProps<T>): [T | undefined, (action: SetStateAction<T | undefined>) => void] {
  // isControlled is ignored in the hook dependency lists as it should never change.
  const { current: isControlled } = useRef(controlled !== undefined);
  const [valueState, setValue] = useState(defaultProp);

  const value = isControlled ? controlled : valueState;

  if (process.env.NODE_ENV !== 'production') {
    useEffect(() => {
      if (isControlled !== (controlled !== undefined)) {
        console.error(
          [
            `LRDS: A component is changing the ${
              isControlled ? '' : 'un'
            }controlled value state of ${name} to be ${isControlled ? 'un' : ''}controlled.`,
            'Elements should not switch from uncontrolled to controlled (or vice versa).',
            `Decide between using a controlled or uncontrolled ${name} ` +
              'element for the lifetime of the component.',
            "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.",
          ].join('\n')
        );
      }
    }, [name, controlled]);

    const { current: defaultValue } = useRef(defaultProp);

    useEffect(() => {
      if (!isControlled && defaultValue !== defaultProp) {
        console.error(
          [
            `LRDS: A component is changing the default value state of an uncontrolled ${name} after being initialized. ` +
              `To suppress this warning opt to use a controlled ${name}.`,
          ].join('\n')
        );
      }
    }, [JSON.stringify(defaultProp)]);
  }

  const setValueIfUncontrolled = useCallback((newValue: SetStateAction<T | undefined>) => {
    if (!isControlled) {
      setValue(newValue);
    }
  }, []);

  return [value, setValueIfUncontrolled];
}
