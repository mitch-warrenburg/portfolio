import { uniqueId } from 'lodash';
import { persistor } from '../index';
import { resetScheduler } from '../state/schedulerSlice';
import { takeEvery, select, put, call, delay } from 'redux-saga/effects';
import {
  State,
  UiState,
  UserState,
  ChatState,
  SchedulerState,
  ActionResultType,
} from '../types';
import { resetUi, setIsAuthFormModalOpen, addNotification } from '../state/uiSlice';
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
  yield put(resetScheduler({}));
  yield call(persistor.purge);
  yield window.location.replace('/');
}

export function* handleAppInitialization() {
  const state: State = yield select();
  const { ui, user, chat, scheduler } = state;

  if (user.uid && !user.isAdmin) {
    yield put(fetchUser(user.uid));
  }
  if (ui.isAuthFormModalOpen) {
    yield put(setIsAuthFormModalOpen(false));
  }
  if (
    scheduler.isLoading ||
    scheduler.error ||
    scheduler.showSummary ||
    scheduler.pendingEvent
  ) {
    yield put(resetScheduler({}));
  }
  if (user.isLoading || user.error) {
    yield put(clearUserLoadState(false));
  }
  if (chat.isConnecting || chat.error) {
    yield put(clearChatConnectionState({}));
  }
  if (!chat.currentChatUid || !chat.defaultChatUsername) {
    yield put(fetchSendToUser({}));
  }
  yield put(getUserMetadata({}));
  yield put(connectToChatServer({}));
}

export function* notify(text: string, type: ActionResultType, delayMs = 300) {
  yield delay(delayMs);
  yield put(addNotification({ id: uniqueId(), text, type }));
}

export const schedulerState = () => {
  return select(({ scheduler }) => scheduler as SchedulerState);
};

export const chatState = () => {
  return select(({ chat }) => chat as ChatState);
};

export const userState = (): UserState => {
  return (select(({ user }) => user) as unknown) as UserState;
};

export const uiState = (): UiState => {
  return (select(({ ui }) => ui) as unknown) as UiState;
};
