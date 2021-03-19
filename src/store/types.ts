import { Action, Reducer } from 'redux';
import { PersistPartial } from 'redux-persist/es/persistReducer';

export interface RootState {
  ui: UiState;
  chat: ChatState;
  user: UserState;
}

export type State = RootState & PersistPartial;
export type PersistedRootReducer = Reducer<State, Action>;

export interface UiState {
  hasRunIntro: boolean;
  isIntroRunning: boolean;
  isChatOpen: boolean;
  isChatMinimized: boolean;
}

export interface ChatState {
  users: ChatUsers;
  currentChatUserId?: string;
  userId?: string;
  sessionId?: string;
  email?: string;
  phoneNumber?: string;
  error?: string;
  isConnecting: boolean;
  isLoading: boolean;
}

export interface UserState {
  email?: string;
  company?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  error?: string;
  isLoading: boolean;
  isAdmin: boolean;
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
  | 'USER_DISCONNECTED'
  | 'connect_error';

export interface SubmitChatFormPayload {
  company: string;
  username: string;
  firstName: string;
  lastName: string;
}

export interface AdminLoginPayload {
  username: string;
  password: string;
}

export interface AdminLoginResponse {
  userId: string;
  username: string;
  password: string;
  sessionId: string;
}

export interface FetchSendToUserIdResponse {
  userId: string;
}