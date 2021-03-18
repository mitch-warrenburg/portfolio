import { client } from '../../http';
import { AdminLoginPayload } from '../types';
import { PayloadAction } from '@reduxjs/toolkit';
import { takeEvery, call, put, delay } from 'redux-saga/effects';
import { adminLoginFailure, adminLoginSuccess } from '../state/userSlice';

export function* adminLoginWatcher() {
  yield takeEvery('user/adminLogin', adminLoginHandler);
}

export function* adminLoginHandler({ payload: auth }: PayloadAction<AdminLoginPayload>) {
  try {
    yield delay(1000);
    yield call(client.post, '/admin/auth', { auth }, auth);
    yield (client.instance.defaults.auth = auth);
    yield put(adminLoginSuccess({}));
  } catch (e) {
    yield put(adminLoginFailure(e.message));
  }
}
