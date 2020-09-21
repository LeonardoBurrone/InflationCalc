import { CHANGE_APP_STATE, CHANGE_STACK_STATE } from './actionTypes';

export const changeAppStateAction = (payload: string): appStatusActions.Dispatch => ({
  payload,
  type: CHANGE_APP_STATE,
});

export const changeStackStateAction = (payload: any): appStatusActions.Dispatch => ({
  payload,
  type: CHANGE_STACK_STATE,
});
