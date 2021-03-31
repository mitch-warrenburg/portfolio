import firebase from 'firebase';
import { firebaseConfig } from './constants';

firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
export const STORAGE_STATE_EVENT = firebase.storage.TaskEvent.STATE_CHANGED;
