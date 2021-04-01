import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

export const initSentry = () => {
  Sentry.init({
    tracesSampleRate: 1.0,
    dsn: 'https://6f7682ada4dd4c61b8ca06fdf9c4d7ce@o562702.ingest.sentry.io/5701665',
    integrations: [new Integrations.BrowserTracing()],
  });
};
