import { ChatEventType } from "../store/types";

export const NEW_SESSION: ChatEventType = 'NEW_SESSION';
export const USER_SESSIONS: ChatEventType = 'USER_SESSIONS';
export const MESSAGE_ERROR: ChatEventType = 'connect';
export const CONNECT_ERROR: ChatEventType = 'connect_error';
export const PRIVATE_MESSAGE: ChatEventType = 'PRIVATE_MESSAGE';
export const USER_CONNECTED: ChatEventType = 'USER_CONNECTED';
export const USER_DISCONNECTED: ChatEventType = 'USER_DISCONNECTED';
