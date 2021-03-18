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
    },
    adminLogin: state => {
      state.isLoading = true;
    },
    adminLoginSuccess: state => {
      state.isLoading = false;
      state.isAdmin = true;
    },
    adminLoginFailure: (state, { payload }: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const {
  adminLogin,
  submitEmail,
  submitChatForm,
  adminLoginSuccess,
  adminLoginFailure,
  submitEmailSuccess,
  clearUserLoadState,
  submitEmailFailure,
} = userSlice.actions;
