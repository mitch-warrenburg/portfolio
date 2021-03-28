import { uniqueId } from 'lodash';
import { client } from '../../http';
import { PayloadAction } from '@reduxjs/toolkit';
import { addNotification, setIsChatOpen } from '../state/uiSlice';
import { takeEvery, call, put, delay, select } from 'redux-saga/effects';
import { AdminAuthPayload, AdminAuthResponse, UserState, SendEmailRequest } from '../types';
import {
  resetUser,
  adminAuthFailure,
  adminAuthSuccess,
  sendEmailSuccess,
  sendEmailFailure,
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

export function* sendEmailWatcher() {
  yield takeEvery('user/sendEmail', sendEmailHandler);
}

export function* sendEmailHandler({ payload: email }: PayloadAction<SendEmailRequest>) {
  yield delay(1200);
  try {
    yield call(client.options, '/api/v1/email/send', {
      withCredentials: true,
    });
    yield call(
      client.post,
      '/api/v1/email/send',
      {
        withCredentials: true,
      },
      email
    );
    yield put(sendEmailSuccess(email));
    yield put(addNotification({ id: uniqueId(), text: 'Email Sent', type: 'success' }));
  } catch (e) {
    yield put(sendEmailFailure(e.message));
    yield put(
      addNotification({ id: uniqueId(), text: 'Failed to Send Email', type: 'failure' })
    );
  }
}

export function* adminLogoutHandler() {
  try {
    const { token } = yield chatState();

    yield call(client.post, '/api/v1/admin/logout', {
      headers: { Authorization: `Bearer ${token}` },
    });

    yield put(disconnectFromChatServer({}));
    yield put(resetUser({}));
    yield put(resetChat({}));
    yield put(setIsChatOpen(false));
    yield put(addNotification({ id: uniqueId(), text: 'Logged Out', type: 'success' }));
  } catch (e) {
    yield put(adminLogoutFailure({}));
    yield put(addNotification({ id: uniqueId(), text: 'Logout Failed', type: 'failure' }));
  }
}

export function* adminAuthHandler({ payload: auth }: PayloadAction<AdminAuthPayload>) {
  try {
    yield delay(1000);
    const response: AdminAuthResponse = yield call(client.post, '/api/v1/admin/auth', {
      auth,
    });
    yield put(addAdminAuthSuccessDetails(response));
    yield put(adminAuthSuccess(response));
    yield put(connectToChatServer({}));
    yield put(addNotification({ id: uniqueId(), text: 'Logged In', type: 'success' }));
  } catch (e) {
    yield put(adminAuthFailure(e.message));
    yield put(addNotification({ id: uniqueId(), text: 'Login Failed', type: 'failure' }));
  }
}

export const chatState = () => {
  return select(({ user }) => user as UserState);
};
