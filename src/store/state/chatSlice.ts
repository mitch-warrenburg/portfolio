import { identity } from 'lodash';
import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import {
  ChatState,
  ChatUser,
  ChatUsers,
  ChatMessage,
  NewSessionEvent,
  AdminLoginResponse,
  UserDisconnectedEvent,
} from '../types';

const initialState: ChatState = {
  userId: undefined,
  sessionId: undefined,
  email: undefined,
  phoneNumber: undefined,
  token: undefined,
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
      state.users[payload.from === state.userId ? payload.to : payload.from]?.messages.push(
        payload
      );
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
    reconnectToChatServer: state => {
      state.isConnecting = true;
    },
    clearChatConnectionState: state => {
      state.error = undefined;
      state.isLoading = false;
      state.isConnecting = false;
    },
    setChatError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
    addChatMessage: (state, { payload }: PayloadAction<ChatMessage>) => {
      state.users[payload.to].messages.push(payload);
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
    addAdminAuthSuccessDetails: (state, { payload }: PayloadAction<AdminLoginResponse>) => {
      state.token = payload.token;
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
      state.token = undefined;
      state.isConnecting = false;
    },
  },
});

export const chatReducer = chatSlice.reducer;
export const {
  addUser,
  setUsers,
  setChatError,
  websocketError,
  addChatMessage,
  sentMessageAck,
  newSessionEvent,
  chatAuthFailure,
  setUserConnected,
  fetchSendToUserId,
  userSessionsEvent,
  userConnectedEvent,
  connectToChatServer,
  privateMessageEvent,
  setCurrentChatUserId,
  userDisconnectedEvent,
  reconnectToChatServer,
  fetchSendToUserIdSuccess,
  fetchSendToUserIdFailure,
  disconnectFromChatServer,
  clearChatConnectionState,
  addAdminAuthSuccessDetails,
} = chatSlice.actions;
