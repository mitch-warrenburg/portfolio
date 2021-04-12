import { Action, Reducer } from 'redux';
import { CalendarApi } from '@fullcalendar/react';
import { PersistPartial } from 'redux-persist/es/persistReducer';

export interface RootState {
  ui: UiState;
  chat: ChatState;
  user: UserState;
  scheduler: SchedulerState;
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
  recaptchaWidgetId?: number;
  captchaButtonId?: string;
  hasRunIntro: boolean;
  isChatOpen: boolean;
  isIntroRunning: boolean;
  isChatMinimized: boolean;
  isAuthFormModalOpen: boolean;
  authFormStatus: AuthFormStatus;
  notifications: Array<ActionResultNotification>;
}

export interface ChatState {
  users: ChatUsers;
  currentChatUid?: string;
  defaultChatUsername?: string;
  sessionId?: string;
  email?: string;
  phoneNumber?: string;
  error?: string;
  isConnecting: boolean;
}

export interface UserState {
  adminToken?: string;
  uid?: string;
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
  authFormDraft: AuthFormDraft;
}

export interface SchedulerState {
  error?: string;
  isLoading: boolean;
  pendingEvent?: PendingEvent;
  showSummary: boolean;
}

export type AuthFormStatus = 'phoneNumber' | 'confirmationCode' | 'userInfo';

export interface AuthFormDraft {
  email?: string;
  company: string;
  username: string;
  phoneNumber: string;
  confirmationCode: string;
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

export interface UserAuthResponse {
  uid: string;
  emailCount: number;
  phoneNumber: string;
  email?: string;
  company?: string;
  username?: string;
  metadata?: UserMetadata;
}

export interface AdminAuthResponse {
  uid: string;
  token: string;
  username: string;
  sessionId: string;
}

export interface UserUpdateResponse {
  uid: string;
  emailCount: number;
  phoneNumber: string;
  email?: string;
  company: string;
  username: string;
  metadata?: UserMetadata;
}

export type FetchUserResponse = UserUpdateResponse;

export interface UserUpdateRequest {
  uid: string;
  email?: string;
  company: string;
  username: string;
}

export type ChatUsers = {
  [uid: string]: ChatUser;
};

export interface ChatMessage {
  to: string;
  from: string;
  content: string;
}

export interface ChatUser {
  uid: string;
  typing: boolean;
  username: string;
  connected: boolean;
  messages: Array<ChatMessage>;
}

export interface NewSessionEvent {
  uid: string;
  sessionId: string;
  username: string;
}

export type UserSessionsEvent = Array<ChatUser>;

export interface UserConnectedEvent {
  uid: string;
  username: string;
}

export interface UserDisconnectedEvent {
  uid: string;
}

export interface AdminAuthPayload {
  username: string;
  password: string;
}

export interface FetchSendToUidResponse {
  uid: string;
  username: string;
}

export interface TypingEvent {
  to: string;
  from: string;
  typing: boolean;
}

export interface SendEmailRequest {
  uid: string;
  email: string;
  content: string;
}

export interface SendEmailActionPayload {
  email: string;
  content: string;
}

export interface SendEmailResponse {
  emailCount: number;
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

export interface ExtendedScheduledEventProps {
  currentUser: boolean;
}

export interface ScheduledEventDraft {
  end: string;
  start: string;
}

export interface ScheduledEventRequest extends ScheduledEventDraft {
  uid: string;
  email: string;
}

export interface PendingEvent extends ScheduledEventDraft {
  email: string;
}

export interface ScheduledEvent extends ScheduledEventDraft {
  id: number;
  extendedProps: ExtendedScheduledEventProps;
}

export interface CreateScheduledEventPayload extends ScheduledEventDraft {
  email: string;
  api: CalendarApi;
}

export interface DeleteScheduledEventPayload extends ScheduledEventDraft {
  eventId: number;
  api: CalendarApi;
}
