import { useCallback, useRef, useEffect } from 'react';
import { sendTypingEvent } from '../ws/socket';
import { TYPING_EVENT_DURATION_MS } from '../globalConstants';

export const useTypingEvents = (to = '', from = '') => {
  const toRef = useRef(to);
  const fromRef = useRef(from);
  const typingRef = useRef(false);
  const timerRef = useRef<number>();

  const resetTypingEvents = useCallback(() => {
    clearTimeout(timerRef.current);

    if (typingRef.current) {
      typingRef.current = false;
      sendTypingEvent({ to: toRef.current, from: fromRef.current, typing: false });
    }
  }, []);

  useEffect(() => resetTypingEvents, []);

  useEffect(() => {
    if (to !== toRef.current) {
      if (typingRef.current) {
        sendTypingEvent({ to: toRef.current, from, typing: false });
      }
      clearTimeout(timerRef.current);
      toRef.current = to;
      typingRef.current = false;
    }
  }, [to]);

  useEffect(() => {
    if (from !== fromRef.current) {
      if (typingRef.current) {
        sendTypingEvent({ to, from: fromRef.current, typing: false });
      }
      clearTimeout(timerRef.current);
      fromRef.current = from;
      typingRef.current = false;
    }
  }, [from]);

  const keyDownHandler = useCallback(() => {
    if (!typingRef.current) {
      sendTypingEvent({ to, from, typing: true });
      typingRef.current = true;
    }

    clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      typingRef.current = false;
      sendTypingEvent({ to, from, typing: false });
    }, TYPING_EVENT_DURATION_MS);
  }, [to, from]);

  return {
    keyDownHandler,
    resetTypingEvents,
  };
};

export default useTypingEvents;
