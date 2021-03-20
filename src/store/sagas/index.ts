import { adminLoginWatcher } from './userSagas';
import { rehydrateStateWatcher } from './globalSagas';
import { all, call, spawn } from 'redux-saga/effects';
import {
  websocketErrorWatcher,
  userSessionsEventWatcher,
  fetchSendToUserIdWatcher,
  userConnectedEventWatcher,
  connectToChatServerWatcher,
  reconnectToChatServerWatcher,
  disconnectFromChatServerWatcher,
} from './chatSagas';

export default function* rootSaga() {
  const sagas = [
    adminLoginWatcher,
    websocketErrorWatcher,
    rehydrateStateWatcher,
    userSessionsEventWatcher,
    fetchSendToUserIdWatcher,
    userConnectedEventWatcher,
    connectToChatServerWatcher,
    reconnectToChatServerWatcher,
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
