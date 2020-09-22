import Analytics from 'appcenter-analytics';
import Crashes from 'appcenter-crashes';
import * as React from 'react';
import { Alert, Button, Text, View } from 'react-native';

import Styles from './styles';

const Test: React.FunctionComponent = () => {
  React.useEffect(() => {
    checkForRecentCrashes();
  }, []);

  const checkForRecentCrashes = async (): Promise<void> => {
    const didCrash: boolean = await Crashes.hasCrashedInLastSession();
    if (didCrash) {
      Alert.alert('', 'Sorry about that crash, we are working on a solution');
    }
  };

  return (
    <View>
      <Text>Initial Screen</Text>
      <Button
        title='Calculate inflation'
        onPress={() =>
          Analytics.trackEvent('calculate_inflation', {
            Property1: 'Test1',
            Property2: 'Test2',
          })
        }
      />
    </View>
  );
};

export default Test;
