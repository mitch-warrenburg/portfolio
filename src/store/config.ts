import { RootState } from './types';
import * as localForage from 'localforage';
import { PersistConfig } from 'redux-persist/es/types';

export const IS_DEBUG = process.env.NODE_ENV === 'debug';
export const IS_DEV = process.env.NODE_ENV === 'development';
export const IS_PROD = process.env.NODE_ENV === 'production';
export const API_SERVER_URL = IS_DEV ? 'http://localhost:9001' : '';

export const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  version: 1,
  storage: localForage,
  blacklist: [],
};
