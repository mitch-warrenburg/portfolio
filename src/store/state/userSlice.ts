import { UserState, SubmitChatFormPayload } from '../types';
import { createSlice, SliceCaseReducers, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserState = {
  company: '',
  lastName: '',
  firstName: '',
  email: undefined,
  username: undefined,
  phoneNumber: undefined,
  error: undefined,
  isAdmin: false,
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
      state.error = undefined;
    },
    adminLogin: state => {
      state.isLoading = true;
    },
    adminAuthSuccess: (state, { payload }: PayloadAction<string>) => {
      state.isAdmin = true;
      state.isLoading = false;
      state.error = undefined;
      state.username = payload;
    },
    adminAuthFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.isAdmin = false;
      state.isLoading = false;
    },
  },
});

export const userReducer = userSlice.reducer;
export const {
  adminLogin,
  submitEmail,
  submitChatForm,
  adminAuthSuccess,
  adminAuthFailure,
  submitEmailSuccess,
  clearUserLoadState,
  submitEmailFailure,
} = userSlice.actions;
