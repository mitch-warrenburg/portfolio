import { Action, Reducer } from 'redux';
import { PersistPartial } from "redux-persist/es/persistReducer";

export interface RootState {
  ui: UiState
}

export interface UiState {
  hasRunIntro: boolean;
}

export type State = RootState & PersistPartial;

export type PersistedRootReducer = Reducer<State, Action>;