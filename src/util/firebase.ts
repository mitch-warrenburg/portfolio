import firebase from 'firebase';
import { firebaseConfig } from './constants';
import RecaptchaVerifier = firebase.auth.RecaptchaVerifier;
import ConfirmationResult = firebase.auth.ConfirmationResult;

class PhoneNumberAuthenticator {
  private readonly _buttonTriggerId;
  private _isRendered = false;
  private _recaptchaWidgetId = -1;
  private _confirmation: ConfirmationResult | undefined;
  private _recaptchaVerifier: RecaptchaVerifier | undefined;

  constructor(buttonTriggerId: string) {
    this._buttonTriggerId = buttonTriggerId;
  }

  get isRendered(): boolean {
    return this._isRendered;
  }

  init = async (): Promise<void> => {
    this._recaptchaVerifier = new firebase.auth.RecaptchaVerifier(this._buttonTriggerId, {
      size: 'invisible',
    });
    this._recaptchaWidgetId = await this._recaptchaVerifier.render();
    this._isRendered = true;
  };

  authenticatePhoneNumber = async (phoneNumber: string): Promise<void> => {
    if (this._recaptchaVerifier) {
      try {
        this._confirmation = await fb
          .auth()
          .signInWithPhoneNumber(
            phoneNumber.replace(/[\s()-]+/g, ''),
            this._recaptchaVerifier
          );
      } catch (e) {
        grecaptcha.reset();
        grecaptcha.reset(this._recaptchaWidgetId);
        // @ts-ignore
        grecaptcha._widgetId = undefined;
      }
    } else {
      throw new Error('The recaptcha verifier has not be initialized.');
    }
  };

  confirmPhoneNumber = async (confirmationCode: string): Promise<string | undefined> => {
    try {
      await this._confirmation?.confirm(confirmationCode);
      return await fb.auth()?.currentUser?.getIdToken(true);
    } catch (e) {
      grecaptcha.reset();
      grecaptcha.reset(this._recaptchaWidgetId);
      // @ts-ignore
      grecaptcha._widgetId = undefined;
      throw new Error(e.message || 'Unable to authorize confirmation code.');
    }
  };
}

firebase.initializeApp(firebaseConfig);

const authenticator = new PhoneNumberAuthenticator('recaptcha-button');

export const authPhoneNumber = async (phoneNumber = '') => {
  if (!authenticator.isRendered) {
    await authenticator.init();
  }

  await authenticator.authenticatePhoneNumber(phoneNumber);
};

export const confirmSmsCode = async (confirmationCode = '') => {
  return await authenticator.confirmPhoneNumber(confirmationCode);
};

export const authAdminCustomToken = async (token: string): Promise<string | undefined> => {
  await fb.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  await fb.auth().signInWithCustomToken(token);
  return fb.auth()?.currentUser?.getIdToken(true);
};

export const fb = firebase;
export const STORAGE_STATE_EVENT = firebase.storage.TaskEvent.STATE_CHANGED;
