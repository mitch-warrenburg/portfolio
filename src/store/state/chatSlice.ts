import { identity } from 'lodash';
import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import {
  ChatUser,
  ChatState,
  ChatUsers,
  TypingEvent,
  ChatMessage,
  NewSessionEvent,
  AdminAuthResponse,
  UserDisconnectedEvent,
} from '../types';

const initialState: ChatState = {
  userId: undefined,
  sessionId: undefined,
  email: undefined,
  phoneNumber: undefined,
  currentChatUserId: undefined,
  error: undefined,
  isConnecting: false,
  isLoading: false,
  users: {},
};

const chatSlice = createSlice<ChatState, SliceCaseReducers<ChatState>>({
  name: 'chat',
  initialState: initialState,
  reducers: {
    websocketError: identity,
    userSessionsEvent: identity,
    userConnectedEvent: identity,
    chatUserTypingEvent: (state, { payload }: PayloadAction<TypingEvent>) => {
      const user = state.users[payload.from];
      if (user) {
        user.typing = payload.typing;
      }
    },
    userDisconnectedEvent: (state, { payload }: PayloadAction<UserDisconnectedEvent>) => {
      const user = state.users[payload.userId];
      if (user) {
        user.connected = false;
      }
    },
    newSessionEvent: (state, { payload }: PayloadAction<NewSessionEvent>) => {
      state.userId = payload.userId;
      state.sessionId = payload.sessionId;
      state.isConnecting = false;
    },
    privateMessageEvent: (state, { payload }: PayloadAction<ChatMessage>) => {
      state.users[payload.from]?.messages.push(payload);
    },
    sentMessageAck: (state, { payload }: PayloadAction<ChatMessage>) => {
      state.users[payload.to]?.messages.push(payload);
    },
    connectToChatServer: state => {
      state.error = undefined;
      state.isConnecting = true;
    },
    disconnectFromChatServer: state => {
      state.isConnecting = false;
    },
    clearChatConnectionState: state => {
      state.error = undefined;
      state.isLoading = false;
      state.isConnecting = false;
    },
    setChatError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
    setUsers: (state, { payload }: PayloadAction<ChatUsers>) => {
      state.users = payload;
    },
    addUser: (state, { payload }: PayloadAction<ChatUser>) => {
      state.users[payload.userId] = payload;
    },
    setUserConnected: (state, { payload }: PayloadAction<string>) => {
      state.users[payload].connected = true;
    },
    setCurrentChatUserId: (state, { payload }: PayloadAction<string>) => {
      state.currentChatUserId = payload;
    },
    addAdminAuthSuccessDetails: (state, { payload }: PayloadAction<AdminAuthResponse>) => {
      state.userId = payload.userId;
      state.sessionId = payload.sessionId;
      state.currentChatUserId = undefined;
    },
    fetchSendToUserId: state => {
      state.isLoading = true;
    },
    fetchSendToUserIdFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.isLoading = false;
    },
    fetchSendToUserIdSuccess: (state, { payload }: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = undefined;
      state.currentChatUserId = payload;
    },
    chatAuthFailure: state => {
      state.isConnecting = false;
      state.userId = undefined;
      state.sessionId = undefined;
    },
    resetChat: () => initialState,
  },
});

export const chatReducer = chatSlice.reducer;
export const {
  addUser,
  setUsers,
  resetChat,
  setChatError,
  websocketError,
  sentMessageAck,
  newSessionEvent,
  chatAuthFailure,
  setUserConnected,
  fetchSendToUserId,
  userSessionsEvent,
  userConnectedEvent,
  connectToChatServer,
  privateMessageEvent,
  chatUserTypingEvent,
  setCurrentChatUserId,
  userDisconnectedEvent,
  fetchSendToUserIdSuccess,
  fetchSendToUserIdFailure,
  disconnectFromChatServer,
  clearChatConnectionState,
  addAdminAuthSuccessDetails,
} = chatSlice.actions;
