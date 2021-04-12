import { takeEvery, call, put } from 'redux-saga/effects';
import { client } from '../../http';
import { setEmail } from '../state/userSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { userState, notify, uiState } from './globalSagas';
import {
  setShowSummary,
  deleteScheduledEventSuccess,
  deleteScheduledEventFailure,
  createScheduledEventSuccess,
  createScheduledEventFailure,
} from '../state/schedulerSlice';
import {
  ScheduledEventRequest,
  CreateScheduledEventPayload,
  DeleteScheduledEventPayload,
} from '../types';

export function* createScheduledEventWatcher() {
  yield takeEvery('scheduler/createScheduledEvent', createScheduledEventHandler);
}

export function* deleteScheduledEventWatcher() {
  yield takeEvery('scheduler/deleteScheduledEvent', deleteScheduledEventHandler);
}

export function* deleteScheduledEventHandler({
  payload: { eventId, api },
}: PayloadAction<DeleteScheduledEventPayload>) {
  try {
    yield call(client.delete, `/api/v1/scheduling/events/${eventId}`);
    yield api.refetchEvents();
    yield put(deleteScheduledEventSuccess({}));
    yield notify('Successfully deleted meeting', 'success');
  } catch (e) {
    yield put(deleteScheduledEventFailure(e.message));
    yield notify('Unable to delete meeting', 'failure');
  }
}

export function* createScheduledEventHandler({
  payload,
}: PayloadAction<CreateScheduledEventPayload>) {
  const { uid } = yield userState();
  const { start, end, email, api } = payload;

  try {
    const request: ScheduledEventRequest = { uid, start, end, email };
    yield call(client.post, '/api/v1/scheduling/events', request);
    yield api.refetchEvents();
    yield put(createScheduledEventSuccess({}));
    yield put(setEmail(email));
    const { authFormStatus } = yield uiState();
    console.log(authFormStatus);
    if (authFormStatus !== 'userInfo') {
      yield put(setShowSummary(true));
    }
    yield notify('Successfully scheduled meeting', 'success');
  } catch (e) {
    yield put(createScheduledEventFailure(e.message));
    yield notify('Unable to schedule meeting', 'failure');
  }
}
