import rootSaga from './sagas';
import { uiReducer } from './state/uiSlice';
import createSagaMiddleware from 'redux-saga';
import { persistReducer } from 'redux-persist';
import { PersistedRootReducer } from './types';
import { chatReducer } from './state/chatSlice';
import { userReducer } from './state/userSlice';
import { IS_PROD, persistConfig } from './config';
import { Persistor } from 'redux-persist/es/types';
import { createReduxEnhancer } from '@sentry/react';
import persistStore from 'redux-persist/es/persistStore';
import { schedulerReducer } from './state/schedulerSlice';
import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

const rootReducer: PersistedRootReducer = persistReducer(
  persistConfig,
  combineReducers({
    ui: uiReducer,
    chat: chatReducer,
    user: userReducer,
    scheduler: schedulerReducer,
  })
);

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  devTools: !IS_PROD,
  reducer: rootReducer,
  enhancers: [createReduxEnhancer()],
  middleware: [
    sagaMiddleware,
    ...getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
  ],
});

sagaMiddleware.run(rootSaga);

export default store;
export const persistor: Persistor = persistStore(store);
