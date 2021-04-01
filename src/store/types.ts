import { Action, Reducer } from 'redux';
import { EventInput } from '@fullcalendar/common';
import { PersistPartial } from 'redux-persist/es/persistReducer';

export interface RootState {
  ui: UiState;
  chat: ChatState;
  user: UserState;
}

export type State = RootState & PersistPartial;
export type PersistedRootReducer = Reducer<State, Action>;

export type ActionResultType = 'success' | 'failure';

export interface ActionResultNotification {
  id: string;
  text: string;
  type: ActionResultType;
}

export interface UiState {
  hasRunIntro: boolean;
  isChatOpen: boolean;
  isIntroRunning: boolean;
  isChatMinimized: boolean;
  notifications: Array<ActionResultNotification>;
}

export interface ChatState {
  users: ChatUsers;
  currentChatUserId?: string;
  defaultChatUsername?: string;
  userId?: string;
  sessionId?: string;
  email?: string;
  phoneNumber?: string;
  error?: string;
  isConnecting: boolean;
  isLoading: boolean;
}

export interface UserState {
  token?: string;
  email?: string;
  company?: string;
  username?: string;
  phoneNumber?: string;
  error?: string;
  emailCount: number;
  isAdmin: boolean;
  isLoading: boolean;
  isEmailSuccess: boolean;
  userMetadata: UserMetadata;
}

export interface UserMetadata {
  error?: string;
  isMobile?: boolean;
  fingerprint?: number;
  os?: OsMetadata;
  device?: DeviceMetadata;
  locale?: LocaleMetadata;
  screen?: ScreenMetadata;
  browser?: BrowserMetadata;
  storage?: StorageMetadata;
}

export interface DeviceMetadata {
  cpu?: string;
  type?: string;
  device?: string;
  vendor?: string;
}

export interface LocaleMetadata {
  timeZone?: string;
  language?: string;
  systemLanguage?: string;
}

export interface StorageMetadata {
  isCookies?: boolean;
  isLocalStorage?: boolean;
  isSessionStorage?: boolean;
}

export interface ScreenMetadata {
  resolution?: string;
  screenInfo?: string;
  availableResolution?: string;
}

export interface IosMetadata {
  isIpad?: boolean;
  isIos?: boolean;
  isIphone?: boolean;
}

export interface BrowserMetadata {
  name?: string;
  version?: string;
  fullVersion?: string;
}

export interface OsMetadata {
  name?: string;
  version?: string;
  ios?: IosMetadata;
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
  typing: boolean;
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

export interface SubmitChatFormPayload {
  company: string;
  username: string;
}

export interface AdminAuthPayload {
  username: string;
  password: string;
}

export interface AdminAuthResponse {
  token: string;
  userId: string;
  username: string;
  password: string;
  sessionId: string;
}

export interface FetchSendToUserIdResponse {
  userId: string;
  username: string;
}

export interface TypingEvent {
  to: string;
  from: string;
  typing: boolean;
}

export interface SendEmailRequest {
  name: string;
  address: string;
  company: string;
  content: string;
  phoneNumber?: string;
}

export type ChatEventType =
  | 'NEW_SESSION'
  | 'USER_SESSIONS'
  | 'PRIVATE_MESSAGE'
  | 'USER_CONNECTED'
  | 'USER_DISCONNECTED'
  | 'TYPING_STATUS'
  | 'connect_error'
  | 'connect'
  | 'disconnect';

export interface EventUserInfo {
  username: string;
}

export interface ScheduleEvent extends EventInput {
  extendedProps: {};
}
