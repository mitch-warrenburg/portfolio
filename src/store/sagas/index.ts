import { adminLoginWatcher } from './userSagas';
import { rehydrateStateWatcher } from './globalSagas';
import { all, call, spawn } from 'redux-saga/effects';
import {
  userSessionsEventWatcher,
  fetchSendToUserIdWatcher,
  userConnectedEventWatcher,
  connectToChatServerWatcher,
  disconnectFromChatServerWatcher,
} from './chatSagas';

export default function* rootSaga() {
  const sagas = [
    adminLoginWatcher,
    rehydrateStateWatcher,
    userSessionsEventWatcher,
    fetchSendToUserIdWatcher,
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
