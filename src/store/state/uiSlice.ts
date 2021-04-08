import { UiState, ActionResultNotification, AuthFormStatus } from '../types';
import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';

const initialState: UiState = {
  hasRunIntro: false,
  isAuthFormModalOpen: false,
  isChatOpen: false,
  isIntroRunning: false,
  isChatMinimized: false,
  authFormStatus: 'phoneNumber',
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
    setAuthFormStatus: (state, { payload }: PayloadAction<AuthFormStatus>) => {
      state.authFormStatus = payload;
    },
    setIsAuthFormModalOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuthFormModalOpen = payload;
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
  setAuthFormStatus,
  setIsChatMinimized,
  removeNotification,
  setIsAuthFormModalOpen,
} = uiSlice.actions;
