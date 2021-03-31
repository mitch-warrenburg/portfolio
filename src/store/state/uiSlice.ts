import { UiState, ActionResultNotification } from '../types';
import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';

const initialState: UiState = {
  hasRunIntro: false,
  isChatOpen: false,
  isIntroRunning: false,
  isChatMinimized: false,
  notifications: [],
};

const uiSlice = createSlice<UiState, SliceCaseReducers<UiState>>({
  name: 'ui',
  initialState: initialState,
  reducers: {
    setHasRunIntro: (state, { payload }: PayloadAction<boolean>) => {
      state.hasRunIntro = payload;
    },
    setIsChatOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isChatOpen = payload;
      state.isChatMinimized = !payload;
    },
    setIsChatMinimized: (state, { payload }: PayloadAction<boolean>) => {
      state.isChatMinimized = payload;
    },
    addNotification: (state, { payload }: PayloadAction<ActionResultNotification>) => {
      state.notifications.push(payload);
    },
    removeNotification: (state, { payload }: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(({ id }) => id !== payload);
    },
    resetUi: () => initialState,
  },
});

export const uiReducer = uiSlice.reducer;
export const {
  resetUi,
  setIsChatOpen,
  setHasRunIntro,
  addNotification,
  setIsChatMinimized,
  removeNotification,
} = uiSlice.actions;
