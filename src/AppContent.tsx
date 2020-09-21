import { BaseNavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { AppState, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppNavigator from './AppStackNavigator';
import { navigationRef, saveCurrentRoute } from './Services/Navigation';
import { changeAppStateAction } from './Store/Actions/appStatusActions';

const AppContent: React.FunctionComponent = () => {
  const stackState: any = useSelector((state: reducers.rootReducer): any => state.appStatus.stackState);
  const dispatch: any = useDispatch();

  React.useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState: any): void => {
    dispatch(changeAppStateAction(nextAppState));
  };

  return (
    <>
      <StatusBar translucent />
      <KeyboardAvoidingView
        style={{ flex: 1, marginTop: StatusBar.currentHeight }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <BaseNavigationContainer
          ref={navigationRef}
          onStateChange={saveCurrentRoute}
          initialState={stackState ? JSON.parse(stackState) : null}
        >
          <AppNavigator />
        </BaseNavigationContainer>
      </KeyboardAvoidingView>
    </>
  );
};

export default AppContent;
