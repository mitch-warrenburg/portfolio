import socket from '../../ws';
import { State } from '../types';
import { clearUserLoadState } from '../state/userSlice';
import { takeEvery, select, put } from 'redux-saga/effects';
import {
  fetchSendToUserId,
  connectToChatServer,
  clearChatConnectionState,
} from '../state/chatSlice';

export function* rehydrateStateWatcher() {
  yield takeEvery('persist/REHYDRATE', initializeApp);
}

export function* initializeApp() {
  const state: State = yield select();
  const { user, chat } = state;

  if (user.isLoading || user.error) {
    yield put(clearUserLoadState(false));
  }
  if (chat.isConnecting || chat.error || chat.isLoading) {
    yield put(clearChatConnectionState({}));
  }
  if (chat.sessionId && chat.userId && socket.disconnected) {
    yield put(connectToChatServer({}));
  }
  if (!chat.currentChatUserId) {
    yield put(fetchSendToUserId({}));
  }
}
