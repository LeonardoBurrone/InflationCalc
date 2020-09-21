import * as React from 'react';
import { enableScreens } from 'react-native-screens';
import { Provider as StoreProvider } from 'react-redux';

import AppContent from './AppContent';
import Store from './Store';

enableScreens();
const App: React.FunctionComponent = () => (
  <StoreProvider store={Store}>
    <AppContent />
  </StoreProvider>
);

export default App;
