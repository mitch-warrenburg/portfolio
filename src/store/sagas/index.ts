import { rehydrateStateWatcher } from './globalSagas';
import { all, call, spawn } from 'redux-saga/effects';
import { adminAuthWatcher, adminLogoutWatcher, sendEmailWatcher } from './userSagas';
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
    adminLogoutWatcher,
    websocketErrorWatcher,
    rehydrateStateWatcher,
    fetchSendToUserWatcher,
    userSessionsEventWatcher,
    userConnectedEventWatcher,
    connectToChatServerWatcher,
    disconnectFromChatServerWatcher,
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
