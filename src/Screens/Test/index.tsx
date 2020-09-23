import Analytics from 'appcenter-analytics';
import Crashes from 'appcenter-crashes';
import * as React from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';

import styles from './styles';

const Test: React.FunctionComponent = () => {
  const [afterInflation, setAfterInflation] = React.useState<number>(0.0);
  const [amount, setAmount] = React.useState<number>(0.0);
  const [atRiskFree, setAtRiskFree] = React.useState<number>(0.0);
  const [atRiskFreeAfterInflation, setAtRiskFreeAfterInflation] = React.useState<number>(0.0);
  const [difference, setDifference] = React.useState<number>(0);
  const [inflationRate, setInflationRate] = React.useState<number>(0.0);
  const [riskFreeRate, setRiskFreeRate] = React.useState<number>(0.0);
  const [timeInYears, setTimeInYears] = React.useState<number>(1);

  React.useEffect(() => {
    checkForRecentCrashes();
  }, []);

  const checkForRecentCrashes = async (): Promise<void> => {
    const didCrash: boolean = await Crashes.hasCrashedInLastSession();
    if (didCrash) {
      Alert.alert('', 'Sorry about that crash, we are working on a solution');
    }
  };

  const calculateInflationImpact = (value: number, inflationRatePercentage: number, time: number): number => {
    return value / Math.pow(1 + inflationRatePercentage, time);
  };

  const calculate = (): void => {
    const newAfterInflation: number = calculateInflationImpact(amount, inflationRate / 100, timeInYears);
    const newAtRiskFree: number = amount * Math.pow(1 + riskFreeRate / 100, timeInYears);
    const newAtRiskFreeAfterInflation: number = calculateInflationImpact(
      newAtRiskFree,
      inflationRate / 100,
      timeInYears
    );
    const newDifference: number = newAtRiskFreeAfterInflation - newAfterInflation;

    setAfterInflation(newAfterInflation);
    setAtRiskFree(newAtRiskFree);
    setAtRiskFreeAfterInflation(newAtRiskFreeAfterInflation);
    setDifference(newDifference);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Current inflation rate'
        style={styles.textBox}
        keyboardType='decimal-pad'
        onChangeText={(newInflationRate: string) => setInflationRate(Number(newInflationRate))}
      />
      <TextInput
        placeholder='Current risk free rate'
        style={styles.textBox}
        keyboardType='decimal-pad'
        onChangeText={(newRiskFreeRate: string) => setRiskFreeRate(Number(newRiskFreeRate))}
      />
      <TextInput
        placeholder='Amount you want to save'
        style={styles.textBox}
        keyboardType='decimal-pad'
        onChangeText={(newAmount: string) => setAmount(Number(newAmount))}
      />
      <TextInput
        placeholder='For how long (in years) will you save?'
        style={styles.textBox}
        keyboardType='decimal-pad'
        onChangeText={(newTimeInYears: string) => setTimeInYears(Number(newTimeInYears))}
      />
      <Button
        title='Calculate inflation'
        onPress={() => {
          calculate();
          Analytics.trackEvent('calculate_inflation', { Internet: 'WiFi', GPS: 'Off' });
        }}
      />
      <Text style={styles.label}>
        {`${timeInYears} years from now you will still have ${amount} but it will only be worth $${afterInflation}.`}
      </Text>
      <Text style={styles.label}>{`But if you invest it at a risk free rate you will have $${atRiskFree}.`}</Text>
      <Text style={styles.label}>{`Which will be worth $${atRiskFreeAfterInflation} after inflation.`}</Text>
      <Text style={styles.label}>{`A difference of: $${difference}.`}</Text>
    </View>
  );
};

export default Test;
