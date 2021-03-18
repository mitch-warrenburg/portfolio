import { UserState, SubmitChatFormPayload } from '../types';
import { createSlice, SliceCaseReducers, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserState = {
  company: '',
  lastName: '',
  firstName: '',
  email: undefined,
  username: undefined,
  phoneNumber: undefined,
  isLoading: false,
};

const userSlice = createSlice<UserState, SliceCaseReducers<UserState>>({
  name: 'user',
  initialState: initialState,
  reducers: {
    submitChatForm: (state, { payload }: PayloadAction<SubmitChatFormPayload>) => {
      state.company = payload.company;
      state.username = payload.username;
      state.lastName = payload.lastName;
      state.firstName = payload.firstName;
    },
    submitEmail: state => {
      state.isLoading = true;
    },
    submitEmailSuccess: state => {
      state.isLoading = false;
    },
    submitEmailFailure: state => {
      state.isLoading = false;
    },
    clearUserLoadState: state => {
      state.isLoading = false;
    },
  },
});

export const userReducer = userSlice.reducer;
export const {
  submitEmail,
  submitChatForm,
  submitEmailSuccess,
  clearUserLoadState,
  submitEmailFailure,
} = userSlice.actions;
