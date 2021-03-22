import { ChatEventType } from './store/types';

export const TYPING_EVENT_DURATION_MS = 1800;
export const INVALID_USERNAME = 'Invalid Username';
export const TOKEN_AUTH_ERROR_MSG = 'Authentication Error';

export const MESSAGE_ERROR: ChatEventType = 'connect';
export const CONNECT_ERROR: ChatEventType = 'connect_error';
export const NEW_SESSION: ChatEventType = 'NEW_SESSION';
export const USER_SESSIONS: ChatEventType = 'USER_SESSIONS';
export const TYPING_STATUS: ChatEventType = 'TYPING_STATUS';
export const USER_CONNECTED: ChatEventType = 'USER_CONNECTED';
export const PRIVATE_MESSAGE: ChatEventType = 'PRIVATE_MESSAGE';
export const USER_DISCONNECTED: ChatEventType = 'USER_DISCONNECTED';

export const anonymousAvatar =
  'https://toppng.com//public/uploads/preview/user-font-awesome-nuevo-usuario-icono-11563566658mjtfvilgcs.png';
export const adminAvatar = require('./assets/admin-avatar.jpg');
