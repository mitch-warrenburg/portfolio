import { all, call, spawn } from 'redux-saga/effects';
import { hasIntroRunWatcher } from './uiSagas';

export default function* rootSaga() {
  const sagas = [hasIntroRunWatcher];

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
