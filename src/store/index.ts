import rootSaga from './sagas';
import { uiReducer } from './state/uiSlice';
import createSagaMiddleware from 'redux-saga';
import { persistReducer } from 'redux-persist';
import { PersistedRootReducer } from './types';
import { IS_PROD, persistConfig } from './config';
import { Persistor } from 'redux-persist/es/types';
import persistStore from 'redux-persist/es/persistStore';
import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

const rootReducer: PersistedRootReducer = persistReducer(
  persistConfig,
  combineReducers({
    ui: uiReducer,
  })
);

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  devTools: !IS_PROD,
  reducer: rootReducer,
  middleware: [
    sagaMiddleware,
    ...getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
  ],
});

sagaMiddleware.run(rootSaga);

export default store;
export const persistor: Persistor = persistStore(store);
