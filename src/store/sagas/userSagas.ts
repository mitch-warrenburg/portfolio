import 'clientjs';
import ClientJs from 'clientjs';
import { client } from '../../http';
import { PayloadAction } from '@reduxjs/toolkit';
import { setShowSummary } from '../state/schedulerSlice';
import { takeEvery, call, put, delay } from 'redux-saga/effects';
import { uiState, userState, notify, schedulerState } from './globalSagas';
import { authPhoneNumber, confirmSmsCode, authAdminCustomToken } from '../../util';
import { setIsChatOpen, setAuthFormStatus, setIsAuthFormModalOpen } from '../state/uiSlice';
import {
  resetChat,
  setSessionId,
  connectToChatServer,
  disconnectFromChatServer,
} from '../state/chatSlice';
import {
  setEmail,
  resetUser,
  updateUserInfo,
  adminAuthFailure,
  fetchUserSuccess,
  fetchUserFailure,
  adminAuthSuccess,
  sendEmailSuccess,
  sendEmailFailure,
  updateEmailFailure,
  updateEmailSuccess,
  adminLogoutFailure,
  getUserMetadataError,
  updateUserInfoSuccess,
  updateUserInfoFailure,
  getUserMetadataSuccess,
  authenticatePhoneNumber,
  authenticateConfirmationCode,
  authenticatePhoneNumberFailure,
  authenticatePhoneNumberSuccess,
  authenticateConfirmationCodeFailure,
  authenticateConfirmationCodeSuccess,
} from '../state/userSlice';
import {
  UserMetadata,
  AuthFormDraft,
  AdminAuthPayload,
  SendEmailRequest,
  UserAuthResponse,
  UserUpdateRequest,
  FetchUserResponse,
  AdminAuthResponse,
  UserUpdateResponse,
  SendEmailActionPayload,
} from '../types';

// @ts-ignore because this library is broken
// noinspection TypeScriptUMDGlobal
const _meta = (new ClientJS() as unknown) as ClientJs;

export function* adminAuthWatcher() {
  yield takeEvery('user/adminAuth', adminAuthHandler);
}

export function* adminLogoutWatcher() {
  yield takeEvery('user/adminLogout', adminLogoutHandler);
}

export function* sendEmailWatcher() {
  yield takeEvery('user/sendEmail', sendEmailHandler);
}

export function* getUserMetadataWatcher() {
  yield takeEvery('user/getUserMetadata', getUserMetadataHandler);
}

export function* authenticatePhoneNumberWatcher() {
  yield takeEvery('user/authenticatePhoneNumber', authenticatePhoneNumberHandler);
}

export function* authenticateConfirmationCodeWatcher() {
  yield takeEvery('user/authenticateConfirmationCode', authenticateConfirmationCodeHandler);
}

export function* updateUserInfoWatcher() {
  yield takeEvery('user/updateUserInfo', updateUserInfoHandler);
}

export function* advanceToNextAuthFormStateWatcher() {
  yield takeEvery('user/advanceToNextAuthFormState', advanceToNextAuthFormStateHandler);
}

export function* fetchUserWatcher() {
  yield takeEvery('user/fetchUser', fetchUserHandler);
}

export function* updateEmailWatcher() {
  yield takeEvery('user/updateEmail', updateEmailHandler);
}

export function* updateEmailHandler({ payload }: PayloadAction<UserUpdateRequest>) {
  try {
    const response: UserUpdateResponse = yield call(client.put, '/api/v1/users', payload);
    yield put(updateEmailSuccess(response));
    yield notify('Email updated', 'success');
  } catch (e) {
    yield put(updateEmailFailure(e));
    yield notify('Unable to update email', 'failure');
  }
}

export function* fetchUserHandler({ payload: uid }: PayloadAction<string>) {
  try {
    const response: FetchUserResponse = yield call(client.get, `/api/v1/users/${uid}`);
    yield put(fetchUserSuccess(response));
  } catch (e) {
    yield put(fetchUserFailure(e.message));
    yield put(resetChat({}));
  }
}

export function* advanceToNextAuthFormStateHandler() {
  const { authFormStatus } = yield uiState();
  const { uid, authFormDraft } = yield userState();

  if ('phoneNumber' === authFormStatus) {
    yield put(authenticatePhoneNumber(authFormDraft));
  } else if ('confirmationCode' === authFormStatus) {
    yield put(authenticateConfirmationCode(authFormDraft));
  } else if ('userInfo' === authFormStatus) {
    const request: UserUpdateRequest = {
      uid,
      company: authFormDraft.company,
      username: authFormDraft.username,
    };
    yield put(updateUserInfo(request));
  }
}

export function* updateUserInfoHandler({ payload }: PayloadAction<AuthFormDraft>) {
  try {
    const response: UserUpdateResponse = yield call(client.put, '/api/v1/users', payload);
    yield put(setIsAuthFormModalOpen(false));
    yield put(updateUserInfoSuccess(response));
    yield put(connectToChatServer({}));
    const { pendingEvent } = yield schedulerState();
    if (pendingEvent) {
      yield put(setShowSummary(true));
    }
  } catch (e) {
    yield put(setAuthFormStatus('phoneNumber'));
    yield put(updateUserInfoFailure(e.message));
    yield notify('Something went wrong.  Please try again.', 'failure');
  }
}

export function* authenticateConfirmationCodeHandler({
  payload: { confirmationCode },
}: PayloadAction<AuthFormDraft>) {
  try {
    const token: string = yield call(confirmSmsCode, confirmationCode);
    const response: UserAuthResponse = yield call(
      client.post,
      '/api/v1/auth',
      {},
      { headers: { Authorization: token } }
    );
    yield put(authenticateConfirmationCodeSuccess(response));
    yield put(setAuthFormStatus('userInfo'));
    yield put(connectToChatServer({}));
    yield notify('Phone number verified', 'success');
  } catch (e) {
    yield put(authenticateConfirmationCodeFailure(e.message));
    yield put(setAuthFormStatus('phoneNumber'));
    yield notify('Incorrect code.  Please try again.', 'failure');
  }
}

export function* authenticatePhoneNumberHandler({
  payload: { phoneNumber },
}: PayloadAction<AuthFormDraft>): any {
  try {
    yield call(authPhoneNumber, phoneNumber);
    yield put(authenticatePhoneNumberSuccess({}));
    yield put(setAuthFormStatus('confirmationCode'));
    yield notify('Code sent', 'success');
  } catch (e) {
    yield put(authenticatePhoneNumberFailure(e.message));
    yield notify('Something went wrong.  Please try again.', 'failure');
  }
}

export function* sendEmailHandler({ payload }: PayloadAction<SendEmailActionPayload>) {
  const { uid } = yield userState();

  try {
    const emailRequest: SendEmailRequest = {
      uid,
      ...payload,
    };
    yield put(setEmail(payload.email));
    yield call(client.post, '/api/v1/email/send', emailRequest);
    yield put(sendEmailSuccess(emailRequest));
    yield notify('Email sent', 'success');
  } catch (e) {
    yield put(sendEmailFailure(e.message));
    yield notify('Failed to Send Email', 'failure');
  }
}

export function* adminLogoutHandler() {
  try {
    yield put(disconnectFromChatServer({}));
    yield put(resetUser({}));
    yield put(resetChat({}));
    yield put(setIsChatOpen(false));
    yield notify('Logged Out', 'success');
  } catch (e) {
    yield put(adminLogoutFailure({}));
    yield notify('Logout Failed', 'failure');
  }
}

export function* adminAuthHandler({ payload: auth }: PayloadAction<AdminAuthPayload>) {
  try {
    yield delay(1000);
    const response: AdminAuthResponse = yield call(
      client.post,
      '/api/v1/admin/chat/login',
      {},
      { auth }
    );

    const token: string = yield call(authAdminCustomToken, response.token);

    yield put(setSessionId(response.sessionId));
    yield put(adminAuthSuccess({ ...response, token }));
    yield put(connectToChatServer({}));
    yield notify('Logged In', 'success');
  } catch (e) {
    yield put(adminAuthFailure(e.message));
    yield notify('Login Failed', 'failure');
  }
}

export function* getUserMetadataHandler() {
  try {
    const metadata: UserMetadata = {
      isMobile: false,
      fingerprint: _meta.getFingerprint(),
      device: {
        cpu: _meta.getCPU(),
        device: _meta.getDevice(),
        type: _meta.getDeviceType(),
        vendor: _meta.getDeviceVendor(),
      },
      browser: {
        name: _meta.getBrowser(),
        fullVersion: _meta.getBrowserVersion(),
        version: _meta.getBrowserMajorVersion(),
      },
      locale: {
        timeZone: _meta.getTimeZone(),
        language: _meta.getLanguage(),
        systemLanguage: _meta.getSystemLanguage(),
      },
      os: {
        name: _meta.getOS(),
        version: _meta.getOSVersion(),
        ios: {
          isIpad: _meta.isIpad(),
          isIphone: _meta.isIphone(),
          isIos: _meta.isMobileIOS(),
        },
      },
      screen: {
        screenInfo: _meta.getScreenPrint(),
        resolution: _meta.getCurrentResolution(),
        availableResolution: _meta.getAvailableResolution(),
      },
      storage: {
        isCookies: _meta.isCookie(),
        isLocalStorage: _meta.isLocalStorage(),
        isSessionStorage: _meta.isSessionStorage(),
      },
    } as UserMetadata;

    yield put(getUserMetadataSuccess(metadata));
  } catch (e) {
    yield put(getUserMetadataError(e.message || 'Unknown Error'));
  }
}
