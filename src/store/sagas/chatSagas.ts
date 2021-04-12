import socket from '../../ws';
import client from '../../http/client';
import { PayloadAction } from '@reduxjs/toolkit';
import { chatState, userState } from './globalSagas';
import { takeEvery, put, delay, call } from 'redux-saga/effects';
import { INVALID_USER_ERROR_MSG, AUTH_ERROR_MSG } from '../../globalConstants';
import {
  addUser,
  setUsers,
  setChatError,
  fetchSendToUser,
  chatAuthFailure,
  setUserConnected,
  fetchSendToUserFailure,
  fetchSendToUserSuccess,
  clearChatConnectionState,
} from '../state/chatSlice';
import {
  ChatUsers,
  UserSessionsEvent,
  UserConnectedEvent,
  FetchSendToUidResponse,
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
  if ([INVALID_USER_ERROR_MSG, AUTH_ERROR_MSG].includes(error?.message)) {
    yield socket.disconnect();
    yield put(setChatError(error.message));
    yield put(chatAuthFailure({}));
    yield put(fetchSendToUser({}));
  }
}

export function* fetchSendToUserHandler() {
  try {
    const response: FetchSendToUidResponse = yield call(
      client.get,
      '/api/v1/chat/default-user'
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
  const { uid, username } = yield userState();

  if (uid && username) {
    yield socket.disconnect();
    yield delay(250);
    yield socket.connect();
  } else {
    yield put(clearChatConnectionState({}));
  }
}

export function* userSessionsEventHandler({
  payload: userSessions,
}: PayloadAction<UserSessionsEvent>) {
  const users: ChatUsers = yield userSessions.reduce(
    (prev, current) => ({
      ...prev,
      [current.uid]: current,
    }),
    {}
  );
  yield put(setUsers(users));
}

export function* userConnectedEventHandler({
  payload: { uid, username },
}: PayloadAction<UserConnectedEvent>) {
  const { users } = yield chatState();
  const user = users[uid];

  if (user) {
    yield put(setUserConnected(uid));
  } else {
    yield put(
      addUser({
        uid,
        username,
        messages: [],
        connected: true,
      })
    );
  }
}
