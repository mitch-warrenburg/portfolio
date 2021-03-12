import { takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

export function* hasIntroRunWatcher() {
  yield takeEvery('ui/setHasRunIntro', handleSetHasRunIntro);
}

export function* handleSetHasRunIntro({ payload }: PayloadAction<boolean>) {
  yield console.log('setting hasIntroRun:', payload);
}
