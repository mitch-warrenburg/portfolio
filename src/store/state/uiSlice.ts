import { UiState } from '../types';
import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';

const initialState: UiState = {
  hasRunIntro: false,
  isIntroRunning: false,
};

const uiSlice = createSlice<UiState, SliceCaseReducers<UiState>>({
  name: 'ui',
  initialState: initialState,
  reducers: {
    setHasRunIntro: (state, { payload }: PayloadAction<boolean>) => {
      state.hasRunIntro = payload;
    },
    setIsIntroRunning: (state, { payload }: PayloadAction<boolean>) => {
      state.isIntroRunning = payload;
    },
  },
});

export const uiReducer = uiSlice.reducer;
export const { setHasRunIntro, setIsIntroRunning } = uiSlice.actions;
