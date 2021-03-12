import { takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

export function* setIsIntroRunningWatcher() {
  yield takeEvery('ui/setHasRunIntro', handleSetIsIntroRunning);
}

export function* handleSetIsIntroRunning({ payload }: PayloadAction<boolean>) {}
