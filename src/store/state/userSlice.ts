import {
  UserState,
  SubmitChatFormPayload,
  AdminAuthResponse,
  SendEmailRequest,
} from '../types';
import { createSlice, SliceCaseReducers, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserState = {
  company: '',
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
    },
    sendEmail: state => {
      state.isLoading = true;
    },
    sendEmailSuccess: (state, { payload }: PayloadAction<SendEmailRequest>) => {
      state.isLoading = false;
      state.error = undefined;
      state.email = payload.address;
      state.username = payload.name;
      state.company = payload.company;
      state.phoneNumber = payload.phoneNumber;
    },
    sendEmailFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
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
      const { token, username } = payload;
      return {
        ...initialState,
        token,
        username,
        isAdmin: true,
      };
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
  sendEmail,
  adminLogout,
  submitChatForm,
  adminAuthSuccess,
  adminAuthFailure,
  sendEmailSuccess,
  sendEmailFailure,
  adminLogoutFailure,
  clearUserLoadState,
} = userSlice.actions;
