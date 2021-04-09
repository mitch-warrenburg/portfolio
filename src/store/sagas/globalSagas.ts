import socket from '../../ws';
import { State } from '../types';
import { persistor } from '../index';
import { takeEvery, select, put, call } from 'redux-saga/effects';
import { resetUi, setIsAuthFormModalOpen } from '../state/uiSlice';
import { clearUserLoadState, getUserMetadata, resetUser, fetchUser } from '../state/userSlice';
import {
  resetChat,
  fetchSendToUser,
  connectToChatServer,
  clearChatConnectionState,
} from '../state/chatSlice';

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
  const { ui, user, chat } = state;

  if (user.uid) {
    yield put(fetchUser(user.uid));
  }
  if (ui.isAuthFormModalOpen) {
    yield put(setIsAuthFormModalOpen(false));
  }
  if (user.isLoading || user.error) {
    yield put(clearUserLoadState(false));
  }
  if (chat.isConnecting || chat.error || chat.isLoading) {
    yield put(clearChatConnectionState({}));
  }
  if (user.uid && socket.disconnected) {
    yield put(connectToChatServer({}));
  }
  if (!chat.currentChatUid || !chat.defaultChatUsername) {
    yield put(fetchSendToUser({}));
  }
  yield put(getUserMetadata({}));
}
