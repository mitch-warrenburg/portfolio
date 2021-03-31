import socket from '../../ws';
import { State } from '../types';
import { resetUi } from '../state/uiSlice';
import { takeEvery, select, put, call } from 'redux-saga/effects';
import { clearUserLoadState, getUserMetadata, resetUser } from '../state/userSlice';
import {
  resetChat,
  fetchSendToUser,
  connectToChatServer,
  clearChatConnectionState,
} from '../state/chatSlice';

import { persistor } from '../index';

export function* rehydrateStateWatcher() {
  yield takeEvery('persist/REHYDRATE', handleAppInitialization);
}

export function* clearStateWatcher() {
  yield takeEvery('global/clearState', handleClearState);
}

export function* handleClearState() {
  yield put(resetUi({}));
  yield put(resetUser({}));
  yield put(resetChat({}));
  yield call(persistor.purge);
  yield window.location.replace('/');
}

export function* handleAppInitialization() {
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
  if (!chat.currentChatUserId || !chat.defaultChatUsername) {
    yield put(fetchSendToUser({}));
  }
  yield put(getUserMetadata({}));
}
