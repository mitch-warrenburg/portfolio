import socket from '../../ws';
import client from '../../http/client';
import { PayloadAction } from '@reduxjs/toolkit';
import { adminAuthFailure } from '../state/userSlice';
import { TOKEN_AUTH_ERROR_MSG } from '../../globalConstants';
import { takeEvery, select, put, delay, call } from 'redux-saga/effects';
import {
  addUser,
  setUsers,
  setChatError,
  chatAuthFailure,
  setUserConnected,
  fetchSendToUserIdFailure,
  fetchSendToUserIdSuccess,
} from '../state/chatSlice';
import {
  ChatState,
  ChatUsers,
  UserSessionsEvent,
  UserConnectedEvent,
  FetchSendToUserIdResponse,
} from '../types';

export function* userSessionsEventWatcher() {
  yield takeEvery('chat/userSessionsEvent', userSessionsEventHandler);
}

export function* userConnectedEventWatcher() {
  yield takeEvery('chat/userConnectedEvent', userConnectedEventHandler);
}

export function* connectToChatServerWatcher() {
  yield takeEvery('chat/connectToChatServer', connectToChatServerHandler);
}

export function* disconnectFromChatServerWatcher() {
  yield takeEvery('chat/disconnectFromChatServer', disconnectFromChatServerHandler);
}

export function* reconnectToChatServerWatcher() {
  yield takeEvery('chat/reconnectToChatServer', reconnectToChatServerHandler);
}

export function* fetchSendToUserIdWatcher() {
  yield takeEvery('chat/fetchSendToUserId', fetchSendToUserIdHandler);
}

export function* websocketErrorWatcher() {
  yield takeEvery('chat/websocketError', websocketErrorHandler);
}

export function* websocketErrorHandler({ payload: error }: PayloadAction<Error>) {
  yield console.error(error?.message);


  if (error?.message === TOKEN_AUTH_ERROR_MSG) {
    yield socket.disconnect();
    yield put(setChatError(error.message));
    yield put(chatAuthFailure({}));
    yield put(adminAuthFailure(error.message));
    // yield window.location.replace('/');
  }
}

export function* fetchSendToUserIdHandler() {
  try {
    const response: FetchSendToUserIdResponse = yield call(
      client.get,
      '/api/v1/chat/defaultSendToUserId'
    );
    yield put(fetchSendToUserIdSuccess(response.userId));
  } catch (e) {
    yield put(fetchSendToUserIdFailure(e.message));
  }
}

export function* disconnectFromChatServerHandler() {
  yield socket.disconnect();
}

export function* connectToChatServerHandler() {
  yield delay(1500);
  yield socket.connect();
}

export function* reconnectToChatServerHandler() {
  yield socket.disconnect();
  yield socket.connect();
}

export function* userSessionsEventHandler({
  payload: userSessions,
}: PayloadAction<UserSessionsEvent>) {
  const users: ChatUsers = yield userSessions.reduce(
    (prev, current) => ({
      ...prev,
      [current.userId]: current,
    }),
    {}
  );
  yield put(setUsers(users));
}

export function* userConnectedEventHandler({
  payload: { userId, username },
}: PayloadAction<UserConnectedEvent>) {
  const { users } = yield getChatState();
  const user = users[userId];

  if (user) {
    yield put(setUserConnected(userId));
  } else {
    yield put(
      addUser({
        userId,
        username,
        messages: [],
        connected: true,
      })
    );
  }
}

export function getChatState() {
  return select(({ chat }) => chat as ChatState);
}
