import { setIsIntroRunningWatcher } from './uiSagas';
import { all, call, spawn } from 'redux-saga/effects';

export default function* rootSaga() {
  const sagas = [setIsIntroRunningWatcher];

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
