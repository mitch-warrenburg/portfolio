import { all, call, spawn } from 'redux-saga/effects';
import { rehydrateStateWatcher, clearStateWatcher } from './globalSagas';
import {
  adminAuthWatcher,
  sendEmailWatcher,
  adminLogoutWatcher,
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

export default function* rootSaga() {
  const sagas = [
    sendEmailWatcher,
    adminAuthWatcher,
    clearStateWatcher,
    adminLogoutWatcher,
    updateUserInfoWatcher,
    websocketErrorWatcher,
    rehydrateStateWatcher,
    getUserMetadataWatcher,
    fetchSendToUserWatcher,
    userSessionsEventWatcher,
    userConnectedEventWatcher,
    connectToChatServerWatcher,
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
