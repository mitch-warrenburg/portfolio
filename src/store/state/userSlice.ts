import { identity } from 'lodash';
import { createSlice, SliceCaseReducers, PayloadAction } from '@reduxjs/toolkit';
import {
  UserState,
  UserMetadata,
  AuthFormDraft,
  UserAuthResponse,
  AdminAuthResponse,
  SendEmailResponse,
  UserUpdateResponse,
  SubmitChatFormPayload,
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
    getUserMetadata: identity,
    advanceToNextAuthFormState: identity,
    submitChatForm: (state, { payload }: PayloadAction<SubmitChatFormPayload>) => {
      state.company = payload.company;
      state.username = payload.username;
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
  resetUser,
  adminAuth,
  sendEmail,
  adminLogout,
  updateUserInfo,
  submitChatForm,
  getUserMetadata,
  composeNewEmail,
  adminAuthSuccess,
  adminAuthFailure,
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

// NEW USER
// auth using number
// resulting token is POSTED to the session login endpoint.
// server verifies token and sets an expiring session cookie and a csrf token.  it responds with existing user data if this is a returning user.
// (For sensitive applications, the auth_time should be checked before issuing the session cookie, minimizing the window of attack in case an ID token is stolen)
// upon the successful response:
// if it's an existing user, continue to the feature where the login was initiated.
// if it's a new user:
// for the chat form, display additional fields for username, email and company. EMAIL is optional here.
// for the email form, all fields are already visible.  But email is required here.
// for scheduling, reuse the same process and as chat.  Reuse the chat form with a few styling adjustments - fields and flow will be identical to chat.
// (client does not save jwt token as the httpOnly cookie is now in effect to manage the session - but will used csrf tokens in subsequent http request headers)
// POST the user data to the API to save their details.
// The server will pull the user using the session cookie and create a new db record.  The phone number is not needed since it will be included on the firebase user already
// POST the user device metadata in the background.
// The server will append the device metadata to the postgres metadata json column *IF* there is not already a metadata object with the same fingerprint
// Sessions will be stored using postgres or redis and managed by spring session.  Once the session expires (24hours of inactivity?), requests will respond UNAUTHORIZED.  The server will add a new cookie to the response to replace this expired one.
// Client will revoke access to authenticated features a display the login options for said feature
// ***MAYBE*** If logout is supported, a logout endpoint will clear the session cookie in the same way as it does for expiration.  It will also revoke the firebase session directly to avoid zombie sessions in firebase.
