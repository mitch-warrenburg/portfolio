import socket from '../../ws';
import { uniqueId } from 'lodash';
import client from '../../http/client';
import { PayloadAction } from '@reduxjs/toolkit';
import { addNotification } from '../state/uiSlice';
import { adminAuthFailure } from '../state/userSlice';
import { takeEvery, select, put, delay, call } from 'redux-saga/effects';
import { TOKEN_AUTH_ERROR_MSG, INVALID_USERNAME } from '../../globalConstants';
import {
  addUser,
  setUsers,
  setChatError,
  fetchSendToUser,
  chatAuthFailure,
  setUserConnected,
  fetchSendToUserFailure,
  fetchSendToUserSuccess,
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

export function* fetchSendToUserWatcher() {
  yield takeEvery('chat/fetchSendToUser', fetchSendToUserHandler);
}

export function* websocketErrorWatcher() {
  yield takeEvery('chat/websocketError', websocketErrorHandler);
}

export function* websocketErrorHandler({ payload: error }: PayloadAction<Error>) {
  yield console.error(error?.message);

  if ([TOKEN_AUTH_ERROR_MSG, INVALID_USERNAME].includes(error?.message)) {
    yield socket.disconnect();
    yield put(setChatError(error.message));
    yield put(chatAuthFailure({}));
    yield put(adminAuthFailure(error.message));
    yield put(fetchSendToUser({}));
    yield put(
      addNotification({ id: uniqueId(), text: 'Messenger Failed to Connect', type: 'failure' })
    );
  }
}

export function* fetchSendToUserHandler() {
  try {
    const response: FetchSendToUserIdResponse = yield call(
      client.get,
      '/api/v1/chat/defaultSendToUser'
    );
    yield put(fetchSendToUserSuccess(response));
  } catch (e) {
    yield put(fetchSendToUserFailure(e.message));
  }
}

export function* disconnectFromChatServerHandler() {
  yield socket.disconnect();
}

export function* connectToChatServerHandler() {
  yield delay(1500);
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
  const { users } = yield chatState();
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
  yield put(addNotification({ id: uniqueId(), text: 'Messenger Connected', type: 'success' }));
}

export const chatState = () => {
  return select(({ chat }) => chat as ChatState);
};
