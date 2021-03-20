import { client } from '../../http';
import { PayloadAction } from '@reduxjs/toolkit';
import { takeEvery, call, put, delay } from 'redux-saga/effects';
import { AdminLoginPayload, AdminLoginResponse } from '../types';
import { adminAuthFailure, adminAuthSuccess } from '../state/userSlice';
import { addAdminAuthSuccessDetails, connectToChatServer } from '../state/chatSlice';

export function* adminLoginWatcher() {
  yield takeEvery('user/adminLogin', adminLoginHandler);
}

export function* adminLoginHandler({ payload: auth }: PayloadAction<AdminLoginPayload>) {
  try {
    yield delay(1000);
    const response: AdminLoginResponse = yield call(client.post, '/admin/auth', { auth });
    yield (client.instance.defaults.auth = auth);
    yield put(addAdminAuthSuccessDetails(response));
    yield put(adminAuthSuccess(response.username));
    yield put(connectToChatServer({}));
  } catch (e) {
    yield put(adminAuthFailure(e.message));
  }
}
