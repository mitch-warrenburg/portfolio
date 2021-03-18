import { UiState } from '../types';
import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';

const initialState: UiState = {
  hasRunIntro: false,
  isIntroRunning: false,
  isChatOpen: false,
  isChatMinimized: false,
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
    setIsChatOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isChatOpen = payload;
      state.isChatMinimized = !payload;
    },
    setIsChatMinimized: (state, { payload }: PayloadAction<boolean>) => {
      state.isChatMinimized = payload;
    },
  },
});

export const uiReducer = uiSlice.reducer;
export const {
  setIsChatOpen,
  setHasRunIntro,
  setIsIntroRunning,
  setIsChatMinimized,
} = uiSlice.actions;
