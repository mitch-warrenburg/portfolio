import { client } from '../../http';
import { AdminLoginPayload, AdminLoginResponse } from '../types';
import { PayloadAction } from '@reduxjs/toolkit';
import { takeEvery, call, put, delay } from 'redux-saga/effects';
import { adminLoginFailure, adminLoginSuccess } from '../state/userSlice';
import { addAdminLoginSuccessDetails } from '../state/chatSlice';

export function* adminLoginWatcher() {
  yield takeEvery('user/adminLogin', adminLoginHandler);
}

export function* adminLoginHandler({ payload: auth }: PayloadAction<AdminLoginPayload>) {
  try {
    yield delay(1000);
    const response: AdminLoginResponse = yield call(client.post, '/admin/auth', { auth });
    yield (client.instance.defaults.auth = auth);
    yield put(adminLoginSuccess(response.username));
    yield put(addAdminLoginSuccessDetails(response));
  } catch (e) {
    yield put(adminLoginFailure(e.message));
  }
}
