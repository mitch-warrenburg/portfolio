import { Dispatch } from 'redux';

export interface ErrorBoundaryProps {
  dispatch: Dispatch<any>;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage?: string;
}
