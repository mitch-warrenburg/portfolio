import { UserState, SubmitChatFormPayload, AdminAuthResponse } from '../types';
import { createSlice, SliceCaseReducers, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserState = {
  company: '',
  lastName: '',
  firstName: '',
  token: undefined,
  error: undefined,
  email: undefined,
  username: undefined,
  phoneNumber: undefined,
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
    adminAuth: state => {
      state.isLoading = true;
    },
    adminAuthSuccess: (state, { payload }: PayloadAction<AdminAuthResponse>) => {
      state.isAdmin = true;
      state.isLoading = false;
      state.error = undefined;
      state.token = payload.token;
      state.username = payload.username;
    },
    adminAuthFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.isAdmin = false;
      state.isLoading = false;
      state.token = undefined;
    },
    adminLogout: state => {
      state.isLoading = true;
    },
    adminLogoutFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.isLoading = false;
    },
    resetUser: () => initialState,
  },
});

export const userReducer = userSlice.reducer;
export const {
  resetUser,
  adminAuth,
  submitEmail,
  adminLogout,
  submitChatForm,
  adminAuthSuccess,
  adminAuthFailure,
  adminLogoutFailure,
  submitEmailSuccess,
  clearUserLoadState,
  submitEmailFailure,
} = userSlice.actions;
