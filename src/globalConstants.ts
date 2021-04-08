import { ChatEventType } from './store/types';

export const MAX_EMAIL_COUNT = 5;
export const TYPING_EVENT_DURATION_MS = 1800;
export const INVALID_USER_ERROR_MSG = 'invalid user';
export const AUTH_ERROR_MSG = 'authentication failed';

export const CONNECT: ChatEventType = 'connect';
export const DISCONNECT: ChatEventType = 'disconnect';
export const CONNECT_ERROR: ChatEventType = 'connect_error';
export const NEW_SESSION: ChatEventType = 'NEW_SESSION';
export const USER_SESSIONS: ChatEventType = 'USER_SESSIONS';
export const TYPING_STATUS: ChatEventType = 'TYPING_STATUS';
export const USER_CONNECTED: ChatEventType = 'USER_CONNECTED';
export const PRIVATE_MESSAGE: ChatEventType = 'PRIVATE_MESSAGE';
export const USER_DISCONNECTED: ChatEventType = 'USER_DISCONNECTED';

export const LOGO = require('./assets/logo.png');
export const ADMIN_AVATAR = require('./assets/avatar-admin.jpg');
export const ANONYMOUS_AVATAR =
  'https://toppng.com//public/uploads/preview/user-font-awesome-nuevo-usuario-icono-11563566658mjtfvilgcs.png';
