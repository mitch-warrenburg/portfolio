import socket from '../../ws';
import { PayloadAction } from '@reduxjs/toolkit';
import { takeEvery, select, put, delay } from 'redux-saga/effects';
import { addUser, setUserConnected, setUsers } from '../state/chatSlice';
import { ChatState, ChatUsers, UserSessionsEvent, UserConnectedEvent } from '../types';

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
  const { users } = yield getChatState();
  const user = users[userId];

  if (user) {
    yield put(setUserConnected(userId));
  } else {
    yield addUser(
      setUserConnected({
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
