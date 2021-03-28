import { useCallback, useRef } from 'react';
import useEnhancedEffect from './useEnhancedEffect';

/**
 * https://github.com/facebook/react/issues/14099#issuecomment-440013892
 */
export default function useEventCallback<Args extends unknown[], Return>(
  fn: (...args: Args) => Return
): (...args: Args) => Return {
  const ref = useRef(fn);

  useEnhancedEffect(() => {
    ref.current = fn;
  });
  // noinspection CommaExpressionJS
  return useCallback(
    (...args: Args) =>
      // @ts-expect-error hide `this`
      // tslint:disable-next-line:ban-comma-operator
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (0, ref.current!)(...args),
    []
  );
}
