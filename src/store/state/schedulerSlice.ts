import { SchedulerState, PendingEvent } from '../types';
import { createSlice, SliceCaseReducers, PayloadAction, Draft } from '@reduxjs/toolkit';

const initialState: SchedulerState = {
  isLoading: false,
  showSummary: false,
  error: undefined,
  pendingEvent: undefined,
};

const handleHttpAction = (state: Draft<SchedulerState>) => {
  state.isLoading = true;
};

const handleHttpFailure = (
  state: Draft<SchedulerState>,
  { payload }: PayloadAction<string>
) => {
  state.isLoading = false;
  state.error = payload;
  state.pendingEvent = undefined;
};

const handleHttpSuccess = (state: Draft<SchedulerState>) => {
  state.isLoading = false;
  state.error = undefined;
};

const schedulerSlice = createSlice<SchedulerState, SliceCaseReducers<SchedulerState>>({
  name: 'scheduler',
  initialState: initialState,
  reducers: {
    resetScheduler: () => initialState,
    createScheduledEvent: handleHttpAction,
    deleteScheduledEvent: handleHttpAction,
    createScheduledEventSuccess: handleHttpSuccess,
    deleteScheduledEventSuccess: handleHttpSuccess,
    createScheduledEventFailure: handleHttpFailure,
    deleteScheduledEventFailure: handleHttpFailure,
    setPendingEvent: (state, { payload }: PayloadAction<PendingEvent>) => {
      state.pendingEvent = payload;
    },
    setShowSummary: (state, { payload }: PayloadAction<boolean>) => {
      state.showSummary = payload;
    },
    confirmSummary: state => {
      state.showSummary = false;
      state.pendingEvent = undefined;
    },
  },
});

export const schedulerReducer = schedulerSlice.reducer;
export const {
  resetScheduler,
  confirmSummary,
  setShowSummary,
  setPendingEvent,
  createScheduledEvent,
  deleteScheduledEvent,
  createScheduledEventSuccess,
  deleteScheduledEventSuccess,
  createScheduledEventFailure,
  deleteScheduledEventFailure,
} = schedulerSlice.actions;
