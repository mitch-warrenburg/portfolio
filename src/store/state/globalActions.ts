import { Action } from '@reduxjs/toolkit';

export const clearState = (): Action => ({
  type: 'global/clearState',
});
