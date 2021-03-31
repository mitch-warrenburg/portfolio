import { isError, uniqueId } from 'lodash';
import { unknownErrorMsg } from './constants';
import { addNotification } from '../../../store/state/uiSlice';
import { clearState } from '../../../store/state/globalActions';
import { ErrorBoundaryState, ErrorBoundaryProps } from './types';
import React, { Component, ErrorInfo, GetDerivedStateFromError } from 'react';

export default class RootErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError: GetDerivedStateFromError<
    ErrorBoundaryProps,
    ErrorBoundaryState
  > = (error: any) => {
    return {
      hasError: !!error,
      errorMessage: isError(error) ? error.message || unknownErrorMsg : error || undefined,
    };
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { dispatch } = this.props;
    console.error(error, errorInfo);
    dispatch(
      addNotification({ id: uniqueId(), text: 'Unexpected Error Encountered', type: 'error' })
    );
    dispatch(clearState());
  }

  render() {
    return this.props.children;
  }
}
