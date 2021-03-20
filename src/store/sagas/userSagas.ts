import { client } from '../../http';
import { setIsChatOpen } from '../state/uiSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { takeEvery, call, put, delay, select } from 'redux-saga/effects';
import { AdminAuthPayload, AdminAuthResponse, UserState } from '../types';
import {
  resetUser,
  adminAuthFailure,
  adminAuthSuccess,
  adminLogoutFailure,
} from '../state/userSlice';
import {
  resetChat,
  connectToChatServer,
  disconnectFromChatServer,
  addAdminAuthSuccessDetails,
} from '../state/chatSlice';

export function* adminAuthWatcher() {
  yield takeEvery('user/adminAuth', adminAuthHandler);
}

export function* adminLogoutWatcher() {
  yield takeEvery('user/adminLogout', adminLogoutHandler);
}

export function* adminLogoutHandler() {
  try {
    const { token } = yield chatState();

    yield call(client.post, '/admin/logout', {
      headers: { Authorization: `bearer ${token}` },
    });

    yield put(disconnectFromChatServer({}));
    yield put(resetUser({}));
    yield put(resetChat({}));
    yield put(setIsChatOpen(false));
    // yield window.location.replace('/');
  } catch (e) {
    yield put(adminLogoutFailure({}));
  }
}

export function* adminAuthHandler({ payload: auth }: PayloadAction<AdminAuthPayload>) {
  try {
    yield delay(1000);
    const response: AdminAuthResponse = yield call(client.post, '/admin/auth', { auth });
    yield put(addAdminAuthSuccessDetails(response));
    yield put(adminAuthSuccess(response));
    yield put(connectToChatServer({}));
  } catch (e) {
    yield put(adminAuthFailure(e.message));
  }
}

export const chatState = () => {
  return select(({ user }) => user as UserState);
};
