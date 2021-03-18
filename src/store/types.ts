import { Action, Reducer } from 'redux';
import { PersistPartial } from 'redux-persist/es/persistReducer';

export interface RootState {
  ui: UiState;
  chat: ChatState;
}

export type State = RootState & PersistPartial;
export type PersistedRootReducer = Reducer<State, Action>;

export interface UiState {
  hasRunIntro: boolean;
  isIntroRunning: boolean;
}

export interface ChatState {
  users: ChatUsers;
  currentChatUserId?: string;
  userId?: string;
  sessionId?: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
  connected: boolean;
}

export type ChatUsers = {
  [userId: string]: ChatUser;
};

export interface ChatMessage {
  to: string;
  from: string;
  content: string;
}

export interface ChatUser {
  userId: string;
  username: string;
  connected: boolean;
  messages: Array<ChatMessage>;
}

export interface NewSessionEvent {
  userId: string;
  sessionId: string;
  username: string;
}

export type UserSessionsEvent = Array<ChatUser>;

export interface UserConnectedEvent {
  userId: string;
  username: string;
}

export interface UserDisconnectedEvent {
  userId: string;
}

export type ChatEventType =
  | 'NEW_SESSION'
  | 'USER_SESSIONS'
  | 'PRIVATE_MESSAGE'
  | 'USER_CONNECTED'
  | 'USER_DISCONNECTED';
