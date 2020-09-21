export as namespace reducers;

type appStatusReducer = {
  appState: 'active' | 'background' | 'inactive';
  stackState: any;
};

export type rootReducer = {
  appStatus: appStatusReducer;
};
