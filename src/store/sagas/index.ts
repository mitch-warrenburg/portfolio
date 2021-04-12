import { all, call, spawn } from 'redux-saga/effects';
import { rehydrateStateWatcher, clearStateWatcher } from './globalSagas';
import {
  adminAuthWatcher,
  sendEmailWatcher,
  fetchUserWatcher,
  adminLogoutWatcher,
  updateEmailWatcher,
  updateUserInfoWatcher,
  getUserMetadataWatcher,
  authenticatePhoneNumberWatcher,
  advanceToNextAuthFormStateWatcher,
  authenticateConfirmationCodeWatcher,
} from './userSagas';
import {
  websocketErrorWatcher,
  fetchSendToUserWatcher,
  userSessionsEventWatcher,
  userConnectedEventWatcher,
  connectToChatServerWatcher,
  disconnectFromChatServerWatcher,
} from './chatSagas';
import { createScheduledEventWatcher, deleteScheduledEventWatcher } from './schedulerSagas';

export default function* rootSaga() {
  const sagas = [
    fetchUserWatcher,
    sendEmailWatcher,
    adminAuthWatcher,
    clearStateWatcher,
    updateEmailWatcher,
    adminLogoutWatcher,
    updateUserInfoWatcher,
    websocketErrorWatcher,
    rehydrateStateWatcher,
    getUserMetadataWatcher,
    fetchSendToUserWatcher,
    userSessionsEventWatcher,
    userConnectedEventWatcher,
    connectToChatServerWatcher,
    createScheduledEventWatcher,
    deleteScheduledEventWatcher,
    authenticatePhoneNumberWatcher,
    disconnectFromChatServerWatcher,
    advanceToNextAuthFormStateWatcher,
    authenticateConfirmationCodeWatcher,
  ];

  yield all(
    sagas.map(saga =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.error(e);
          }
        }
      })
    )
  );
}
