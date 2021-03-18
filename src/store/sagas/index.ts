import { setIsIntroRunningWatcher } from './uiSagas';
import { all, call, spawn } from 'redux-saga/effects';
import { userSessionsEventWatcher, userConnectedEventWatcher } from './chatSagas';

export default function* rootSaga() {
  const sagas = [
    setIsIntroRunningWatcher,
    userSessionsEventWatcher,
    userConnectedEventWatcher,
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
