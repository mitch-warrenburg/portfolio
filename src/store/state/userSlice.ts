import { identity } from 'lodash';
import { createSlice, SliceCaseReducers, PayloadAction } from '@reduxjs/toolkit';
import {
  UserState,
  UserMetadata,
  AuthFormDraft,
  UserAuthResponse,
  AdminAuthResponse,
  SendEmailResponse,
  FetchUserResponse,
  UserUpdateResponse,
} from '../types';

const initialState: UserState = {
  uid: undefined,
  email: undefined,
  company: undefined,
  username: undefined,
  adminToken: undefined,
  phoneNumber: undefined,
  emailCount: 0,
  error: undefined,
  isAdmin: false,
  isLoading: false,
  isEmailSuccess: false,
  userMetadata: {},
  authFormDraft: {
    email: '',
    company: '',
    username: '',
    phoneNumber: '',
    confirmationCode: '',
  },
};

const userSlice = createSlice<UserState, SliceCaseReducers<UserState>>({
  name: 'user',
  initialState: initialState,
  reducers: {
    fetchUser: identity,
    getUserMetadata: identity,
    advanceToNextAuthFormState: identity,
    fetchUserSuccess: (state, { payload }: PayloadAction<FetchUserResponse>) => {
      return {
        ...state,
        ...payload,
      };
    },
    fetchUserFailure: () => {
      return initialState;
    },
    sendEmail: state => {
      state.isLoading = true;
    },
    setEmail: (state, { payload }: PayloadAction<string>) => {
      state.email = payload;
    },
    sendEmailSuccess: (state, { payload }: PayloadAction<SendEmailResponse>) => {
      state.error = undefined;
      state.isLoading = false;
      state.isEmailSuccess = true;
      state.emailCount = payload.emailCount;
    },
    sendEmailFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.isLoading = false;
    },
    composeNewEmail: state => {
      state.isEmailSuccess = false;
    },
    clearUserLoadState: state => {
      state.isLoading = false;
      state.error = undefined;
    },
    adminAuth: state => {
      state.isLoading = true;
    },
    adminAuthSuccess: (state, { payload }: PayloadAction<AdminAuthResponse>) => {
      const { uid, username, token } = payload;
      return {
        ...initialState,
        uid,
        username,
        adminToken: token,
        isAdmin: true,
      };
    },
    adminAuthFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.isAdmin = false;
      state.isLoading = false;
    },
    adminLogout: state => {
      state.isLoading = true;
    },
    adminLogoutFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.isLoading = false;
    },
    getUserMetadataSuccess: (state, { payload }: PayloadAction<UserMetadata>) => {
      state.userMetadata = { ...state.userMetadata, ...payload, error: undefined };
    },
    getUserMetadataError: (state, { payload }: PayloadAction<string>) => {
      state.userMetadata = { ...state.userMetadata, error: payload };
    },
    updateUserInfo: state => {
      state.isLoading = true;
    },
    updateUserInfoSuccess: (state, { payload }: PayloadAction<UserUpdateResponse>) => {
      return {
        ...state,
        ...payload,
        isLoading: false,
        error: undefined,
        email: payload.email || state.email,
        authFormDraft: { ...initialState.authFormDraft },
      };
    },
    updateUserInfoFailure: (state, { payload }: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = payload;
    },
    authenticatePhoneNumber: state => {
      state.isLoading = true;
    },
    authenticatePhoneNumberFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.isLoading = false;
    },
    authenticatePhoneNumberSuccess: state => {
      state.isLoading = false;
      state.error = undefined;
    },
    authenticateConfirmationCode: state => {
      state.isLoading = true;
    },
    authenticateConfirmationCodeSuccess: (
      state,
      { payload }: PayloadAction<UserAuthResponse>
    ) => {
      return {
        ...state,
        ...payload,
        isLoading: false,
        error: undefined,
        authFormDraft: {
          ...state.authFormDraft,
          company: payload.company || '',
          username: payload.username || '',
        },
      };
    },
    authenticateConfirmationCodeFailure: (state, { payload }: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = payload;
    },
    setAuthFormDraft: (state, { payload }: PayloadAction<AuthFormDraft>) => {
      state.authFormDraft = { ...state.authFormDraft, ...payload };
    },
    resetUser: () => initialState,
  },
});

export const userReducer = userSlice.reducer;
export const {
  setEmail,
  fetchUser,
  resetUser,
  adminAuth,
  sendEmail,
  adminLogout,
  updateUserInfo,
  getUserMetadata,
  composeNewEmail,
  adminAuthSuccess,
  adminAuthFailure,
  fetchUserSuccess,
  fetchUserFailure,
  sendEmailSuccess,
  sendEmailFailure,
  setAuthFormDraft,
  adminLogoutFailure,
  clearUserLoadState,
  getUserMetadataError,
  updateUserInfoSuccess,
  updateUserInfoFailure,
  getUserMetadataSuccess,
  authenticatePhoneNumber,
  advanceToNextAuthFormState,
  authenticateConfirmationCode,
  authenticatePhoneNumberFailure,
  authenticatePhoneNumberSuccess,
  authenticateConfirmationCodeFailure,
  authenticateConfirmationCodeSuccess,
} = userSlice.actions;
