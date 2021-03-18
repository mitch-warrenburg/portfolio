import { identity } from 'lodash';
import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import {
  ChatState,
  NewSessionEvent,
  ChatUsers,
  ChatUser,
  ChatMessage,
  UserDisconnectedEvent,
} from '../types';

const initialState: ChatState = {
  userId: null,
  sessionId: null,
  username: null,
  email: null,
  phoneNumber: null,
  connected: false,
  currentChatUserId: null,
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
    },
    privateMessageEvent: (state, { payload }: PayloadAction<ChatMessage>) => {
      state.users[payload.from].messages.push(payload);
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
  addMessage,
  newSessionEvent,
  setUserConnected,
  userSessionsEvent,
  userConnectedEvent,
  privateMessageEvent,
  setCurrentChatUserId,
  userDisconnectedEvent,
} = chatSlice.actions;
