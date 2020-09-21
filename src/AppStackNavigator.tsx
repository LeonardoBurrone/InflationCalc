import * as React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import Test from './Screens/Test';

const Stack: any = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Test' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Test' component={Test} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
