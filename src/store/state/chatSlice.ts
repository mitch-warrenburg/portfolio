import { identity } from 'lodash';
import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import {
  ChatState,
  ChatUser,
  ChatUsers,
  ChatMessage,
  NewSessionEvent,
  UserDisconnectedEvent,
} from '../types';

const initialState: ChatState = {
  userId: undefined,
  sessionId: undefined,
  username: undefined,
  email: undefined,
  phoneNumber: undefined,
  currentChatUserId: 'mw4',
  error: undefined,
  isConnecting: false,
  users: {},
};

const chatSlice = createSlice<ChatState, SliceCaseReducers<ChatState>>({
  name: 'chat',
  initialState: initialState,
  reducers: {
    userSessionsEvent: identity,
    userConnectedEvent: identity,
    userDisconnectedEvent: (state, { payload }: PayloadAction<UserDisconnectedEvent>) => {
      state.users[payload.userId].connected = false;
    },
    newSessionEvent: (state, { payload }: PayloadAction<NewSessionEvent>) => {
      state.userId = payload.userId;
      state.sessionId = payload.sessionId;
      state.isConnecting = false;
    },
    privateMessageEvent: (state, { payload }: PayloadAction<ChatMessage>) => {
      state.users[payload.from === state.userId ? payload.to : payload.from].messages.push(
        payload
      );
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
      state.isConnecting = false;
    },
    setError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
    addMessage: (state, { payload }: PayloadAction<ChatMessage>) => {
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
  },
});

export const chatReducer = chatSlice.reducer;
export const {
  addUser,
  setUsers,
  setError,
  addMessage,
  newSessionEvent,
  setUserConnected,
  userSessionsEvent,
  userConnectedEvent,
  connectToChatServer,
  privateMessageEvent,
  setCurrentChatUserId,
  userDisconnectedEvent,
  disconnectFromChatServer,
  clearChatConnectionState,
} = chatSlice.actions;
