import firebase from 'firebase';
import { Dispatch } from 'redux';
import { uniqueId } from 'lodash';
import { UploadCompleteResult } from './types';
import { addNotification } from '../store/state/uiSlice';
import { storage, STORAGE_STATE_EVENT } from './firebase';
import UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;
import FirebaseStorageError = firebase.storage.FirebaseStorageError;

export class FirebaseUploadAdapter {
  loader: any;
  dispatch: Dispatch;

  constructor(loader: { file: Promise<File> }, dispatch: Dispatch) {
    this.loader = loader;
    this.dispatch = dispatch;
  }

  handleUploadErrorCreator = (reject: (error: FirebaseStorageError) => void) => {
    return (error: FirebaseStorageError) => {
      this.dispatch(
        addNotification({
          id: uniqueId(),
          type: 'failure',
          text: 'Upload Failed',
        })
      );
      reject(error);
    };
  };

  handleUploadSnapshot = ({
    bytesTransferred: transferred,
    totalBytes: total,
  }: UploadTaskSnapshot) => {
    console.log(`Upload is  ${(transferred / total) * 100}% done`);
  };

  handleUploadSuccessCreator = (
    task: firebase.storage.UploadTask,
    resolve: (result: UploadCompleteResult) => void
  ) => async () => {
    resolve({ default: await task.snapshot.ref.getDownloadURL() });
  };

  // noinspection JSUnusedGlobalSymbols
  async upload() {
    return new Promise(async (resolve, reject) => {
      const storageRef = storage.ref();
      const file = await this.loader.file;
      const uploadTask = storageRef.child(file.name).put(file);

      uploadTask.on(
        STORAGE_STATE_EVENT,
        this.handleUploadSnapshot,
        this.handleUploadErrorCreator(reject),
        this.handleUploadSuccessCreator(uploadTask, resolve)
      );
    });
  }
}
