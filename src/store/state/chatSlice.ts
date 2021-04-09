import { identity } from 'lodash';
import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import {
  ChatUser,
  ChatState,
  ChatUsers,
  TypingEvent,
  ChatMessage,
  NewSessionEvent,
  UserDisconnectedEvent,
  FetchSendToUidResponse,
} from '../types';

const initialState: ChatState = {
  sessionId: undefined,
  error: undefined,
  email: undefined,
  phoneNumber: undefined,
  currentChatUid: undefined,
  defaultChatUsername: undefined,
  isLoading: false,
  isConnecting: false,
  users: {},
};

const chatSlice = createSlice<ChatState, SliceCaseReducers<ChatState>>({
  name: 'chat',
  initialState: initialState,
  reducers: {
    websocketError: identity,
    fetchSendToUser: identity,
    userSessionsEvent: identity,
    userConnectedEvent: identity,
    chatUserTypingEvent: (state, { payload }: PayloadAction<TypingEvent>) => {
      const user = state.users[payload.from];
      if (user) {
        user.typing = payload.typing;
      }
    },
    userDisconnectedEvent: (state, { payload }: PayloadAction<UserDisconnectedEvent>) => {
      const user = state.users[payload.uid];
      if (user) {
        user.connected = false;
      }
    },
    newSessionEvent: (state, { payload }: PayloadAction<NewSessionEvent>) => {
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
      state.users[payload.uid] = payload;
    },
    setUserConnected: (state, { payload }: PayloadAction<string>) => {
      state.users[payload].connected = true;
    },
    setCurrentChatUid: (state, { payload }: PayloadAction<string>) => {
      state.currentChatUid = payload;
    },
    fetchSendToUserFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
    fetchSendToUserSuccess: (state, { payload }: PayloadAction<FetchSendToUidResponse>) => {
      state.currentChatUid = payload.uid;
      state.defaultChatUsername = payload.username;
    },
    chatAuthFailure: state => {
      state.isConnecting = false;
      state.sessionId = undefined;
    },
    setSessionId: (state, { payload }: PayloadAction<string>) => {
      state.sessionId = payload;
    },
    resetChat: () => initialState,
  },
});

export const chatReducer = chatSlice.reducer;
export const {
  addUser,
  setUsers,
  resetChat,
  setSessionId,
  setChatError,
  websocketError,
  sentMessageAck,
  fetchSendToUser,
  newSessionEvent,
  chatAuthFailure,
  setUserConnected,
  userSessionsEvent,
  userConnectedEvent,
  connectToChatServer,
  privateMessageEvent,
  chatUserTypingEvent,
  setCurrentChatUid,
  userDisconnectedEvent,
  fetchSendToUserSuccess,
  fetchSendToUserFailure,
  disconnectFromChatServer,
  clearChatConnectionState,
} = chatSlice.actions;
