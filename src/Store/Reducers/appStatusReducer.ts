import { CHANGE_APP_STATE, CHANGE_STACK_STATE } from '../Actions/actionTypes';

export const initialState: reducers.appStatusReducer = {
  appState: 'active',
  stackState: '',
};

export const appStatusReducer = (state = initialState, action: any): any => {
  const { payload } = action;

  switch (action.type) {
    case CHANGE_APP_STATE:
      return {
        ...state,
        appState: payload,
      };

    case CHANGE_STACK_STATE:
      return {
        ...state,
        stackState: payload,
      };

    default:
      return state;
  }
};

export default appStatusReducer;
