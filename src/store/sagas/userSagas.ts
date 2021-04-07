import 'clientjs';
import ClientJs from 'clientjs';
import { uniqueId } from 'lodash';
import { client } from '../../http';
import { PayloadAction } from '@reduxjs/toolkit';
import { authPhoneNumber, confirmSmsCode } from '../../util';
import { takeEvery, call, put, delay, select } from 'redux-saga/effects';
import {
  setIsChatOpen,
  addNotification,
  setAuthFormStatus,
  setIsAuthFormModalOpen,
} from '../state/uiSlice';
import {
  resetUser,
  sendEmail,
  updateUserInfo,
  adminAuthFailure,
  adminAuthSuccess,
  setAuthFormDraft,
  sendEmailSuccess,
  sendEmailFailure,
  adminLogoutFailure,
  getUserMetadataError,
  updateUserInfoSuccess,
  updateUserInfoFailure,
  getUserMetadataSuccess,
  authenticatePhoneNumber,
  updateUserWithEmailFormData,
  authenticateConfirmationCode,
  authenticatePhoneNumberFailure,
  authenticatePhoneNumberSuccess,
  updateAuthFormWithEmailFormData,
  authenticateConfirmationCodeFailure,
  authenticateConfirmationCodeSuccess,
} from '../state/userSlice';
import {
  UiState,
  UserState,
  UserMetadata,
  AuthFormDraft,
  SendEmailRequest,
  AdminAuthPayload,
  UserAuthResponse,
  AdminAuthResponse,
  UserUpdateRequest,
  UserUpdateResponse,
  SendEmailActionPayload,
} from '../types';
import {
  resetChat,
  connectToChatServer,
  disconnectFromChatServer,
  addAdminAuthSuccessDetails,
} from '../state/chatSlice';

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
  const {
    pendingEmail,
    authFormDraft: { lastUpdatedFrom },
  } = yield userState();

  try {
    const response: UserUpdateResponse = yield call(client.put, '/api/v1/user', payload);
    yield put(setIsAuthFormModalOpen(false));

    if (pendingEmail) {
      yield put(
        sendEmail({ ...pendingEmail, isUserFullyAuthenticated: true, uid: response.uid })
      );
    }
    yield put(
      addNotification({ id: uniqueId(), text: 'Session established', type: 'success' })
    );
    yield put(updateUserInfoSuccess(response));

    if (lastUpdatedFrom === 'chat' && response.username) {
      yield put(connectToChatServer({}));
    }
  } catch (e) {
    yield put(setAuthFormStatus('phoneNumber'));
    yield put(updateUserInfoFailure(e.message));
    yield put(
      addNotification({
        id: uniqueId(),
        text: 'Something went wrong.  Please try again.',
        type: 'failure',
      })
    );
  }
}

export function* authenticateConfirmationCodeHandler({
  payload: { confirmationCode, lastUpdatedFrom, username },
}: PayloadAction<AuthFormDraft>) {
  try {
    const token: string = yield call(confirmSmsCode, confirmationCode);
    const response: UserAuthResponse = yield call(
      client.post,
      '/api/v1/auth',
      {},
      { headers: { Authorization: token } }
    );

    if (lastUpdatedFrom === 'chat' && username) {
      yield put(connectToChatServer({}));
    }

    yield put(authenticateConfirmationCodeSuccess(response));
    yield put(setAuthFormStatus('userInfo'));
    yield put(
      addNotification({ id: uniqueId(), text: 'Phone number verified', type: 'success' })
    );
    yield put(setAuthFormDraft({ confirmationCode: '' }));
  } catch (e) {
    yield put(setAuthFormDraft({ confirmationCode: '' }));
    yield put(authenticateConfirmationCodeFailure(e.message));
    yield put(setAuthFormStatus('phoneNumber'));
    yield put(
      addNotification({
        id: uniqueId(),
        text: 'Incorrect code.  Please try again.',
        type: 'failure',
      })
    );
  }
}

export function* authenticatePhoneNumberHandler({
  payload: { phoneNumber },
}: PayloadAction<AuthFormDraft>): any {
  try {
    yield call(authPhoneNumber, phoneNumber);
    yield put(authenticatePhoneNumberSuccess({}));
    yield put(setAuthFormStatus('confirmationCode'));
    yield put(addNotification({ id: uniqueId(), text: 'Code sent', type: 'success' }));
  } catch (e) {
    yield put(
      addNotification({
        id: uniqueId(),
        text: 'Something went wrong.  Please try again.',
        type: 'failure',
      })
    );
    yield put(authenticatePhoneNumberFailure(e.message));
  }
}

export function* sendEmailHandler({ payload }: PayloadAction<SendEmailActionPayload>) {
  try {
    if (!payload.isUserFullyAuthenticated) {
      yield put(updateAuthFormWithEmailFormData(payload));
      yield put(setIsAuthFormModalOpen(true));
    } else {
      const emailRequest: SendEmailRequest = {
        content: payload.content,
        uid: payload.uid as string,
        email: payload.formData.email,
      };
      yield call(client.post, '/api/v1/email/send', emailRequest);
      yield put(updateUserWithEmailFormData(payload));
      yield put(sendEmailSuccess(emailRequest));
      yield put(addNotification({ id: uniqueId(), text: 'Email Sent', type: 'success' }));
    }
  } catch (e) {
    yield put(sendEmailFailure(e.message));
    yield put(
      addNotification({ id: uniqueId(), text: 'Failed to Send Email', type: 'failure' })
    );
  }
}

export function* adminLogoutHandler() {
  try {
    const { token } = yield userState();

    yield call(client.post, '/api/v1/admin/logout', {
      headers: { Authorization: `Bearer ${token}` },
    });

    yield put(disconnectFromChatServer({}));
    yield put(resetUser({}));
    yield put(resetChat({}));
    yield put(setIsChatOpen(false));
    yield put(addNotification({ id: uniqueId(), text: 'Logged Out', type: 'success' }));
  } catch (e) {
    yield put(adminLogoutFailure({}));
    yield put(addNotification({ id: uniqueId(), text: 'Logout Failed', type: 'failure' }));
  }
}

export function* adminAuthHandler({ payload: auth }: PayloadAction<AdminAuthPayload>) {
  try {
    yield delay(1000);
    const response: AdminAuthResponse = yield call(client.post, '/api/v1/admin/auth', {
      auth,
    });
    yield put(addAdminAuthSuccessDetails(response));
    yield put(adminAuthSuccess(response));
    yield put(connectToChatServer({}));
    yield put(addNotification({ id: uniqueId(), text: 'Logged In', type: 'success' }));
  } catch (e) {
    yield put(adminAuthFailure(e.message));
    yield put(addNotification({ id: uniqueId(), text: 'Login Failed', type: 'failure' }));
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

// redux-saga's types are shit
export const userState = (): UserState => {
  return (select(({ user }) => user) as unknown) as UserState;
};

export const uiState = (): UiState => {
  return (select(({ ui }) => ui) as unknown) as UiState;
};
